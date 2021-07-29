import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import firebase from '../../config/firebaseConfig'

const ListFriends = ({friend}) => {
    const [name, setName] = useState(null);
    const [imagem, setImagem] = useState(null);

    useEffect(() => {
            firebase
            .firestore()
            .collection("utilizadores")
            .doc(friend)
            .get()
            .then((doc) => {
              if(doc.exists) {
              setName(doc.data().nome);
              setImagem(doc.data().imagem);
              } else {
                console.log("Não tem amigos! :(")
              }
              });
            
         
    }, [friend])

    return(
        <View
              style={{
                height: 70,
                flexDirection: "row",
                flexWrap: "wrap",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                marginTop:80,
              }}
            >
              <View
                style={{
                  flex: 0.8,
                  marginLeft: 20,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 44, width: 44, borderRadius: 40 }}
                  source={{ uri: imagem }}
                />
                <Text
                  style={{ fontFamily: "Roboto", fontSize: 16, marginLeft: 10 }}
                >
                  {name}
                </Text>
              </View>
            </View>
    );
}

export default ListFriends