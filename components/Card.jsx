import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { load_choice } from '@/store/actions/search'
import { connect } from 'react-redux'
import { router } from 'expo-router'

const Card = ({ result, region, load_choice }) => {
  
  const handleChoice = async () => {
    await load_choice(result.id, region)
    router.push(`/choice/${result.id}`)
  }

  const posterLarge = result.image_url.replace('w185', 'w780');

  console.log(result, "result")
  
  return (
    <View className='p-3 flex flex-col items-center justify-cente z-30'>
      <TouchableOpacity onPress={handleChoice}>
        <Image source={{ uri: posterLarge }} className='h-80 w-44 rounded-lg' />
        <View className="absolute bottom-0 w-full bg-black/70 p-2 rounded-bl-lg rounded-br-lg">
          <Text className="text-[#a5d294] text-center text-sm">
            {result.name.length > 40 ? result.name.substring(0, 37) + '...' : result.name}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = state => ({
  region: state.region
})

export default connect(mapStateToProps, { load_choice })(Card);