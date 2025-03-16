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
    <View className='flex-row border-2 border-[#658c57] rounded-full py-3 px-8 w-full mt-2 justify-start items-center'>
        <View>
            <TouchableOpacity onPress={() => handleIcon("imdb")}>
                <Image source={logos.imdbLogo} style={{ height: '75', width: '75', borderRadius: '10' }}/>
            </TouchableOpacity>
        </View>
        <View>
            {choice?.type === "movie" && (
                <TouchableOpacity onPress={() => handleIcon("letter")}>
                    <Image source={logos.letterLogo} style={{ height: '75', width: '75', borderRadius: '10' }}/>
                </TouchableOpacity>
            )}
        </View>
    </View>
    )
}

const mapStateToProps = state => ({
    choice: state.choice
})

export default connect(mapStateToProps, {  })(Reviews);