import React, {useState, useEffect} from 'react'
import { View, Text, Image } from 'react-native'
import firebase from '../../config/firebaseConfig'

const ParticipantsList = ({convidado}) => {

    const [nome, setNome] = useState(null);
    const [imagem, setImagem] = useState(null);

    useEffect(() => {
        firebase.firestore().collection("utilizadores").doc(convidado).get().then((doc)=> {
            setImagem(doc.data().imagem);
            setNome(doc.data().nome);
        })
        
    }, [])

    return (
        <View style={{justifyContent:"center", alignItems:"center", marginRight:16, marginBottom:20}}>
        <Image source={{uri:imagem}} style={{height:100, width:100, borderRadius:80 }}/>
        <Text style={{fontSize:18, fontFamily:"Roboto", fontWeight:"bold"}}>{nome}</Text>
        </View>
    )
}

export default ParticipantsList