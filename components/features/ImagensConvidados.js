import React, {useState, useEffect} from 'react'
import { View, Text, Image } from 'react-native'
import firebase from '../../config/firebaseConfig'

const ImagensConvidados = ({convidado, numeroConvidados}) => {

    const [imagem, setImagem] = useState(null);

    useEffect(() => {
        firebase.firestore().collection("utilizadores").doc(convidado).get().then((doc)=> {
            setImagem(doc.data().imagem);
        })
        
    }, [])

    return (
        <View style={(numeroConvidados<=3)?{width:15, height:30 }:{width:2, height:30}}>
        <Image source={{uri:imagem}} style={{flex:1, height:30, width:30, borderRadius:60 }}/>
        </View>
    )
}

export default ImagensConvidados
