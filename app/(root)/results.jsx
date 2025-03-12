import { View, Text } from 'react-native'
import React from 'react'
import Card from "@/components/Card"
import { load_choice, auto_search } from '@/store/actions/search'
import { connect } from 'react-redux'
import { useEffect } from 'react'

const Results = ({ results, load_choice, auto_search, filter, region, searchString }) => {
  
  const handleResultClick = async (result) => {
    console.log(result.id, region)
    await load_choice(result.id, region);
  }

  useEffect(() => {
    if (results.length === 0) {
      auto_search(searchString, filter, region);
    }
  }, [searchString, auto_search, filter, region, results]); 
  
  return (
    <View>
      {results.length > 0 ? (
        <View>
          <Text className='text-white'>results</Text>
          <Card />
        </View>
      ) : null
    }
    </View>
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