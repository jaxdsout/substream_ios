import { FlatList, SafeAreaView, View, Text } from 'react-native'
import React, { useRef, useEffect } from 'react'
import Card from "@/components/Card"
import { connect } from 'react-redux'

const Results = ({ results, region, isLoaded, searchString }) => {
  const resultsRef = useRef(null);

  useEffect(() => {
    if (results.length > 0) {
      if (resultsRef.current) {
        resultsRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
    }
  }, [results, resultsRef]);

  if ((results.length > 0) && isLoaded) {
    return (
      <View style={{ zIndex: 3 }} className='border-2 border-black pt-[2rem] pb-[19rem] border-b-[1rem] rounded-xl w-11/12'>
          <FlatList
            ref={resultsRef}
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Card result={item} />}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', alignItems: 'center' }}
            contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 0, alignItems: 'center' }}
            showsVerticalScrollIndicator={false}
          />
      </View>
    )
  } else if ((results.length <= 0) && isLoaded) {
    return (
      <View className='mt-8 w-11/12 flex flex-col items-center justify-center'>
        <Text className="text-[#a5d294] text-center ">No results for '<Text className='font-bold'>{searchString}</Text>' on {region} platforms.</Text>
      </View>
    );
  } 
  
}

const mapStateToProps = state => ({
  results: state.results,
  region: state.region,
  isLoaded: state.isLoaded,
  searchString: state.searchString
})

export default connect(mapStateToProps, { })(Results);