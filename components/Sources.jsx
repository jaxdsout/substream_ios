import { View, Image, Linking, FlatList, TouchableOpacity, Text, SafeAreaView } from 'react-native'
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
  "Amazon Freevee": logos.PrimeLogo,
  "AppleTV+": logos.AppleTVLogo,
  "The Roku Channel": logos.RokuLogo,
  "fuboTV": logos.FuboLogo,
  "Kanopy": logos.KanopyLogo,
  "truTV": logos.trutvLogo,
  "TNT": logos.tntLogo,
  "TBS": logos.tbsLogo,
};

const Sources = ({ choice, region }) => {
    const [filteredSources, setFilteredSources] = useState([]);

    function filterUniqueSources(sources) {
      const subSources = [];
      const sourceNames = new Set();  
  
      for (const source of sources) {
        let { name, type, web_url } = source;
        const sourceKey = `${name}-${type}`;
        const logo = logoMap[name] || null;
        
        if ((type === "sub" && !sourceNames.has(sourceKey) && !/(?:\(Via|\(via|On Demand)/.test(name)) || (type === 'free')) {
          subSources.push({ ...source, name, web_url, logo });
          sourceNames.add(sourceKey);
        }
      }
      
      return subSources;
    }

    console.log([choice.sources])
    
    useEffect(() => {
        if (choice.sources) {
          setFilteredSources(filterUniqueSources(choice.sources));
        }
    }, [choice]);

    console.log(filteredSources)


  if (filteredSources.length === 0) return (
    <SafeAreaView>
      <View className='border-2 border-[#658c57] rounded-full p-4 w-11/12 '>
        <Text className="text-[#a5d294] text-center w-60"> This content is currently not streaming on {region} platforms.</Text>
      </View>
    </SafeAreaView>
  )
  
  return (
    <View className='flex flex-row items-center justify-center border-2 border-[#658c57] rounded-full py-3 w-11/12'>
      <FlatList
        data={filteredSources}
        contentContainerStyle={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.web_url)}>
            {item && <Image source={item.logo} style={{ height: '75', width: '75', borderRadius: '10' }} />}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item.name}-${item.type}`}
        scrollEnabled={false}
      />
    </View>
  )
}

const mapStateToProps = state => ({
    choice: state.choice,
    region: state.region
})
  
export default connect(mapStateToProps, {  })(Sources);