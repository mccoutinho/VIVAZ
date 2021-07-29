import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Geojson } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

const GetRota = ({ navigation, route }) => {
  const GOOGLE_MAPS_APIKEY = "AIzaSyAo2oqjk2nX3AG9Oyp_56XffDEx3str-jM";
  const [location, setLocation] = useState(null);
  const [live, setLive] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { track, pontosinteresse } = route.params;
  const rota = JSON.parse(track);
  const pontos = JSON.parse(pontosinteresse);

  //const finalRota = rota.features[0].geometry.coordinates[0][rota.features[0].geometry.coordinates[0].length - 1];

  useEffect((client) => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      client = await Location.watchPositionAsync(
        { timeInterval: 10, accuracy: 6 },
        (loc) => setLive(JSON.parse(JSON.stringify(loc.coords)))
      );
      })();
      
      return async() => {
        await client.remove();
      }
  }, []);

  /*
  Código preparado para detetar Conquista

  if(live != null) {

    if(live.latitude.toFixed(4) == finalRota[1].toFixed(4) && live.longitude.toFixed(4) == finalRota[0].toFixed(4)) {
      navigation.navigate('Conquista')
    }
  }*/ 

  let text = "A carregar o mapa...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 40.6288,
            longitude: -8.6566,
            latitudeDelta: 0.3,
            longitudeDelta: 0.4,
          }}
        >
          {(!live) ? (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              icon={require("../assets/locationicon.png")}
            />
          ) : (
            <Marker
              coordinate={{
                latitude: live.latitude,
                longitude: live.longitude,
              }}
              icon={require("../assets/locationicon.png")}
            />
          )}
          {
            pontos.features.map((element, index) => {
              return (<Marker key={index} coordinate={{longitude:element.geometry.coordinates[0], latitude:element.geometry.coordinates[1]}} icon={require('../assets/pontos.png')} />)
            }
            )
          }
          <Geojson
            geojson={rota}
            strokeColor="#000000"
            fillColor="#000000"
            strokeWidth={4}
          />
        </MapView>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontFamily: "Roboto", fontSize: 16, fontWeight: "bold" }}>
        {text}
      </Text>
    </View>
  );
  
};

export default GetRota;
