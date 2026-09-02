import { useSignIn } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Keyboard,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
    const { signIn, errors, fetchStatus } = useSignIn();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const codeInputRef = useRef<TextInput>(null);

    const isLoading = fetchStatus === 'fetching';

    const dismissCodeKeyboard = () => {
        Keyboard.dismiss();
        codeInputRef.current?.blur();
    };

    const handleSignIn = async () => {
        Keyboard.dismiss();

        if (!email || !password) {
            alert('Please enter email and password');
            return;
        }

        try {
            const { error } = await signIn.password({
                identifier: email,
                password,
            });

            if (error) {
                alert(error.message);
                return;
            }

            if (signIn.status === 'complete') {
                await signIn.finalize({
                    navigate: ({ session, decorateUrl }) => {
                        if (session?.currentTask) {
                            console.log(session.currentTask);
                            return;
                        }

                        const url = decorateUrl('/');
                        router.replace(url as any);
                    },
                });
            } else if (signIn.status === 'needs_second_factor') {
                await signIn.mfa.sendPhoneCode();
            } else if (signIn.status === 'needs_client_trust') {
                const emailCodeFactor =
                    signIn.supportedSecondFactors.find(
                        (factor) => factor.strategy === 'email_code'
                    );

                if (emailCodeFactor) {
                    await signIn.mfa.sendEmailCode();
                }
            } else {
                console.error(
                    'Sign-in attempt not complete:',
                    signIn.status
                );
            }
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    const onVerifyPress = async () => {
        dismissCodeKeyboard();

        try {
            await signIn.mfa.verifyEmailCode({
                code,
            });

            if (signIn.status === 'complete') {
                await signIn.finalize({
                    navigate: ({ session, decorateUrl }) => {
                        if (session?.currentTask) {
                            console.log(session.currentTask);
                            return;
                        }

                        const url = decorateUrl('/');
                        router.replace(url as any);
                    },
                });
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            alert('Invalid verification code. Please try again.');
        }
    };

    /*
     * Email verification / client trust screen
     */
    if (signIn.status === 'needs_client_trust') {
        return (
            <View className="flex-1 justify-center items-center">

                <Pressable
                    onPress={dismissCodeKeyboard}
                    className="absolute inset-0"
                />

                <View className="flex justify-center gap-y-8 w-full px-8">

                    <View className="flex gap-y-2">
                        <Image
                            source={require('../../assets/images/kribb.png')}
                            className="w-32 h-16 mb-4"
                            resizeMode="contain"
                        />

                        <Text className="text-2xl font-bold">
                            Verify your Account
                        </Text>

                        <Text className="text-gray-400">
                            We sent an email to {email}
                        </Text>
                    </View>

                    <View className="gap-3">

                        <View className="flex-row gap-3">
                            <TextInput
                                ref={codeInputRef}
                                autoCapitalize="none"
                                autoFocus={false}
                                placeholder="Enter Verification Code"
                                placeholderTextColor="#999"
                                keyboardType="number-pad"
                                className="flex-1 border border-gray-300 rounded-lg py-3 px-4 text-base"
                                value={code}
                                onChangeText={setCode}
                            />
                        </View>

                        {errors?.fields?.code && (
                            <Text className="text-red-500 mb-4">
                                {errors.fields.code.message}
                            </Text>
                        )}

                        <TouchableOpacity
                            onPress={onVerifyPress}
                            disabled={isLoading}
                            className="w-full bg-green-600 flex py-4 rounded-md justify-center items-center"
                        >
                            {isLoading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-white font-semibold">
                                    Verify
                                </Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={async () => {
                                dismissCodeKeyboard();

                                try {
                                    await signIn.mfa.sendEmailCode();
                                } catch (error) {
                                    console.error(
                                        'Error sending verification code:',
                                        error
                                    );
                                    alert(
                                        'Unable to send verification code. Please try again.'
                                    );
                                }
                            }}
                            disabled={isLoading}
                            className="py-2"
                        >
                            {isLoading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-blue-500">
                                    I need a new code
                                </Text>
                            )}
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }

    /*
     * Normal Sign In screen
     */
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 justify-center px-2 py-6">

                <View className="rounded-xl bg-white w-full max-w-sm mx-auto shadow-sm">
                    <View className="px-6 py-8 w-full">

                        <View className="items-center mb-6">
                            <Image
                                source={require('../../assets/images/kribb.png')}
                                className="w-32 h-16 mb-4"
                                resizeMode="contain"
                            />

                            <Text className="text-2xl font-bold text-blue-500 mb-2">
                                Welcome Back
                            </Text>

                            <Text className="text-gray-500 text-center">
                                Sign in to continue to Kribb.
                            </Text>
                        </View>

                        <View className="gap-3">

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={email}
                                onChangeText={setEmail}
                                className="border border-gray-300 rounded-lg py-3 px-4 text-base"
                            />

                            {errors?.fields?.identifier && (
                                <Text className="text-red-500 mb-4">
                                    {errors.fields.identifier.message}
                                </Text>
                            )}

                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#999"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                className="border border-gray-300 rounded-lg py-3 px-4 text-base mt-1"
                            />

                            {errors?.fields?.password && (
                                <Text className="text-red-500 mb-4">
                                    {errors.fields.password.message}
                                </Text>
                            )}

                        </View>

                        <TouchableOpacity
                            onPress={handleSignIn}
                            disabled={isLoading}
                            className="mt-6 w-full bg-blue-600 flex py-4 rounded-md justify-center items-center"
                        >
                            {isLoading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-white font-semibold">
                                    Sign In
                                </Text>
                            )}
                        </TouchableOpacity>

                        <View className="flex-row gap-x-2 justify-center mt-4">
                            <Text className="text-blue-600 font-semibold">
                                Don't have an account?
                            </Text>

                            <Link href="/sign-up">
                                <Text className="text-blue-600 font-semibold">
                                    Sign Up
                                </Text>
                            </Link>
                        </View>

                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
}