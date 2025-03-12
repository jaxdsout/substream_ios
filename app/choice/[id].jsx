import { SafeAreaView, View, Text, Image } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { load_choice, back_to_results } from '@/store/actions/search'
import { useRouter } from 'expo-router'
import Sources from '@/components/Sources'
import Reviews from '@/components/Reviews'

const Choice = ({ choice }) => {
  
  return (
    <SafeAreaView className='h-full bg-black'>
      <View className='flex flex-col items-center justify-center mt-10'>
        {choice ? (
          <View>
            <Image source={{ uri: choice.poster }} className='h-96 w-64 rounded-lg'></Image>
            <View className='flex flex-col items-center justify-center'>
              <Text className='text-white font-bold text-center text-wrap'>{choice.title.toUpperCase()}</Text>
              <View className='flex flex-col items-start justify-center text-xs'>
                <Text className="text-white">Rating: {choice.us_rating}</Text>
                <Text className="text-white">Release Date: {choice.release_date}</Text>
                <Text className="text-white">
                  Genre: {choice?.genre_names?.map((genre, index) => (
                    <Text key={index}>
                        {index === 0 ? ' ' : ', '}{genre}
                    </Text>
                  ))}
                </Text>
              </View>
              <View className='flex flex-col items-center justify-center'>
                <View className='flex flex-col items-center justify-center'>
                  <Text className='text-white font-bold'>SOURCES:</Text>
                  <Sources />
                </View>
                <View className='flex flex-col items-center justify-center'>
                  <Text className='text-white font-bold'>REVIEWS:</Text>
                  <Reviews />
                </View>
              </View>
            </View>
          </View>
        ) : 
          <Text className='text-white'>no choice</Text>
        }
      </View>
  
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  choice: state.choice,
})

const mapDispatchToProps = (dispatch) => ({
  load_choice: (id, region) => dispatch(load_choice(id, region)),
  back_to_results: () => dispatch(back_to_results()),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(Choice);