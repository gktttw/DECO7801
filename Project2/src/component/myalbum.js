// A utility to render each photo in the same view
// Naivigated by the history view

import React, {Component} from "react"
import {Text, Image, View, StyleSheet, TextInput, ScrollView, AsyncStorage, TouchableOpacity} from "react-native"
import MyHeader from "../component/header"
import upload from "../function/upload"
import AlbumHeader from "./albumHeader";

export default class MyAlbum extends Component {

    constructor(props) {
        super(props)
        this.state = {data:[]}
    }

    componentWillMount() {
        this.setState({key: this.props.navigation.state.params.key, value: this.props.navigation.state.params.value})
    }

    render() {
        // Get all data passed by navigation
        name = this.state.value[0]
        imgs = this.state.value[1]
        var i
        var images = []
        for(i=0;i<imgs.length;i++) {
            images.push(
                <View key={i} style={styles.frame}>
                    <Image key={i} source={{uri:imgs[i]}}
                    style={{width: 160, height: 160}}/>
                    <Text>This is a discription</Text>
                </View>               
            )
        }
        return(
            
            <View style={{flex:1}}>
                <AlbumHeader name={name} 
                back={() => this.props.navigation.navigate('Root')}
                add={() => this.props.navigation.navigate('OnDonate', {entry: name})}/>
                <ScrollView style={{flex:1}}>
                    {images}
                </ScrollView>
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        flexDirection: 'row',
    }
})