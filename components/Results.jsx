import { FlatList, SafeAreaView, View, Text } from 'react-native'
import React from 'react'
import Card from "@/components/Card"
import { connect } from 'react-redux'

const Results = ({ results, region, isLoaded, searchString }) => {

  if ((!results || results.length < 1) && isLoaded) return (
    <SafeAreaView>
      <View className='text-center mt-8'>
        <Text className="text-[#a5d294]">No results for '<Text className='font-bold'>{searchString}</Text>' on {region} platforms.</Text>
      </View>
    </SafeAreaView>

  );

  return (
      <View style={{ zIndex: 3 }} className='border-2 border-black pt-[2rem] pb-[19rem] border-b-[1rem] rounded-xl w-11/12'>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Card result={item} />}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', alignItems: 'center' }}
            contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 0, alignItems: 'center' }}
            showsVerticalScrollIndicator={false}
            scrollToOverflowEnabled={true}
          />
      </View>

  )
}

const mapStateToProps = state => ({
  results: state.results,
  region: state.region,
  isLoaded: state.isLoaded,
  searchString: state.searchString
})

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Results);