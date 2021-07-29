import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import firebase from '../../config/firebaseConfig'

const ListInvites = ({selected}) => {
    const [name, setName] = useState(null);
    const [imagem, setImagem] = useState(null);

    useEffect(() => {
            firebase
            .firestore()
            .collection("utilizadores")
            .doc(selected)
            .get()
            .then((doc) => {
              setName(doc.data().nome);
              setImagem(doc.data().imagem);
              });
         
    }, [selected])

    return(
        <View
              style={{
                height: 70,
                flexDirection: "row",
                flexWrap: "wrap",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                marginTop:10,
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
                  style={{ fontFamily: "Roboto", fontSize: 16, marginLeft: 20 }}
                >
                  {name}
                </Text>
              </View>
            </View>
    );
}

export default ListInvites
