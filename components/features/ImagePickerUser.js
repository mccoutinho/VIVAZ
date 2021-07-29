import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../config/firebaseConfig";

const ImagePickerUser = () => {
  const [image, setImage] = useState(null);

  const user = firebase.auth().currentUser;
  const uid = user.uid;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const ref = firebase.storage().ref().child(`users/${uid}`);
      return ref.put(blob);
    }
  };

  return (
    <TouchableOpacity style={styles.appButtonContainer} onPress={pickImage}>
      <Text style={styles.appButtonText}>Clica para escolher uma foto</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    width: 360,
    height: 80,
    backgroundColor: "#8c8ca1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop:12,
  },
  appButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#f7f7fc",
  },
})

export default ImagePickerUser;
