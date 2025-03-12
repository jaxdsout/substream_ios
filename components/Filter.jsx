import React, { useState } from 'react'
import { AntDesign } from "@expo/vector-icons";
import { View, Text, FlatList, Pressable, TouchableOpacity } from "react-native";


const Dropdown = () => {
    const [isOpen, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const toggleDropdown = () => setOpen(!isOpen);
    const handleSelect = (item) => {
        setSelected(item);
        setOpen(false);
        onSel
    }

    return (
    <View>
        <TouchableOpacity>
            <Text>{selected || 'CONTENT SELECTION'}</Text>
            <AntDesign name={isOpen ? "up" : "down"} size={16} />
        </TouchableOpacity>
        {isOpen && (
        <View style={{ marginTop: 5, borderWidth: 1, borderRadius: 8 }}>
          {/* Options List */}
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelect(item)}
                style={{ padding: 10, backgroundColor: selected === item ? "#ddd" : "white" }}
              >
                <Text>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
    )
}

export default function Filter() {
    return (
        <Dropdown
            options={["TV & Movies", "Movies", "TV"]}
            onSelect={(value) => console.log("Selected:", value)}
        />
    )
}