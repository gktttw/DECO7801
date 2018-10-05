// The view is to show all directories of users have created and has 
// An api to create a new directory

import React, {Component} from "react"
import {ScrollView, Dimensions, Text, Image, View, StyleSheet, TextInput, TouchableOpacity} from "react-native"
import MyHeader from "../component/header"

export default class HistoryView extends Component {
    constructor(props) {
        super(props)
        this.state = {history:[], names:[], length:0}
    }

    // After rendering get all info has been cached
    componentWillMount() {
        this._retrieveHistory()
    }

    _retrieveHistory = async() => {
        storage.load({
            key: 'history'
        })
        .then((ret) => {
            this.setState((previousState => {
                // Reconstruct the data structure in order to iterate and render
                dirc = []
                for(i=0;i<ret.length;i++){
                    dirc.push({
                        key: i,
                        value: ret[i]
                    })
                }
                // Save the data to the storage
                storage.save({
                    key:'data',
                    data: dirc
                })
                return({history: dirc, length: ret.length})
            }))

        })
        .catch((error) => console.log(error))
    }

    render() {
        myWidth = Dimensions.get('window').width/2-20
        var entries = []
        const history = this.state.history
        // Iterate all directories
        history.map((value, key) => {
            key = value.key,
            value = value.value
            entries.push(
                <View key={key} style={styles.album}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Single', {key: key, value:value})}>
                        <Image source={{uri:value[1][0]}}
                        style={{width: myWidth, height: myWidth}} />
                    </TouchableOpacity>
                    
                    <Text style={{width: myWidth, height: 20}}>{value[0]}</Text>

                    <View style={styles.albumButton}>
                        <TouchableOpacity style={{width: (myWidth)/3*2, backgroundColor: "#3d70b2"}} onPress={() => this.props.navigation.navigate('OnDonate', {entry:value[0]})}>
                            <Text style={{textAlign: 'center'}}>add photos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.textButton}>
                            <Text style={{textAlign: 'center'}}>...</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )
        })
        
        return(  
            <View style={{flex:1}}>
                <MyHeader drawerOpen={() => this.props.navigation.openDrawer()}/>
                <ScrollView style={{flex:1}}>
                    <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around'}}>
                        {entries}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('OnDonate', {entry: null})} 
                            style={{width: myWidth, height: myWidth, backgroundColor: 'tomato', justifyContent: "center", alignItems: "center"}}>
                            <Text style={{color: 'white'}}>Create a new album</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
 
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: "#5898E3", 
    },

    album: {
        margin: 10
    },

    albumButton: {
        flex:1, 
        flexDirection: 'row',
        height: 20,

    },

    textButton: {
        marginLeft: 10,
    }

})


