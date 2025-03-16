import { Text, TouchableOpacity, View, SafeAreaView, Modal, Pressable, Linking } from "react-native";
import Search from "@/components/Search"
import Results from "@/components/Results";
import { clear_search, clear_results } from "@/store/actions/search";
import { connect } from "react-redux";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from "react";


const Index = ({ clear_search, clear_results, results, isLoaded }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogoClick = () => {
    clear_search();
    clear_results();
  }

  const openWatch = () => {
    Linking.openURL('https://api.watchmode.com/')
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
        <View className="flex flex-col items-center justify-center mt-5">
          {results?.length === 0 && !isLoaded ? (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <FontAwesome5 name="info-circle" size={24} color="#a5d294" />
            </TouchableOpacity>
          ) : null}
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.8)", justifyContent: "center", alignItems: "center" }}
              onPress={() => setModalVisible(false)} 
            >
              <View className="bg-stone-900" style={{ width: 320, padding: 24, borderRadius: 10, alignItems: "center" }}>
                <View className="pb-5 text-center flex flex-row items-center">
                  <Text className="text-white -mr-1">Substream is made possible by  </Text>
                  <Text className="text-white font-bold" onPress={() => openWatch() }>Watchmode</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ color: "#a5d294", marginTop: 10 }}>Close</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  results: state.results,
  isLoaded: state.isLoaded
})

const mapDispatchToProps = (dispatch) => ({
  clear_search: () => dispatch(clear_search()),
  clear_results: () => dispatch(clear_results()),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Index);
