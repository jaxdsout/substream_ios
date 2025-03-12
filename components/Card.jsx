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
  
  return (
    <View className='px-4 py-4 flex flex-col items-center justify-center'>
      <TouchableOpacity onPress={handleChoice}>
        <Image source={{ uri: result.image_url }} className='h-80 w-48 rounded-lg' />
        <View className="absolute bottom-0 w-full bg-black/60 p-2">
          <Text className="text-white text-center">
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