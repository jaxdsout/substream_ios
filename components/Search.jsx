import { View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, router, usePathname } from 'expo-router';
import { connect } from 'react-redux';
import { auto_search, change_filter, clear_search, set_search_string } from "../store/actions/search"
import SearchIcon from '@expo/vector-icons/FontAwesome';
import { useDebouncedCallback } from 'use-debounce';


const Search = ({ auto_search, clear_search, set_search_string, searchString, filter, region }) => {
  const params = useLocalSearchParams();
  const [search, setSearch] = useState(params.query || '');

  const debouncedSearch = useDebouncedCallback((text) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text) => {
    setSearch(text);
    debouncedSearch(text);
    set_search_string(text)
  };

  const handleSubmit = async () => {
    if (search.trim()) {
      await auto_search(search, filter, region);
    }
  };

  return (
    <View className='flex flex-row'>
      <SearchIcon name="search" size={24} color="black" />
      <TextInput
        value={search}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        placeholder='Search...'
        placeholderTextColor="black"
        className='text-sm ml-2 flex-1 text-black'
        style={{ color: "#000000" }}
        returnKeyType="search"
      />
    </View>
  )
}

const mapStateToProps = (state) => ({
  filter: state.filter,
  searchString: state.searchString,
  region: state.region
})

const mapDispatchToProps = (dispatch) => ({
  auto_search: (search, id, region) => dispatch(auto_search(search, id, region)),
  change_filter: () => dispatch(change_filter()),
  clear_search: () => dispatch(clear_search()),
  set_search_string: (value) => dispatch(set_search_string(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);