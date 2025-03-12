import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "@/components/Search"
import Filter from "@/components/Filter";
import Results from "@/components/Results";
import { NavigationContainer } from '@react-navigation/native';

export default function Index() {
  return (
    <SafeAreaView className="h-full bg-black">
      <View className="flex flex-col items-center justify-center mt-10">
        <View className="mt-28">
          <Text className="text-[#a5d294] font-bungee text-6xl italic">SUBSTREAM</Text>
        </View>
        <View className='bg-[#a5d294] flex flex-row w-11/12 rounded-full px-4 h-[4rem] items-center border-2 border-white text-black'>
          <Search />
          {/* <Filter /> */}
        </View>
        <Results />
      </View>
    </SafeAreaView>
  );
}
