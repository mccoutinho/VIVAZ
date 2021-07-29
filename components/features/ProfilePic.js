import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";


const ProfilePic = ({image}) => {

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Image source={image} style={styles.image} />
        </View>
    </SafeAreaView>
  );  
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius:500,
    marginTop: 20,
  },
  image: {
    flex: 1,
    width: "100%",
    height: undefined,
    zIndex: -1,
    alignSelf: "auto",
    borderRadius: 500,
    opacity: 1,
  },
  card: {
    backgroundColor: "grey",
    width: 106,
    height: 106,
    flexDirection: "column",
    justifyContent: "flex-end",
    borderRadius: 500,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    zIndex: 1,
    position: "absolute",
    padding: 20,
    fontFamily: "Roboto",
  },
});

export default ProfilePic;
