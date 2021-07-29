import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Register from "./components/Register";
import Login from "./components/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "./config/firebaseConfig";
import Homescreen from "./components/Homescreen";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./components/redux/reducers";
import thunk from "redux-thunk";
import Details from "./components/features/Details";
import Conquistas from "./components/Conquistas";
import Explorar from "./components/Explorar";
import Planos from "./components/Planos";
import Perfil from "./components/Perfil";
import Card from "./components/features/Card";
import Onboarding from "./components/Onboarding";
import CardList from "./components/features/CardList";
import GetRota from "./components/GetRota";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const Stack = createStackNavigator();
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.displayUser) {
          setLoginCheck(true);
        }
      } else {
        setLoginCheck(false);
      }
    });
  }, []);

  if (loginCheck) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName={Homescreen}>
            <Stack.Screen name="Homescreen" component={Homescreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Homescreen" component={Homescreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
