import { Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import Search from "@/components/Search"
import Results from "@/components/Results";
import { clear_search, clear_results } from "@/store/actions/search";
import { connect } from "react-redux";


const Index = ({ clear_search, clear_results }) => {

  const handleLogoClick = () => {
    clear_search();
    clear_results();
  }

  return (
    <SafeAreaView className="h-full bg-black">
      <View className="flex flex-col items-center justify-center">
        <View className="flex flex-col items-center justify-center mt-48">
          <TouchableOpacity onPress={handleLogoClick}>
            <Text className="text-[#a5d294] font-bungee text-6xl italic">SUBSTREAM</Text>
          </TouchableOpacity>
        </View>
        <Search />
        <Results />
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = (dispatch) => ({
  clear_search: () => dispatch(clear_search()),
  clear_results: () => dispatch(clear_results()),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Index);
