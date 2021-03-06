// A warpped component of directory's header

'use strict'
import React, {Component} from "react"
import {Text, Image, View, StyleSheet, Button, TouchableOpacity} from "react-native"

export default class AlbumHeader extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.add === null){
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.props.back} >
                        <Text style={styles.menu}> BACK </Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>{this.props.name}</Text>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.props.back} >
                        <Text style={styles.menu}> BACK </Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>{this.props.name}</Text>
                    <TouchableOpacity onPress={this.props.add} >
                        <Image style={styles.logo} source={require('../img/plus.png')}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: 10,
            paddingTop: 30,
            paddingBottom: 10,
            // paddingTop: 30,
            // paddingRight: 10,
            backgroundColor: "#2a85ed"
        },

        menu: {
            fontSize: 20,
            color: 'white',
            // marginLeft: 10,
        },

        logo: {
            width: 30, 
            height: 30
        }
    }
) 
