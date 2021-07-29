import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Card from "./features/Card";
import firebase from "../config/firebaseConfig";
import { RotationGestureHandler } from "react-native-gesture-handler";
import CardList from "./features/CardList";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GetRota from "./GetRota";
import Details from "./features/Details";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import CriarPlano from "./features/CriarPlano";
import ListUsers from "./features/ListUsers";
import Conquista from "./features/Conquista";

const getTrajeto = () => {
  const [trajeto, setTrajeto] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("rotas")
      .onSnapshot((snapshot) => {
        const newTrajeto = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTrajeto(newTrajeto);
      });
  }, []);

  return trajeto;
};

const CardListComponent = ({ navigation }) => {
  const trajetos = getTrajeto();
  return (
    <View style={{ backgroundColor: "#fcfcfc" }}>
      <CardList trajetos={trajetos} navigation={navigation} />
    </View>
  );
};

const Explorar = ({ navigation, route }) => {
  const Stack = createStackNavigator();
  
  return (
    <Stack.Navigator headerMode="none" initialRouteName={CardListComponent}>
      <Stack.Screen name="CardListComponent" component={CardListComponent} />
      <Stack.Screen name="Details" getComponent={() => require('./features/Details').default} />
      <Stack.Screen name="GetRota" component={GetRota}/>
      <Stack.Screen name="CriarPlano" component={CriarPlano} />
      <Stack.Screen name="ListUsers" component={ListUsers} />
      <Stack.Screen name="Conquista" component={Conquista} />
    </Stack.Navigator>
  );
};

export default Explorar;
