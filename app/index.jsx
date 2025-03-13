import { Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import Search from "@/components/Search"
import Results from "@/components/Results";
import { clear_search } from "@/store/actions/search";
import { connect } from "react-redux";


const Index = ({ clear_search }) => {

  const handleLogoClick = () => {
    clear_search();
  }

  return (
    <SafeAreaView className="h-full bg-black">
      <View className="flex flex-col items-center justify-center">
        <View className="mt-[20rem] flex-col items-center justify-center">
          <TouchableOpacity onPress={handleLogoClick}>
            <Text className="text-[#a5d294] font-bungee text-6xl italic">SUBSTREAM</Text>
          </TouchableOpacity>
          <Search />
        </View>
        <Results />
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = (dispatch) => ({
  clear_search: () => dispatch(clear_search()),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Index);
