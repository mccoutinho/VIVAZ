import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, SafeAreaView, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Card from "./Card";
import Details from "./Details";
import { Ionicons } from "@expo/vector-icons";
import CriarPlano from "./CriarPlano";

const CardList = ({ trajetos, navigation, route }) => {
  const [id, setID] = useState(null);
  const [text, setText] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);
  const [duration, setDuration] = useState(null);
  const [type, setType] = useState(null);
  const [dificulty, setDificulty] = useState(null);
  const [stops, setStops] = useState([]);
  const [terrain, setTerrain] = useState(null);
  const [circuit, setCircuit] = useState(null);
  const [rota, setRoute] = useState(null);
  const [pontos, setPontos] = useState(null);

  const getInfo = (
    cardId,
    cardText,
    cardImage,
    cardDescricao,
    cardDuracao,
    cardTipo,
    cardDificuldade,
    cardParagens,
    cardTerreno,
    cardCircuito,
    cardRota,
    cardPontos
  ) => {
    setID(cardId);
    setText(cardText);
    setImage(cardImage);
    setDescription(cardDescricao);
    setDuration(cardDuracao);
    setType(cardTipo);
    setDificulty(cardDificuldade);
    setStops(cardParagens);
    setTerrain(cardTerreno);
    setCircuit(cardCircuito);
    setRoute(cardRota);
    setPontos(cardPontos);
  };
  
  const explorar = navigation.dangerouslyGetParent();

  const hideNav = (hide) => {
      if(!hide) {
        setTimeout(() => {
          explorar.setOptions({ tabBarVisible:true });
        }, 10);
        
      }
  
      if(hide) {
        setTimeout(() => {
          explorar.setOptions({ tabBarVisible:false });
        }, 10);
      }    
  }

  if (!id) {
    hideNav(id);
    return (
      <SafeAreaView>
        <View style={{ marginLeft: 25, marginTop: 30 }}>
          <Text
            style={{ fontFamily: "Roboto", fontSize: 40, fontWeight: "bold" }}
          >
            Explorar
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 200,
            }}
          >
            {trajetos.map((rota) => (
              <Card
                key={rota.id}
                id={rota.id}
                text={rota.trajeto}
                image={{ uri: rota.imagem }}
                descricao={rota.descricao}
                duracao={rota.duracao}
                tipo={rota.tipo}
                dificuldade={rota.dificuldade}
                paragens={rota.paragens}
                terreno={rota.terreno}
                circuito={rota.circuito}
                route={rota.rota}
                pontos={rota.pontos}
                navigation={navigation}
                getInfo={getInfo}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    hideNav(id);
    return (
      <SafeAreaView style={{ marginTop: 40 }}>
      <View style={{flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center"}}>
        <TouchableOpacity style={{marginLeft:24, marginBottom: 20}} onPress={() => setID(null)}>
          <Image source={require("../../assets/onboarding/back.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight:30, marginBottom: 20 }} onPress={() => navigation.navigate('CriarPlano',{id:id, nome:text, imagem:image})}>
          <Image style={{alignSelf:"center"}} source={require("../../assets/planos.png")} />
          <Text style={{ alignSelf:"center", fontFamily:"Roboto", fontSize:14 }}>Planos</Text>
        </TouchableOpacity>
        </View>
        <Details
          id={id}
          text={text}
          image={image}
          description={description}
          duration={duration}
          type={type}
          dificulty={dificulty}
          stops={stops}
          terrain={terrain}
          circuit={circuit}
          rotas={rota}
          pontos={pontos}
          navigation={navigation}
        />
      </SafeAreaView>
    );
  }
};

export default CardList;
