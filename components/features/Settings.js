import React from "react";
import { View, Text } from "react-native";
import firebase from "../../config/firebaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";

const Settings = ({ setSettings }) => { 
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          <TouchableOpacity onPress={() => setSettings(false)}>
            <Ionicons name="chevron-back-outline" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

export default Settings;
