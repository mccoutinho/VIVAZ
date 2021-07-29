import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import firebase from "../config/firebaseConfig";
import { createStackNavigator } from "@react-navigation/stack";
import PlanosList from "./features/PlanosList";

const getPendingPlanos = () => {
  const [pending, setPendingPlano] = useState([]);
  const uid = firebase.auth().currentUser.uid;

  useEffect(() => {
    firebase
      .firestore()
      .collection("planos")
      .orderBy("data", "asc")
      .where("pending", "array-contains", uid)
      .onSnapshot((snapshot) => {
        let PendingPlano = snapshot.docs.map((doc)=> {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setPendingPlano(PendingPlano);
      });
  }, [pending]);
  return pending;
};

const getPlanos = () => {
  const [plano, setPlano] = useState([]);
  const uid = firebase.auth().currentUser.uid;

  useEffect(() => {
    firebase
      .firestore()
      .collection("planos")
      .orderBy("data", "asc")
      .where("criador", "array-contains", uid)
      .onSnapshot((snapshot) => {
        let newPlano = snapshot.docs.map((doc)=> {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setPlano(newPlano);
      });
  }, []);
  return plano;
};

const CardListComponent = ({ navigation }) => {
    const planos = getPlanos();
    const pendingplano = getPendingPlanos();

    return (
      <View style={{ backgroundColor: "#fcfcfc", flex:1 }}>
        <PlanosList planos={planos} pendingplano={pendingplano} navigation={navigation} />
      </View>
    );
  };


const Planos = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none" initialRouteName={CardListComponent}>
      <Stack.Screen name="CardListComponent" component={CardListComponent} />
      <Stack.Screen name="PlanosDetails" getComponent={() => require('./features/PlanosDetails').default} />
    </Stack.Navigator>
  );
};

export default Planos;