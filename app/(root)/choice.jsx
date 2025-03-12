import { View, Text } from 'react-native'
import React from 'react'
import Icon from "@/components/Icon"
import { connect } from 'react-redux'
import { load_choice, back_to_results } from '@/store/actions/search'

const Choice = ({ choice, searchString, region }) => {
  return (
    <View>
      {choice ? (
        <View>
          <Text className='text-white'>choice</Text>
          <Icon />
        </View>
      ) : null
      }
    </View>
  )
}

const mapStateToProps = state => ({
  choice: state.choice,
  searchString: state.searchString,
  region: state.region
})

const mapDispatchToProps = (dispatch) => ({
  load_choice: (id, region) => dispatch(load_choice(id, region)),
  back_to_results: () => dispatch(back_to_results()),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Choice);