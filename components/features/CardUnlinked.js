import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const CardUnlinked = ({id, text, image}) => {

    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.card}>
            <Image source={image} style={styles.image} blurRadius={1} />
            <Text style={styles.text}>{text}</Text>
          </View>
      </SafeAreaView>
    );
    
  };
  
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    image: {
      flex: 1,
      width: "100%",
      height: undefined,
      zIndex: -1,
      alignSelf: "auto",
      borderRadius: 20,
      opacity: 1,
    },
    card: {
      backgroundColor: "grey",
      width: 350,
      height: 200,
      flexDirection: "column",
      justifyContent: "flex-end",
      borderRadius: 20,
    },
    text: {
      fontSize: 24,
      fontWeight: "bold",
      zIndex: 1,
      position: "absolute",
      padding: 20,
      fontFamily: "Roboto",
      color: 'white',
    },
  });
  
  export default CardUnlinked;
  