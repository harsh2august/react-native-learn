import { useAuth, useSignUp } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Keyboard,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUp() {
    const { signUp, errors, fetchStatus } = useSignUp();
    const { isSignedIn } = useAuth();
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const codeInputRef = useRef<TextInput>(null);

    const isLoading = fetchStatus === "fetching";

    if (signUp.status === "complete" || isSignedIn) {
        return null;
    }

    const dismissCodeKeyboard = () => {
        Keyboard.dismiss();
        codeInputRef.current?.blur();
    };

    const onSignUpPress = async () => {
        const { error } = await signUp.password({
            emailAddress: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });

        if (error) {
            // console.error(JSON.stringify(error, null, 2));
            alert(error.message);
            return;
        }

        if (!error) await signUp.verifications.sendEmailCode();
    };

    const onVerifyPress = async () => {
        dismissCodeKeyboard();

        await signUp.verifications.verifyEmailCode({
            code
        });

        if (signUp.status === "complete") {
            await signUp.finalize({
                navigate: ({ decorateUrl }) => {
                    const url = decorateUrl("/");
                    router.replace(url as any);
                }
            });
        }
    };

    if (
        signUp.status === "missing_requirements" &&
        signUp.unverifiedFields.includes("email_address") &&
        signUp.missingFields.length === 0
    ) {
        return (
            <View className='flex justify-center items-center h-full'>

                {/* Background area to dismiss keyboard */}
                <Pressable
                    onPress={dismissCodeKeyboard}
                    className="absolute inset-0"
                />

                {/* Actual content */}
                <View className="flex justify-center gap-y-8 w-full px-8">

                    <View className='flex gap-y-2'>
                        <Image
                            source={require('../../assets/images/kribb.png')}
                            className="w-32 h-16 mb-4"
                            resizeMode="contain"
                        />

                        <Text className="text-2xl font-bold">
                            Verify your Account{" "}
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

                        {
                            errors?.fields?.code && (
                                <Text className='text-red-500 mb-4'>
                                    {
                                        errors.fields.code.message
                                    }
                                </Text>
                            )
                        }

                        <TouchableOpacity
                            onPress={onVerifyPress}
                            disabled={isLoading}
                            className='w-full bg-green-600 flex py-4 rounded-md justify-center items-center'
                        >
                            {
                                isLoading ? (
                                    <ActivityIndicator color={"white"} />
                                ) : (
                                    <Text className='text-white font-semibold'>
                                        Verify
                                    </Text>
                                )
                            }
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={async () => {
                                dismissCodeKeyboard();
                                await signUp.verifications.sendEmailCode();
                            }}
                            disabled={isLoading}
                            className="py-2"
                        >
                            {
                                isLoading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text className="text-blue-500">
                                        I need a new code
                                    </Text>
                                )
                            }
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }

    return (
        // 1. Make SafeAreaView take full screen height with flex-1
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                // 2. Add justifyContent: 'center' to vertically center contents inside ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                className="px-2 py-6"
                keyboardShouldPersistTaps="handled"
            >
                <View className="rounded-xl bg-white w-full max-w-sm mx-auto shadow-sm">
                    <View className="px-6 py-8 w-full">

                        <View className="items-center mb-6">
                            <Image
                                source={require('../../assets/images/kribb.png')}
                                className="w-32 h-16 mb-4"
                                resizeMode="contain"
                            />

                            <Text className="text-2xl font-bold text-blue-500 mb-2">
                                Create Account
                            </Text>

                            <Text className="text-gray-500 text-center">
                                Find Your Perfect Roommate today.
                            </Text>
                        </View>

                        <View className="gap-3">

                            <View className="flex-row gap-3">

                                <TextInput
                                    autoCapitalize="words"
                                    placeholder="First Name"
                                    placeholderTextColor="#999"
                                    className="flex-1 border border-gray-300 rounded-lg py-3 px-4 text-base"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                />

                                {
                                    errors?.fields?.firstName && (
                                        <Text className='text-red-500 mb-4'>
                                            {
                                                errors.fields.firstName.message
                                            }
                                        </Text>
                                    )
                                }

                                <TextInput
                                    autoCapitalize="words"
                                    placeholder="Last Name"
                                    placeholderTextColor="#999"
                                    className="flex-1 border border-gray-300 rounded-lg py-3 px-4 text-base"
                                    value={lastName}
                                    onChangeText={setLastName}
                                />

                            </View>

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                className="border border-gray-300 rounded-lg py-3 px-4 text-base mt-1"
                            />

                            {
                                errors?.fields?.emailAddress && (
                                    <Text className='text-red-500 mb-4'>
                                        {
                                            errors.fields.emailAddress.message
                                        }
                                    </Text>
                                )
                            }

                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#999"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                className="border border-gray-300 rounded-lg py-3 px-4 text-base mt-1"
                            />

                            {
                                errors?.fields?.password && (
                                    <Text className='text-red-500 mb-4'>
                                        {
                                            errors.fields.password.message
                                        }
                                    </Text>
                                )
                            }

                        </View>

                        <TouchableOpacity
                            onPress={onSignUpPress}
                            disabled={isLoading}
                            className='mt-6 w-full bg-blue-600 flex py-4 rounded-md justify-center items-center'
                        >
                            {
                                isLoading ? (
                                    <ActivityIndicator color={"white"} />
                                ) : (
                                    <Text className='text-white'>
                                        Sign Up
                                    </Text>
                                )
                            }
                        </TouchableOpacity>

                        <View className='flex-row gap-x-2 justify-center mt-4'>
                            <Text className='text-blue-600 font-semibold'>
                                Already have an account?
                            </Text>

                            <Link href="/sign-in">
                                <Text className='text-blue-600 font-semibold'>
                                    Sign In
                                </Text>
                            </Link>
                        </View>

                        <View nativeID='clerk-captcha' />

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}