import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Pressable
} from "react-native";

const Onboarding = ({navigation}) => {
  const [step, setStep] = useState(1);

  if (step == 1) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fcfcfc" }}>
        <View
          style={{
            height: 44,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            marginLeft: 24,
            marginRight: 24,
            marginTop: 40,
          }}
        >
          <TouchableOpacity onPress={() => setStep(5)}>
            <Text style={{ fontFamily: "Roboto", fontSize: 16 }}>Saltar</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            height: 350,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={require("../assets/onboarding/SVG.png")} />
        </View>
        <View style={{ flex: 1, marginTop: 24 }}>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: 24,
            }}
          >
            Bem-vindo à
          </Text>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 40,
              marginLeft: 24,
              fontWeight: "bold",
            }}
          >
            VIVAZ
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            flex: 0.1,
            justifyContent: "space-between",
            alignSelf: "center",
            marginTop: 24,
            width: "12%",
          }}
        >
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
        <TouchableOpacity onPress={() => setStep(step+1)}>
          <View
            style={{
              width: 360,
              height: 64,
              backgroundColor: "#ff7033",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              elevation:8
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: "#f7f7fc",
              }}
            >
              Seguinte
            </Text>
          </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (step == 2) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fcfcfc" }}>
        <View
          style={{
            flex:1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 40,
            marginHorizontal:24,           
          }}
        >
          <TouchableOpacity onPress={() => setStep(step-1)}>
            <Image source={require("../assets/onboarding/back.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStep(5)}>
            <Text style={{ fontFamily: "Roboto", fontSize: 16 }}>Saltar</Text>
          </TouchableOpacity>
          </View>
        <View
          style={{
           width:"100%",
           height:300,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image source={require("../assets/onboarding/1.png")} />
        </View>
        <View style={{ flex: 1, marginTop: 24 }}>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: 24,
            }}
          >
            Para quê?
          </Text>
          <Text style={{ fontFamily: "Roboto", fontSize: 16, marginHorizontal: 24, marginTop:5 }}>
            Faça ciclismo e conquiste obstáculos, de forma desafiante, divertida
            e VIVAZ!
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            flex: 0.1,
            justifyContent: "space-between",
            alignSelf: "center",
            marginTop: 24,
            width: "12%",
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
        <TouchableOpacity onPress={() => setStep(step+1)}>
          <View
            style={{
              width: 360,
              height: 64,
              backgroundColor: "#ff7033",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              elevation:8
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: "#f7f7fc",
              }}
            >
              Seguinte
            </Text>
          </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (step == 3) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fcfcfc" }}>
        <View
          style={{
            flex:1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 40,
            marginHorizontal:24,           
          }}
        >
          <TouchableOpacity onPress={() => setStep(step-1)} hitSlop={{right:30, left:30, top:30, bottom:30}}>
            <Image source={require("../assets/onboarding/back.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStep(5)}>
            <Text style={{ fontFamily: "Roboto", fontSize: 16 }}>Saltar</Text>
          </TouchableOpacity>
          </View>
        <View
          style={{
           width:"100%",
           height:300,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={require("../assets/onboarding/2.png")} />
        </View>
        <View style={{ flex: 1, marginTop: 24 }}>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: 24,
            }}
          >
            Por onde?
          </Text>
          <Text style={{ fontFamily: "Roboto", fontSize: 16, marginHorizontal: 24, marginTop:5 }}>
          Desafie os seus amigos na aplicação a percorrer rotas escolhidas a dedo por nós!
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            flex: 0.1,
            justifyContent: "space-between",
            alignSelf: "center",
            marginTop: 24,
            width: "12%",
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
        <TouchableOpacity onPress={() => setStep(step+1)}>
          <View
            style={{
              width: 360,
              height: 64,
              backgroundColor: "#ff7033",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              elevation:8
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: "#f7f7fc",
              }}
            >
              Seguinte
            </Text>
          </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (step == 4) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fcfcfc" }}>
        <View
          style={{
            flex:1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 40,
            marginHorizontal:24,           
          }}
        >
          <TouchableOpacity onPress={() => setStep(step-1)} hitSlop={{right:30, left:30, top:30, bottom:30}}>
            <Image source={require("../assets/onboarding/back.png")} />
          </TouchableOpacity>
          </View>
        <View
          style={{
           width:"100%",
           height:300,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={require("../assets/onboarding/3.png")} />
        </View>
        <View style={{ flex: 1, marginTop: 24 }}>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: 24,
            }}
          >
            Como?
          </Text>
          <Text style={{ fontFamily: "Roboto", fontSize: 16, marginHorizontal: 24, marginTop:5 }}>
          Crie planos de forma simples, convide os seus amigos e agende novas aventuras!
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            flex: 0.1,
            justifyContent: "space-between",
            alignSelf: "center",
            marginTop: 24,
            width: "12%",
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 60,
              backgroundColor: "#c4c4c4",
            }}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
        <TouchableOpacity onPress={() => setStep(step+1)}>
          <View
            style={{
              width: 360,
              height: 64,
              backgroundColor: "#ff7033",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              elevation:8
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: "#f7f7fc",
              }}
            >
              Seguinte
            </Text>
          </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if(step == 5) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fcfcfc" }}>
        <View
          style={{
            flex:1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 40,
            marginHorizontal:24,
                       
          }}
        >
          <TouchableOpacity onPress={() => setStep(step-1)} hitSlop={{right:30, left:30, top:30, bottom:30}}>
            <Image source={require("../assets/onboarding/back.png")} />
          </TouchableOpacity>
          </View>
        <View
          style={{
           width:"100%",
           flex:2.7,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={require("../assets/onboarding/4.png")} />
        </View>
        <View style={{ flex: 0.8, marginTop: 24 }}>
          <Text
            style={{
              fontFamily: "Roboto",
              fontSize: 40,
              fontWeight: "bold",
              marginLeft: 24,
            }}
          >
          Vamos?
          </Text>
          <Text style={{ fontFamily: "Roboto", fontSize: 16, marginHorizontal: 24, marginTop:5 }}>
          “As pessoas não fazem viagens, as viagens é que fazem as pessoas”. Sinta-se VIVAZ!
          </Text>
        </View>
        
        <View
          style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
        >
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <View
            style={{
              width: 360,
              height: 64,
              backgroundColor: "#ff7033",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              elevation:8
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: "Roboto",
                color: "#f7f7fc",
              }}
            >
              Criar conta
            </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View style={{marginTop:10, flexDirection: "row"}}>
            <Text style={{fontFamily:"Roboto", fontSize:16}}>Já tenho uma conta. </Text> 
            <Text style={{fontFamily:"Roboto", textDecorationLine:"underline", fontSize:16}}>Entrar</Text>
          </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

export default Onboarding;
