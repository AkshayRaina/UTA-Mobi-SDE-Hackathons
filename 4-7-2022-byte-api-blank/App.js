import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  TextInput,
  Alert,
} from 'react-native';

import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function App() {

  const [message, onChangeMessage] = React.useState("Enter a 20 character long message");
  const [redvalue, onChangeRed] = React.useState(0);
  const [greenvalue, onChangeGreen] = React.useState(0);
  const [bluevalue, onChangeBlue] = React.useState(0);

  function postPostData() {
    React.useEffect(() => {
      post_data(message, redvalue, greenvalue, bluevalue)
    })
  }

  return (

    <SafeAreaView>

      <View style={styles.container}>

        <Text style={styles.label}> Message </Text>
        <TextInput 
          style={styles.input_message} 
          onChangeText={onChangeMessage}
          value={message}

          clearTextOnFocus="true" 
          maxLength={20}
        />

        <Text style={styles.label}> Red Value </Text>
        <TextInput 
          style={styles.input_value} 
          onChangeText={onChangeRed}
          value={redvalue}

          clearTextOnFocus="true" 
          keyboardType="numeric"
          maxLength={3}
        />
        
        <Text style={styles.label}> Green Value </Text>
        <TextInput 
          style={styles.input_value} 
          onChangeText={onChangeGreen}
          value={greenvalue}

          clearTextOnFocus="true" 
          keyboardType="numeric"
          maxLength={3}
        />

        <Text style={styles.label}> Blue Value </Text>
        <TextInput 
          style={styles.input_value} 
          onChangeText={onChangeBlue}
          value={bluevalue}

          clearTextOnFocus="true" 
          keyboardType="numeric"
          maxLength={3}
        />

      </View>

      <Button 
          onPress={ () => post_data(message, redvalue, greenvalue, bluevalue)}
          title="POST"
      />

    </SafeAreaView>

  );
}

function post_data(message, redval, greenval, blueval) {

  var redvalue = parseInt(redval);
  var greenvalue = parseInt(greenval);
  var bluevalue = parseInt(blueval);

  if((redvalue >= 0 && redvalue <= 255) && (greenvalue >= 0 && greenvalue <= 255) && (bluevalue >= 0 && bluevalue <= 255)){
    Alert.alert("Your values have been posted");
  }else{
    Alert.alert("Your RGB values are too high");
    return console.log("no post");
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                                              CODE HERE                                  //
  /////////////////////////////////////////////////////////////////////////////////////////////

  const data_obj = {
      "message": message,
      "redvalue": redvalue ,
      "greenvalue": greenvalue ,
      "bluevalue": bluevalue
  }

  const json_object = { 
    method : "POST",
    headers: {
      "Content-Type": 'application/json',    
    },
    body: JSON.stringify(data_obj),
  };

  const host = 'https://byte-4-7-2022-api.uta-mobi.repl.co/'
  const endpoint = 'message/change'
  const url = host + endpoint

  fetch(url, json_object)
    .then(res => res.json())
    .then(data =>{
      console.log(data)
    })
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  label: {
    fontFamily: "Arial",
    fontSize: "20px",
    fontWeight: "bold",
  },
  input_message: {
    fontSize: 16,
    padding: 10,
    height: 35,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 50,
    textAlign: "center"
  },
  input_value: {
    fontSize: 16,
    padding: 10,
    height: 35,
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
    textAlign: "center",
    alignSelf: "",
  }
});


