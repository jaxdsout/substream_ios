import React, { useState } from 'react';
import FilterIcon from '@expo/vector-icons/FontAwesome5';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { change_filter } from '@/store/actions/search';
import { connect } from 'react-redux';

const Filter = ({ change_filter, filter }) => {
  const [isOpen, setOpen] = useState(false);

  const filters = [
    { key: '2', text: 'TV & Movies', value: 2 },
    { key: '3', text: 'Movies', value: 3 },
    { key: '4', text: 'TV', value: 4 },
  ];

  const toggleDropdown = () => setOpen(!isOpen);

  const handleSelect = (item) => {
    setOpen(false); 
    change_filter(item.value); 
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <View>
          <TouchableOpacity onPress={toggleDropdown}>
            <FilterIcon name="filter" size={16} color={isOpen ? "white" : "#a5d294"} />
          </TouchableOpacity>
    
          <View className="relative z-40">
            {isOpen && (
              <View className="absolute top-10 -right-5 border-2 border-[#a5d294] bg-[#0e0e0e] px-3 py-3 h-[13rem] w-[7rem] rounded-xl z-40">
                <Text className="text-[#a5d294] text-xs mb-4">CONTENT SELECTION</Text>
                <FlatList
                  data={filters}
                  keyExtractor={(item) => item.key}
                  numColumns={1}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSelect(item)}>
                      <Text className="text-[#a5d294] text-[1.2rem] mb-4">{item.text}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </View>
        
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  filter: state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  change_filter: (value) => dispatch(change_filter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
