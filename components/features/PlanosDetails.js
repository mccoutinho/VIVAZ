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
import ParticipantsList from "./ParticipantsList";

const PlanosDetails = ({
  id,
  rota,
  nome,
  imagem,
  description,
  data,
  hora,
  criador,
  convidados,
  navigation,
}) => {
  return (
    <SafeAreaView>
      <ScrollView style={{ marginBottom: 100 }}>
        <CardUnlinked id={id} text={nome} image={imagem} />
        <View
          style={{
            width: "85%",
            height: "100%",
            alignSelf: "center",
            marginTop: 24,
          }}
        >
          <Text style={styles.titles}>Nome</Text>
          <Text style={styles.body}>{nome}</Text>
          <Text style={styles.titles}>Descrição</Text>
          <Text style={styles.body}>{description}</Text>
          <Text style={styles.titles}>Quando</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Image
                style={{ marginRight: 5 }}
                source={require("../../assets/data.png")}
              />
              <Text style={styles.body}>{data}</Text>
            </View>
            <View style={{ flexDirection: "row", marginRight: 40 }}>
              <Image
                style={{ marginRight: 5 }}
                source={require("../../assets/hora.png")}
              />
              <Text style={styles.body}>{hora}</Text>
            </View>
          </View>
          <View style={{ marginBottom: 300 }}>
            <Text style={styles.titles}>Participantes</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              {convidados.map((element, index) => {
                return <ParticipantsList convidado={element} key={index} />;
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlanosDetails;

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
