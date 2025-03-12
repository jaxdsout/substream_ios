import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search"
import Results from "./results";
import Choice from "./choice";

export default function Index() {
  return (
    <SafeAreaView className="h-full bg-black">
      <View className="flex flex-col items-center justify-center mt-10">
        <View>
          <Text className="text-[#a5d294] font-bungee text-6xl italic">SUBSTREAM</Text>
        </View>
        <View>
          <Search />
        </View>
        <View>
          <Results />
          <Choice />
        </View>
      </View>
    </SafeAreaView>
  );
}
