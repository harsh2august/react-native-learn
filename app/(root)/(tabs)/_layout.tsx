import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs
      iconColor="#FF0000"
    >
      <NativeTabs.Trigger name="index">
        <Icon
          sf="house.fill"
          drawable="custom_android_drawable"
        />
        <Label>Home</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <Icon
          sf="gear"
          drawable="custom_settings_drawable"
        />
        <Label>Settings</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <Icon
          sf="magnifyingglass"
          drawable="custom_search_drawable"
        />
        <Label>Search</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="saved">
        <Icon
          sf="heart.fill"
          drawable="custom_saved_drawable"
        />
        <Label>Saved</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Icon
          sf="person.fill"
          drawable="custom_profile_drawable"
        />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}