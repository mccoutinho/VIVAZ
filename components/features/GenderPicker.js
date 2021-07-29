import React, {useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const GenderPicker = ({setSexo}) => {
    const [selected, setSelected] = useState(null);

  return (
    <View style={{ width: 350, alignSelf: "center", marginTop:-30 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={{fontFamily:"Roboto", fontSize:16}}>Feminino</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (selected == null) {
              setSelected(1);
              setSexo("Feminino");
              
            }
            if(selected == 1) {
                setSelected(null);
            }
          }}
        >
          {selected == 1 ? (
            <View
              style={{
                backgroundColor: "f7f7fc",
            width: 30,
            height: 30,
            borderRadius: 50,
            borderStyle: "solid",
            borderColor: "#ff7033",
            borderWidth: 7,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: "#d9dbe9",
                width: 30,
                height: 30,
                borderRadius: 50,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={{fontFamily:"Roboto", fontSize:16}}>Masculino</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (selected == null) {
              setSelected(2);
              setSexo("Masculino");
            }
            if(selected == 2) {
                setSelected(null);
            }
          }}
        >
          {selected == 2 ? (
            <View
              style={{
                backgroundColor: "f7f7fc",
            width: 30,
            height: 30,
            borderRadius: 50,
            borderStyle: "solid",
            borderColor: "#ff7033",
            borderWidth: 7,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: "#d9dbe9",
                width: 30,
                height: 30,
                borderRadius: 50,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={{fontFamily:"Roboto", fontSize:16}}>Prefiro não dizer</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (selected == null) {
              setSelected(3);
              setSexo("Prefiro não dizer");
            }
            if(selected == 3) {
                setSelected(null);
            }
          }}
        >
          {selected == 3 ? (
            <View
              style={{
                backgroundColor: "f7f7fc",
            width: 30,
            height: 30,
            borderRadius: 50,
            borderStyle: "solid",
            borderColor: "#ff7033",
            borderWidth: 7,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: "#d9dbe9",
                width: 30,
                height: 30,
                borderRadius: 50,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )}

export default GenderPicker
