import { FlatList, SafeAreaView, View } from 'react-native'
import React from 'react'
import Card from "@/components/Card"
import { load_choice, auto_search } from '@/store/actions/search'
import { connect } from 'react-redux'

const Results = ({ results, load_choice, auto_search, filter, region, searchString }) => {
  if (!results || results.length === 0) return <View style={{ flex: 1 }} />;

  // const handleResultClick = async (result) => {
  //   console.log(result.id, region)
  //   await load_choice(result.id, region);
  // }

  // useEffect(() => {
  //   if (results.length === 0) {
  //     auto_search(searchString, filter, region);
  //   }
  // }, [searchString, auto_search, filter, region, results]); 
  
  console.log(results, "results on results page")
  return (
    <SafeAreaView>
      <View className='border-2 border-black pt-[2rem] pb-[25rem] border-b-[1rem] rounded-xl'>
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card result={item} />}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 0 }}
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={true}
          
        />
      </View>
    </SafeAreaView>

  )
}

const mapStateToProps = state => ({
  results: state.results,
  filter: state.filter,
  region: state.region,
  searchString: state.searchString
})

const mapDispatchToProps = (dispatch) => ({
  load_choice: (id, region) => dispatch(load_choice(id, region)),
  auto_search: (searchString, id, region) => dispatch(auto_search(searchString, id, region)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);