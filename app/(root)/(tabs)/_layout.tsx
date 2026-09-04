import { useUserStore } from '@/store/userStore';
import IonIcons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';
function AndroidTabs() {
  const isAdmin = useUserStore((state) => state.isAdmin);
  console.log(isAdmin)
  return (
    <Tabs screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => <IonIcons name="home" color={color} size={size} /> }} />

      <Tabs.Screen name="search" options={{ title: 'Search', tabBarIcon: ({ color, size }) => <IonIcons name="search" color={color} size={size} /> }} />

      <Tabs.Screen name="create" options={{
        title: 'Add', href: isAdmin ? undefined : null,
        tabBarIcon: ({ color, size }) => (<IonIcons name="add-circle" color={color} size={size} />)
      }} />
      <Tabs.Screen name="saved" options={{ title: 'Saved', tabBarIcon: ({ color, size }) => <IonIcons name="heart" color={color} size={size} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => <IonIcons name="person" color={color} size={size} /> }} />

    </Tabs>
  );
}
function IosTabs() {
  const isAdmin = useUserStore((state) => state.isAdmin);
  console.log(isAdmin)
  return (
    <NativeTabs
      iconColor="#FF0000"
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          sf="house.fill"
          drawable="custom_android_drawable"
        />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Icon
          sf="gear"
          drawable="custom_settings_drawable"
        />
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Icon
          sf="magnifyingglass"
          drawable="custom_search_drawable"
        />
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      {
        isAdmin && (
          <NativeTabs.Trigger name="create">
            <NativeTabs.Trigger.Icon
              sf="plus.circle.fill"
              drawable="custom_admin_drawable"
            />
            <NativeTabs.Trigger.Label>Add</NativeTabs.Trigger.Label>
          </NativeTabs.Trigger>
        )
      }
      <NativeTabs.Trigger name="saved">
        <NativeTabs.Trigger.Icon
          sf="heart.fill"
          drawable="custom_saved_drawable"
        />
        <NativeTabs.Trigger.Label>Saved</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon
          sf="person.fill"
          drawable="custom_profile_drawable"
        />
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
export default function TabsLayout() {
  return Platform.OS === 'android' ? <AndroidTabs /> : <IosTabs />;
}