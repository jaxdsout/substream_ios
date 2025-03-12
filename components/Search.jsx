import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { connect } from 'react-redux';
import { auto_search, change_filter, clear_search, set_search_string } from "../store/actions/search"
import SearchIcon from '@expo/vector-icons/FontAwesome';
import FilterIcon from '@expo/vector-icons/FontAwesome5';


const Search = ({ auto_search, change_filter, clear_search, set_search_string, searchString, filter, region }) => {
  const params = useLocalSearchParams();
  const [search, setSearch] = useState(params.query || '');

  const handleSearchChange = () => {
    set_search_string(search)
  }
  
  const handleSubmit = () => {
    auto_search(searchString, filter, region)
  }

  return (
    <View className='bg-white flex flex-row w-11/12 rounded-full px-4 h-[4rem] items-center'>
      <SearchIcon name="search" size={24} color="black" />
      <TextInput
        value={search}
        onChangeText={handleSearchChange}
        onSubmitEditing={handleSubmit}
        placeholder='Search...'
        className='text-sm ml-2 flex-1'
        returnKeyType="search"
      />
      <TextInput>
        <FilterIcon name="filter" size={24} color="black" />
      </TextInput>
    </View>
  )
}


const mapStateToProps = (state) => ({
  filter: state.filter,
  searchString: state.searchString,
  region: state.region
})

const mapDispatchToProps = (dispatch) => ({
  auto_search: (searchString, id, region) => dispatch(auto_search(searchString, id, region)),
  change_filter: () => dispatch(change_filter()),
  clear_search: () => dispatch(clear_search()),
  set_search_string: (value) => dispatch(set_search_string(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);