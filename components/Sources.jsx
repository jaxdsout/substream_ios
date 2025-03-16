import { View, Image, Linking, FlatList, TouchableOpacity, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import logos from "@/constants/logos"
import { connect } from 'react-redux'

const logoMap = {
  "MAX": logos.MaxLogo,
  "Netflix": logos.NetflixLogo,
  "Hulu": logos.HuluLogo,
  "Paramount+": logos.ParamountLogo,
  "Disney+": logos.DisneyLogo,
  "STARZ": logos.StarzLogo,
  "Tubi TV": logos.TubiLogo,
  "Prime Video": logos.PrimeLogo,
  "Peacock": logos.PeacockLogo,
  "Pluto TV": logos.PlutoLogo,
  "MGM+": logos.MGMLogo,
  "Shudder": logos.ShudderLogo,
  "AMC+": logos.AMCLogo,
  "The CW": logos.CWLogo,
  "Amazon Freevee": logos.FreeveeLogo,
  "Discovery+": logos.DiscoveryLogo,
  "Crackle": logos.CrackleLogo,
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
      const subSources = new Map();
    
      function normalizeName(name) {
        if (name === "Paramount+ with Showtime" || name === "Paramount Plus") {
          return "Paramount+";
        }
        
        if (name === "Peacock Premium") {
          return "Peacock";
        }

        return name;
      }
    
      for (const source of sources) {
        let { name, type, web_url } = source;
        const normalizedName = normalizeName(name);
        const sourceKey = `${normalizedName}`;
        const logo = logoMap[normalizedName] || null;
        
        if ((type === "sub" || type === "free") && !/(?:\(Via|\(via|On Demand)/.test(name)) {
          if (!subSources.has(normalizedName)) {
            subSources.set(sourceKey, { ...source, name: normalizedName, web_url, logo });
          }
        }
      }
      
      return Array.from(subSources.values());
    }

    
    useEffect(() => {
        if (choice.sources) {
          setFilteredSources(filterUniqueSources(choice.sources));
        }
    }, [choice]);

  if (filteredSources.length === 0) return (
      <View className='bg-stone-900/60 rounded-full py-8 px-3 w-11/12 flex flex-col items-center justify-center '>
        <Text className="text-[#a5d294] text-center w-60"> This content is currently not streaming on {region} platforms.</Text>
      </View>
  )
  
  return (
    <View className='bg-stone-900/60  rounded-full py-8 px-3 w-full'>
      <FlatList
        data={filteredSources}
        contentContainerStyle={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => Linking.openURL(item.web_url)}>
            {item && <Image source={item.logo} style={{ height: '75', width: '75', borderRadius: '10' }} />}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item.name}`}
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