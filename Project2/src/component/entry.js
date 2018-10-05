// A Test class
// Need to delete...


'use strict'
import React, {Component} from "react"
import {Image, Text, View, TouchableOpacity} from "react-native"

export default class DonateEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }



    render() {
        return(
            <View>
                {console.log(this.props.src)}
                <Image source={{uri:this.props.src}} />
                style={{width: 40, height: 40}} />
                <View>
                    <TouchableOpacity >
                        <Text>Donate a new photo to this directory</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text>...</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}