import { View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, router, usePathname } from 'expo-router';
import { connect } from 'react-redux';
import { auto_search, change_filter, clear_search, set_search_string } from "../store/actions/search"
import SearchIcon from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDebouncedCallback } from 'use-debounce';
import Filter from "@/components/Filter";

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

  const handleClear = () => {
    clear_search();
    setSearch('');
}

  const handleSubmit = async () => {
    if (search.trim()) {
      await auto_search(search, filter, region);
    }
  };

  return (
    <SafeAreaView>
      <View className='bg-[#0e0e0e] flex flex-row w-11/12 rounded-full px-6 h-[4rem] items-center justify-center border-2 border-[#a5d294] text-black'>
        <SearchIcon name="search" size={24} color="#a5d294" />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <TextInput
            value={search}
            onChangeText={handleSearch}
            onSubmitEditing={handleSubmit}
            placeholder='Search...'
            placeholderTextColor="#a5d294"
            className='text-xl ml-6 flex-1 mb-2 text-[#a5d294] items-center justify-center'
            returnKeyType="search"
          />
        </TouchableWithoutFeedback>
        {searchString && (
          <TouchableOpacity onPress={handleClear}>
            <AntDesign name="closecircleo" size={24} color="#a5d294" className='px-5' />
          </TouchableOpacity>
        )}
        <Filter />
      </View>
   
    </SafeAreaView>
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