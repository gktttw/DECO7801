import React, {Component} from "react"
import {Text, View, StyleSheet,  AsyncStorage, TouchableOpacity, ActivityIndicator} from "react-native"

export default upload = async (file, name, entry) => {
    var uid = await AsyncStorage.getItem('uid')
    var data = new FormData()
    if(entry===null) {
        return(alert("Please input a name for new directory!"))
    }
    if(!file || !name) {
        return(alert("Please choose a image!"))
    }
    data.append('entry', entry)
    data.append('uid', uid)
    data.append("img", {
        uri: file,
        name: name,
        type: 'multipart/form-data'
    })

    fetch("https://deco3801-coolcoolcool.uqcloud.net/API/donate.php", {
        method: 'POST', 
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: data
    })
    .then((response) => response.json())
    .then((responseJson) => {
    console.log(responseJson)
        return(responseJson.upload)
    })
}