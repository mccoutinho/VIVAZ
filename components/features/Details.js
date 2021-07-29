import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CardUnlinked from "./CardUnlinked";

const Details = ({ id, text, image, description, rotas, duration, circuit, dificulty, stops, pontos, route, navigation }) => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  
  return (
    <SafeAreaView>
      <ScrollView style={{marginBottom:100}}>
        <CardUnlinked id={id} text={text} image={image} />
        <View
          style={{
            width: "85%",
            height: "100%",
            alignSelf: "center",
            marginTop: 24,
          }}
        >
          <Text style={styles.titles}>Descrição</Text>
          <Text style={styles.body}>{description}</Text>
          <Text style={styles.titles}>Características</Text>
          <View
            style={{
              flex: 0.3,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: 40, width: 40, marginVertical:15 }}
                source={{uri:dificulty}}
              />
              <Text style={styles.legenda}>DIFICULDADE</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: 70, width: 70 }}
                source={require("../../assets/ICONES_DISTANCIA.png")}
              />
              <Text style={styles.legenda}>{circuit}</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: 70, width: 70 }}
                source={require("../../assets/ICONES_CIDADE.png")}
              />
              <Text style={styles.legenda}>CITADINA</Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: 70, width: 70 }}
                source={require("../../assets/ICONES_RURAL.png")}
              />
              <Text style={styles.legenda}>RURAL</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: 70, width: 70 }}
                source={require("../../assets/ICONES_DURACAO.png")}
              />
              <Text style={styles.legenda}>{duration}</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: 70, width: 70 }}
                source={require("../../assets/ICONES_ESTRADA.png")}
              />
              <Text style={styles.legenda}>ESTRADA</Text>
            </View>
          </View>
          <View style={{ marginBottom: 300 }}>
            <Text style={styles.titles}>Mapa</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 5,
                alignItems: "center",
              }}
            >
            
            {stops.map((paragens, index) => (
              <View key={index} style={{width:"90%", flexDirection:"row", marginVertical:5}}>
              { (index == 0 || index == stops.length-1) ?
              <Image source={require("../../assets/location.png")} />
              : <Image source={require("../../assets/flag.png")} />
              }
              <Text key={index} style={{marginLeft:5, fontFamily:"Roboto", fontSize:14}}>{paragens}</Text>
              </View>
            ))}
              
            </View>
            </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {navigation.navigate('GetRota', {track:rotas, pontosinteresse:pontos})}}
        style={{
          width: 360,
          height: 64,
          backgroundColor: "#ff7033",
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          elevation: 8,
          position: "absolute",
          top: windowHeight - 190,
          left: windowWidth / 2 - 360 / 2,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "Roboto",
            color: "#f7f7fc",
          }}
        >
          Começar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  titles: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
    marginTop: 2,
    fontFamily: "Roboto",
    marginBottom: 20,
  },
  legenda: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
});
