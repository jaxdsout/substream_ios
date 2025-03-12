import { View, Image, Linking, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import logos from "@/constants/logos"
import { connect } from 'react-redux'

function getLogo(name) {        
    switch (name) {
      case "MAX":
          return logos.MaxLogo;
      case "Netflix":
          return logos.NetflixLogo;
      case "Hulu":
          return logos.HuluLogo;
      case "Paramount Plus":
        return logos.ParamountLogo;
      case "Disney+":
        return logos.DisneyLogo;
      case "STARZ":
        return logos.StarzLogo;
      case "Tubi TV":
        return logos.TubiLogo;
      case "Prime Video":
        return logos.PrimeLogo
      case "Peacock Premium":
        return logos.PeacockLogo
      case "Pluto TV":
        return logos.PlutoLogo
      case "MGM+":
        return logos.MGMLogo
      case "Shudder":
        return logos.ShudderLogo
      case "AMC+":
        return logos.AMCLogo
      case "The CW":
        return logos.CWLogo
      case "Discovery+":
        return logos.DiscoveryLogo
      case "Crackle":
        return logos.CrackleLogo
      case "Amazon Freevee":
        return logos.FreeveeLogo
      case "AppleTV+":
        return logos.AppleTVLogo
      case "The Roku Channel":
        return logos.RokuLogo
      case "fuboTV":
        return logos.FuboLogo
      case "Kanopy":
        return logos.KanopyLogo
      default:
          return ``;
    }
}

const SourceIcon = (source) => {
    const logo = getLogo(source.name);

    const handleIcon = (source) => {
        Linking.openURL(source.web_url)
    }

    return (
        <TouchableOpacity onPress={handleIcon}>
            <Image source={{ uri: logo }} className='h-24 w-24'/>
        </TouchableOpacity>
    )
}

const Sources = ({ choice }) => {
    const [filteredSources, setFilteredSources] = useState([]);

    function filterUniqueSources(sources) {
        const subSources = [];
        const sourceNames = new Set();  

        for (const source of sources) {
            let { name, type, web_url, image_url } = source;
            const sourceKey = `${name}-${type}`;

            if ((type==="sub") && !sourceNames.has(sourceKey) && (!name.includes("(Via") && !name.includes("(via") && !name.includes("with") && !name.includes("On Demand"))){
                subSources.push({...source, name, web_url, image_url})
                sourceNames.add(sourceKey);
            }
        }
        return subSources;
    }

    useEffect(() => {
        if (choice?.sources) {
            setFilteredSources(filterUniqueSources(choice.sources));
        } else {
            setFilteredSources([]);
        }
    }, [choice]);

  return (
    <View className='flex flex-row items-center justify-center'>
        <FlatList
            data={filteredSources}
            renderItem={({item}) => <SourceIcon source={item} />}
            keyExtractor={(item) => `${item.name}-${item.type}`}
        />
    </View>
  )
}

const mapStateToProps = state => ({
    choice: state.choice
})
  
export default connect(mapStateToProps, {  })(Sources);