import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native'
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
    <SafeAreaView className='h-full bg-black relative'>
        {choice ? (
          <View className="flex-1">
            <Image 
              source={{ uri: choice.backdrop }} 
              className="absolute top-0 left-0 w-full h-full" 
              resizeMode="cover"
            />

            <View className="absolute top-0 left-0 w-full h-full bg-black/90"></View>

            <View className="flex flex-col items-center justify-center z-10 p-4">
              <TouchableOpacity onPress={handleBack} className='rounded-full border-2 border-[#658c57] w-[4rem] h-[5rem] flex flex-col items-center justfify-center'>
                <AntDesign name="back" size={36} color="#a5d294" className='mb-4 mt-4' style={{ zIndex: 5 }} />
              </TouchableOpacity>

              <View className='flex flex-col items-center justify-center'>
                <View className='flex flex-row p-2 items-center justify-center mt-4'>
                  <Image source={{ uri: choice.posterLarge }} style={{ height: 225, width: 150, borderRadius: 10 }} />
                  <View className='flex flex-col items-start justify-center w-1/2 col-span-2 ml-4'>
                    <Text className='text-[#a5d294] font-bold w-11/12'>{choice.title.toUpperCase()}</Text>
                    <View className='flex flex-row items-center justify-start mt-2'>
                      <AntDesign name="star" size={24} color="yellow" />
                      <Text className='text-[#a5d294] text-xs ml-1'>{choice.user_rating} / 10</Text>
                    </View>
                    <View className='mt-2'>
                      <Text className="text-[#a5d294] text-xs">Rating: {choice.us_rating}</Text>
                      <Text className="text-[#a5d294] text-xs">Release Year: {choice.year}</Text>
                      <Text className="text-[#a5d294] text-xs">Runtime: {choice.runtime_minutes} minutes</Text>
                      <Text className="text-[#a5d294] text-xs">
                        Genre: {choice?.genre_names?.join(', ')}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className='flex flex-col items-center justify-center mt-4'>
                  <Text className='text-[#a5d294] font-bold font-bungee mb-2'>
                    SOURCES
                  </Text>
                  <Sources />
                </View>

                <View className='flex flex-col items-center justify-center mt-6'>
                  <Text className='text-[#a5d294] font-bold font-bungee'>
                    REVIEWS
                  </Text>
                  <Reviews />
                </View>
              </View>
            </View>
          </View>
        ) : 
          <Text className='text-white text-center mt-10'>No choice selected</Text>
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
