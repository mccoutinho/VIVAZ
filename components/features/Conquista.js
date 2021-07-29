import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native'

const Conquista = () => {
    return (
        <View style={{flex:1, backgroundColor:"#404040"}}>
            <View style={{alignItems:"center", marginTop:100, marginBottom:50}}>
                <Image source={require('../../assets/MEDALHA_1A.png')} />
            </View>
            <Text style={{fontSize:50, fontFamily:"Roboto", fontWeight:"bold", color:"#fcfcfc", marginLeft:24}}>Uma Atividade Completa</Text>
            <Text style={{fontSize:24, fontFamily:"Roboto", color:"#fcfcfc", marginLeft:24, marginTop:24}}>Parabéns!</Text>
            <Text style={{fontSize:24, fontFamily:"Roboto", color:"#fcfcfc", marginLeft:24}}>Completaste uma atividade!</Text>
            <TouchableOpacity onPress={() => NavigationContainer.navigate('CardListComponent')}>
            <View style={{width:"85%", height:60, backgroundColor:"#ff7033", alignItems:"center", justifyContent:"center", borderRadius:12, alignSelf:"center", marginTop:24}}>
                <Text style={{fontFamily:"Roboto", fontSize:24, fontWeight:"bold", color:"#fcfcfc"}}>Finalizar</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default Conquista
