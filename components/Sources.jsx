import { View, Image, Linking, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import logos from "@/constants/logos"
import { connect } from 'react-redux'

const logoMap = {
  "MAX": logos.MaxLogo,
  "Netflix": logos.NetflixLogo,
  "Hulu": logos.HuluLogo,
  "Paramount Plus": logos.ParamountLogo,
  "Paramount+ with Showtime": logos.ParamountLogo,
  "Disney+": logos.DisneyLogo,
  "STARZ": logos.StarzLogo,
  "Tubi TV": logos.TubiLogo,
  "Prime Video": logos.PrimeLogo,
  "Peacock Premium": logos.PeacockLogo,
  "Pluto TV": logos.PlutoLogo,
  "MGM+": logos.MGMLogo,
  "Shudder": logos.ShudderLogo,
  "AMC+": logos.AMCLogo,
  "The CW": logos.CWLogo,
  "Discovery+": logos.DiscoveryLogo,
  "Crackle": logos.CrackleLogo,
  "Amazon Freevee": logos.FreeveeLogo,
  "AppleTV+": logos.AppleTVLogo,
  "The Roku Channel": logos.RokuLogo,
  "fuboTV": logos.FuboLogo,
  "Kanopy": logos.KanopyLogo,
};

const Sources = ({ choice }) => {
    const [filteredSources, setFilteredSources] = useState([]);

    function filterUniqueSources(sources) {
      const subSources = [];
      const sourceNames = new Set();  

      console.log(sources)
  
      for (const source of sources) {
        let { name, type, web_url } = source;
        const sourceKey = `${name}-${type}`;
  
        const logo = logoMap[name] || null;
  
        if (
          type === "sub" &&
          !sourceNames.has(sourceKey) &&
          !name.includes("(Via") &&
          !name.includes("(via") &&
          // !name.includes("with") &&
          !name.includes("On Demand")
        ) {
          subSources.push({ ...source, name, web_url, logo });
          sourceNames.add(sourceKey);
        }
      }
      
      console.log(subSources)
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
            contentContainerStyle={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => Linking.openURL(item.web_url)}>
                {item && <Image source={item.logo} className="h-24 w-24" />}
              </TouchableOpacity>
            )}
            keyExtractor={(item) => `${item.name}-${item.type}`}
            scrollEnabled={false}
        />
    </View>
  )
}

const mapStateToProps = state => ({
    choice: state.choice
})
  
export default connect(mapStateToProps, {  })(Sources);