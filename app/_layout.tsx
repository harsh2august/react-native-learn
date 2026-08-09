import { FlatList, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

const properties = [
  { id: 1, title: "Harsh", city: "Noida", Price: "12 CR." },
  { id: 2, title: "Priya", city: "Delhi", Price: "85 L." },
  { id: 3, title: "Anil", city: "Gurgaon", Price: "2.5 CR." },
  { id: 4, title: "Maya", city: "Mumbai", Price: "75 L." },
  { id: 5, title: "Rohit", city: "Bangalore", Price: "3.1 CR." },
  { id: 6, title: "Sangeeta", city: "Pune", Price: "1.2 CR." },
  { id: 7, title: "Ajay", city: "Chennai", Price: "90 L." },
  { id: 8, title: "Neha", city: "Hyderabad", Price: "4.5 CR." },
  { id: 9, title: "Vikram", city: "Kolkata", Price: "65 L." },
  { id: 10, title: "Pooja", city: "Ahmedabad", Price: "1.8 CR." }
]
export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white py-4">
      <View style={{
        padding: 80
      }}>
        <Text className="text-4xl font-bold">
          Hi how are you.
        </Text>
        <TextInput placeholder="Search your city." placeholderTextColor={"#999"} style={{
          borderColor: "gray",
          borderWidth: 2,
          borderRadius: 8,
          padding: 10,
          marginTop: 12
        }} />
        <TouchableOpacity className="bg-primary cursor-pointer p-3 rounded-lg mt-2 items-center" onPress={() => alert("Searching....")}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList data={properties} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
        <View style={{
          padding: 12,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          backgroundColor: "#f9f9f9",
          marginHorizontal: 12,
          marginVertical: 6,
          borderRadius: 8
        }}>
          <Text className="font-bold text-4xl">{item.title}</Text>
          <Text className="text-red-600">{item.city}</Text>
          <Text className="text-green-600 font-bold">{item.Price}</Text>
        </View>
      )} />
    </SafeAreaView>
  );
}
