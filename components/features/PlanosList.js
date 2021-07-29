import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, SafeAreaView, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PlanoCard from "./PlanoCard";
import PlanosDetails from "./PlanosDetails";
import dateFormat from "dateformat";

const PlanosList = ({ planos, pendingplano, navigation, route }) => {
  const [id, setID] = useState(null);
  const [rota, setRota] = useState(null);
  const [nome, setNome] = useState(null);
  const [imagem, setImagem] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [date, setDate] = useState(null);
  const [hora, setHora] = useState(null);
  const [criador, setCriador] = useState([]);
  const [convidados, setConvidados] = useState([]);
  const [pendingList, setPending] = useState([])

  const getInfo = (
    cardId,
    cardNome,
    cardImagem,
    cardDescricao,
    cardRota,
    cardDate,
    cardHora,
    cardCriador,
    cardConvidados,
    cardPending
  ) => {
    setID(cardId);
    setNome(cardNome);
    setImagem(cardImagem);
    setDescricao(cardDescricao);
    setDate(cardDate);
    setHora(cardHora);
    setCriador(cardCriador);
    setConvidados(cardConvidados);
    setRota(cardRota);
    setPending(cardPending);
  };

  if (!id) {
    return (
      <SafeAreaView>
        <View style={{ marginHorizontal: 25, marginTop: 30, flexDirection:"row", justifyContent:"space-between" }}>
          <Text
            style={{ fontFamily: "Roboto", fontSize: 40, fontWeight: "bold" }}
          >
            Planos
          </Text>
          <TouchableOpacity style={{flexDirection:"column", alignItems:"center"}}>
            <Image source={require('../../assets/criar.png')} />
            <Text style={{fontFamily:"Roboto", fontSize:16}}>Criar</Text>
          </TouchableOpacity>
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
          {(pendingplano.length!=0) ? <Text style={{fontFamily:"Roboto", fontSize:18, fontWeight:"bold", color:"#8c8ca1", marginTop:20}}>Planos pendentes</Text>:<View></View>}
            {
              pendingplano.map((pendingPlano, index) => (
              <PlanoCard
                key={index}
                id={pendingPlano.id}
                nome={pendingPlano.nome}
                imagem={pendingPlano.imagem}
                descricao={pendingPlano.descricao}
                data={dateFormat(pendingPlano.data.toDate(), "dd mmmm")}
                hora={dateFormat(pendingPlano.data.toDate(), "HH:MM")}
                criador={pendingPlano.criador}
                convidados={pendingPlano.convidados}
                rota={pendingPlano.rota}
                pendingState={true}
                pending = {pendingPlano.pending}
                navigation={navigation}
                getInfo={getInfo}
              />
            ))
            }
            <Text style={{fontFamily:"Roboto", fontSize:18, fontWeight:"bold", color:"#8c8ca1", marginTop:20}}>Meus planos</Text>  
             { 
              planos.map((novoPlano, index) => (
              <PlanoCard
                key={index}
                id={novoPlano.id}
                nome={novoPlano.nome}
                imagem={novoPlano.imagem}
                descricao={novoPlano.descricao}
                data={dateFormat(novoPlano.data.toDate(), "dd mmmm")}
                hora={dateFormat(novoPlano.data.toDate(), "HH:MM")}
                criador={novoPlano.criador}
                convidados={novoPlano.convidados}
                rota={novoPlano.rota}
                pendingState={false}
                pending = {novoPlano.pending}
                navigation={navigation}
                getInfo={getInfo}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ marginTop: 40 }}>
      <View style={{flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center"}}>
        <TouchableOpacity style={{marginLeft:24, marginBottom: 20}} onPress={() => setID(null)}>
          <Image source={require("../../assets/onboarding/back.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight:30, marginBottom: 20 }}>
          <Image style={{alignSelf:"center"}} source={require("../../assets/editar.png")} />
          <Text style={{ alignSelf:"center", fontFamily:"Roboto", fontSize:14 }}>Editar</Text>
        </TouchableOpacity>
        </View>
        <PlanosDetails
          id={id}
          rota={rota}
          nome={nome}
          imagem={imagem}
          description={descricao}
          data={date}
          hora={hora}
          criador={criador}
          convidados={convidados}
          navigation={navigation}
        />
      </SafeAreaView>
    );
  }
};

export default PlanosList;
