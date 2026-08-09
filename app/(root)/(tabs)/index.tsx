import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function HomeScreen() {
    return (
        <SafeAreaView>
            <View className="flex h-full w-full items-center justify-center px-8 bg-white">
                <View className="flex gap-8 h-1/2 w-full items-center justify-center rounded-md px-8 bg-primary">
                    <Image source={require("../../../assets/images/favicon.png")} className="w-32 shadow-xl bg-secondary p-8 rounded-md h-32" />
                    <Text className="text-sm text-white text-justify">
                        HomeScreen
                        lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime dolore autem officiis facere fugiat est, assumenda, inventore sequi perspiciatis quibusdam id quo odio enim recusandae debitis velit laborum veniam corrupti? Facere sed, aliquid nulla fugit itaque alias exercitationem distinctio? Quae repellat sit dignissimos laudantium, ipsam illum debitis itaque. Consequatur, officia!
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
