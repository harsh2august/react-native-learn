import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Profile() {
    const { signOut } = useAuth();
    const router = useRouter();
    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace("/sign-in")
        } catch (error) {
            console.error("Error signing out", error)
        }
    }
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 w-full items-center justify-center px-8 bg-white">
                <View className="flex gap-8 h-1/2 w-full items-center justify-center rounded-md px-8 bg-primary">
                    <Button className="bg-white shadow-md cursor-pointer w-40 h-14 rounded-lg mt-2 items-center" onPress={() => alert("Searching....")}>
                        <Text className='font-semibold text-primary'>Click me</Text>
                    </Button>
                    <Text className="text-sm text-white text-justify">
                        Profile
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime dolore autem officiis facere fugiat est, assumenda, inventore sequi perspiciatis quibusdam id quo odio enim recusandae debitis velit laborum veniam corrupti? Facere sed, aliquid nulla fugit itaque alias exercitationem distinctio? Quae repellat sit dignissimos laudantium, ipsam illum debitis itaque. Consequatur, officia!
                    </Text>
                    <TouchableOpacity onPress={handleSignOut} className='bg-red-500 px-8 py-4 rounded-md'>
                        <Text className='text-white font-semibold'>Sign Out</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}


