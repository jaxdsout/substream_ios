import { SafeAreaView, View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'
import { load_choice, back_to_results } from '@/store/actions/search'
import { useRouter } from 'expo-router'
import Sources from '@/components/Sources'
import Reviews from '@/components/Reviews'
import AntDesign from '@expo/vector-icons/AntDesign';

const Choice = ({ choice, back_to_results }) => {
  const router = useRouter();

  const handleBack = () => {
    back_to_results();
    router.back();
  }

  return (
    <SafeAreaView className='h-full bg-black'>
        {choice ? (
          <View className='flex flex-col items-center justify-center'>
            <TouchableOpacity onPress={handleBack}>
              <AntDesign name="back" size={48} color="#a5d294" className='mb-8 mt-4'/>
            </TouchableOpacity>


            <Image source={{ uri: choice.poster }} className='h-96 w-64 rounded-lg'></Image>
            <View className='flex flex-col items-center justify-center'>
              <Text className='text-[#a5d294] font-bold text-center text-wrap mt-4'>{choice.title.toUpperCase()}</Text>
              <View className='flex flex-col items-start justify-center mt-4 w-1/2'>
                <Text className="text-[#a5d294] text-xs">Rating: {choice.us_rating}</Text>
                <Text className="text-[#a5d294] text-xs">Release Date: {choice.release_date}</Text>
                <Text className="text-[#a5d294] text-xs">
                  Genre: {choice?.genre_names?.map((genre, index) => (
                    <Text key={index}>
                        {index === 0 ? ' ' : ', '}{genre}
                    </Text>
                  ))}
                </Text>
              </View>
              <View className='flex flex-col items-center justify-center'>
                <View className='flex flex-col items-center justify-center mt-4'>
                  <Text className='text-[#a5d294] font-bold font-bungee'>SOURCES:</Text>
                  <Sources />
                </View>
                <View className='flex flex-col items-center justify-center mt-4'>
                  <Text className='text-[#a5d294] font-bold font-bungee'>REVIEWS:</Text>
                  <Reviews />
                </View>
              </View>
            </View>
          </View>
        ) : 
          <Text className='text-white'>no choice</Text>
        }
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