import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import logos from "@/constants/logos"
import { connect } from 'react-redux'

const Reviews = ({ choice }) => {

    const handleIcon = (name) => {
        if (name === 'imdb') {
            Linking.openURL(`https://www.imdb.com/title/${choice?.imdb_id}/`)
        } else if (name === 'letter') {
            const letterboxd = choice?.title.toLowerCase().replace(/ /g,"-").replace(/[:().!,?'"]/g, '')
            Linking.openURL(`https://letterboxd.com/film/${letterboxd}/`)
        }
    }

    return (
    <View className='flex flex-row justify-center items-center mt-3'>
        <TouchableOpacity onPress={() => handleIcon("imdb")}>
            <Image source={logos.imdbLogo} style={{ height: '50', width: '50', borderRadius: '10', marginHorizontal: '10' }}/>
        </TouchableOpacity>
    
        {choice?.type === "movie" && (
            <TouchableOpacity onPress={() => handleIcon("letter")}>
                <Image source={logos.letterLogo} style={{ height: '50', width: '50', borderRadius: '10', marginHorizontal: '10' }}/>
            </TouchableOpacity>
        )}
    </View>
    )
}

const mapStateToProps = state => ({
    choice: state.choice
})

export default connect(mapStateToProps, {  })(Reviews);