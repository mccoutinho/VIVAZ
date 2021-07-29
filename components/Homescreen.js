import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import firebase from "../config/firebaseConfig";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Conquistas from "./Conquistas";
import Explorar from "./Explorar";
import Feed from "./Feed";
import Perfil from "./Perfil";
import Planos from "./Planos";

import Svg, { Path, Circle, Ellipse } from "react-native-svg";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "./redux/actions/index";
import GetRota from "./GetRota";

const Homescreen = ({ navigation, fetchUser, currentUser }) => {
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Social") {
            if (focused) {
              return (
                <Svg
                  width="35"
                  height="34"
                  viewBox="0 0 28 27"
                  fill="#ff7033"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M4.00016 11.8801C4.00016 10.9266 4.45348 10.0298 5.22131 9.46442L14.0002 3L22.779 9.46443C23.5468 10.0298 24.0002 10.9266 24.0002 11.8801V22.5C24.0002 23.8807 22.8809 25 21.5002 25H18.0002C17.4479 25 17.0002 24.5523 17.0002 24V18C17.0002 17.7239 16.7763 17.5 16.5002 17.5H11.5002C11.224 17.5 11.0002 17.7239 11.0002 18V24C11.0002 24.5523 10.5524 25 10.0002 25H6.50016C5.11945 25 4.00016 23.8807 4.00016 22.5V11.8801Z"
                    stroke="#ff7033"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              );
            } else {
              return (
                <Svg
                  width="35"
                  height="34"
                  viewBox="0 0 28 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M4.00016 11.8801C4.00016 10.9266 4.45348 10.0298 5.22131 9.46442L14.0002 3L22.779 9.46443C23.5468 10.0298 24.0002 10.9266 24.0002 11.8801V22.5C24.0002 23.8807 22.8809 25 21.5002 25H18.0002C17.4479 25 17.0002 24.5523 17.0002 24V18C17.0002 17.7239 16.7763 17.5 16.5002 17.5H11.5002C11.224 17.5 11.0002 17.7239 11.0002 18V24C11.0002 24.5523 10.5524 25 10.0002 25H6.50016C5.11945 25 4.00016 23.8807 4.00016 22.5V11.8801Z"
                    stroke="#141414"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              );
            }
          }
          if (route.name === "Conquistas") {
            if (focused) {
              return (
                <Svg
                  width="40"
                  height="40"
                  viewBox="0 0 27 27"
                  fill="#ff7033"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M12.808 4.65797C13.0647 4.0432 13.9356 4.0432 14.1923 4.65797L16.3938 9.93186C16.4964 10.1775 16.7215 10.3505 16.9854 10.3862L22.7877 11.1715C23.4379 11.2595 23.6697 12.081 23.1613 12.4958L18.6811 16.1518C18.4596 16.3326 18.3601 16.6235 18.4246 16.902L19.857 23.0919C20.0121 23.762 19.2585 24.27 18.6954 23.8748L13.931 20.5309C13.6724 20.3494 13.3279 20.3494 13.0693 20.5309L8.30486 23.8749C7.74183 24.27 6.98824 23.7621 7.14331 23.0919L8.57561 16.902C8.64006 16.6235 8.54058 16.3326 8.31911 16.1518L3.83896 12.4958C3.33064 12.081 3.56238 11.2595 4.21256 11.1715L10.015 10.3862C10.2788 10.3505 10.5039 10.1775 10.6065 9.93186L12.808 4.65797Z"
                    stroke="#ff7033"
                    stroke-width="2"
                    stroke-miterlimit="3.3292"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              );
            } else {
              return (
                <Svg
                  width="40"
                  height="40"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M12.808 4.65797C13.0647 4.0432 13.9356 4.0432 14.1923 4.65797L16.3938 9.93186C16.4964 10.1775 16.7215 10.3505 16.9854 10.3862L22.7877 11.1715C23.4379 11.2595 23.6697 12.081 23.1613 12.4958L18.6811 16.1518C18.4596 16.3326 18.3601 16.6235 18.4246 16.902L19.857 23.0919C20.0121 23.762 19.2585 24.27 18.6954 23.8748L13.931 20.5309C13.6724 20.3494 13.3279 20.3494 13.0693 20.5309L8.30486 23.8749C7.74183 24.27 6.98824 23.7621 7.14331 23.0919L8.57561 16.902C8.64006 16.6235 8.54058 16.3326 8.31911 16.1518L3.83896 12.4958C3.33064 12.081 3.56238 11.2595 4.21256 11.1715L10.015 10.3862C10.2788 10.3505 10.5039 10.1775 10.6065 9.93186L12.808 4.65797Z"
                    stroke="#141414"
                    stroke-width="2"
                    stroke-miterlimit="3.3292"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              );
            }
          }
          if (route.name === "Explorar") {
            if (focused) {
              return (
                <Svg
                  width="40"
                  height="39"
                  viewBox="0 0 28 27"
                  fill="#ff7033"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M24.0002 13.0001C24.0002 17.3461 17.8078 22.9023 15.1688 25.0728C14.484 25.6361 13.5163 25.6361 12.8315 25.0728C10.1925 22.9023 4.00017 17.3461 4.00017 13.0001C4.00017 7.47724 8.47732 3.00009 14.0002 3.00009C19.523 3.00009 24.0002 7.47724 24.0002 13.0001Z"
                    stroke="#ff7033"
                    stroke-width="2"
                  />
                  <Circle
                    cx="14.0002"
                    cy="13.0001"
                    r="3"
                    stroke="#ff7033"
                    stroke-width="2"
                    fill="#ffffff"
                  />
                </Svg>
              );
            } else {
              return (
                <Svg
                  width="35"
                  height="34"
                  viewBox="0 0 28 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M24.0002 13.0001C24.0002 17.3461 17.8078 22.9023 15.1688 25.0728C14.484 25.6361 13.5163 25.6361 12.8315 25.0728C10.1925 22.9023 4.00017 17.3461 4.00017 13.0001C4.00017 7.47724 8.47732 3.00009 14.0002 3.00009C19.523 3.00009 24.0002 7.47724 24.0002 13.0001Z"
                    stroke="#141414"
                    stroke-width="2"
                  />
                  <Circle
                    cx="14.0002"
                    cy="13.0001"
                    r="3"
                    stroke="#141414"
                    stroke-width="2"
                  />
                </Svg>
              );
            }
          }
          if (route.name === "Planos") {
            if (focused) {
              return (
                <Svg
                  width="40"
                  height="40"
                  viewBox="0 0 27 27"
                  fill="#ff7033"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M14.641 18.5858L20.715 22.8039C21.0465 23.0341 21.5002 22.7968 21.5002 22.3932V9C21.5002 6.79086 19.7093 5 17.5002 5H9.50017C7.29103 5 5.50017 6.79086 5.50017 9V22.3932C5.50017 22.7968 5.95381 23.0341 6.28536 22.8039L12.3594 18.5858C13.0453 18.1094 13.955 18.1094 14.641 18.5858Z"
                    stroke="#ff7033"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              );
            } else {
              return (
                <Svg
                  width="40"
                  height="40"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M14.641 18.5858L20.715 22.8039C21.0465 23.0341 21.5002 22.7968 21.5002 22.3932V9C21.5002 6.79086 19.7093 5 17.5002 5H9.50017C7.29103 5 5.50017 6.79086 5.50017 9V22.3932C5.50017 22.7968 5.95381 23.0341 6.28536 22.8039L12.3594 18.5858C13.0453 18.1094 13.955 18.1094 14.641 18.5858Z"
                    stroke="#141414"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              );
            }
          }

          if (route.name === "Perfil") {
            if (focused) {
              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  width="40"
                  viewBox="0 0 28 27"
                >
                  <Circle
                    cx="14"
                    cy="8.8"
                    r="4.5"
                    fill="#ff7033"
                    stroke="#ff7033"
                    stroke-width="2"
                    stroke-miterlimit="10"
                  />
                  <Ellipse
                    cx="14"
                    cy="19.7"
                    rx="7.2"
                    ry="3"
                    fill="#ff7033"
                    stroke="#ff7033"
                    stroke-width="2"
                    stroke-miterlimit="10"
                  />
                </Svg>
              );
            } else {
              return (
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  width="40"
                  viewBox="0 0 28 27"
                >
                  <Circle
                    cx="14"
                    cy="8.8"
                    r="4.5"
                    fill="none"
                    stroke="#141414"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />
                  <Ellipse
                    cx="14"
                    cy="19.7"
                    rx="7.2"
                    ry="3"
                    fill="none"
                    stroke="#141414"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />
                </Svg>
              );
            }
          }
        },
      })}
      tabBarOptions = {{
        activeTintColor: "#ff7033",
        inactiveTintColor: "#141414",
        style: {
          height: 66,
        },
        keyboardHidesTabBar: "true",
        labelStyle: {
          fontSize:14,
          fontFamily:"Roboto",
        },
      }} 
    >
      <Tab.Screen name="Social" component={Feed} />
      <Tab.Screen name="Conquistas" component={Conquistas} />
      <Tab.Screen name="Explorar" component={Explorar} options={{}} />
      <Tab.Screen name="Planos" component={Planos} />
      <Tab.Screen name="Perfil" component={Perfil} options={{}} />
    </Tab.Navigator>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Homescreen);
