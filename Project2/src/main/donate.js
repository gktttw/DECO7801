// A component to handler camera and upload events

import React, {Component} from "react"
import {Text, View, TextInput, StyleSheet,  AsyncStorage, TouchableOpacity, ActivityIndicator} from "react-native"
import ImagePicker from "react-native-image-picker"
import MyHeader from "../component/header"
import upload from "../function/upload"
import AlbumHeader from "../component/albumHeader"

export default class DonateView extends Component {

    constructor(props) {
        super(props)
        this.state = {loading: false, uid:'', name:'', names:[], entry: this.props.navigation.state.params.entry}
    }

    // A select photo method 
    // Requires ImagePicker lib
    selectPhoto = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {

                let file = response.uri
                
                this.setState({
                    loading:true
                })
                console.log(response.uri)
                // Auto upload
                this.setState({file: file, name: response.fileName})
                
            }
        })
    }

    _upload = () => {
        if(upload(this.state.file,this.state.name, this.state.entry)) {
            this.props.navigation.navigate('Root')
            alert("Sueecssfully uploaded!")
        } else {
            alert("Server error! Please try again!")
        }
    }

    _handleEntry = () => {
        if(this.props.navigation.state.params.entry != null) {
            return(
                <View style={styles.dynamicContent}>
        
                    <Text style={styles.album}>You are in album: {this.state.entry}</Text>
                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('History')}
                    style={styles.textButtonContainer}>
                        <Text style={styles.textButton}>change album</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity onPress={this.selectPhoto} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>select a photo</Text>
                    </TouchableOpacity> 

                    <View style={styles.inputContent}>
                        <TextInput placeholder="Write some descrptions for this mole"></TextInput>
                        <View style={styles.underline}></View>
                    </View>
                </View>                
            )
            
        } else {
            return(
                <View style={styles.dynamicContent}>
                    <View style={styles.inputContent}>
                        <TextInput placeholder="Input the name of the directory"
                            onChangeText={(entry)=>this.setState({entry})}
                            value={this.state.entry}
                            autoCapitalize={"none"}
                            autoCorrect={false}>
                        </TextInput>
                        <View style={styles.underline}></View>

                        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('History')}
                        style={styles.textButtonContainer}>
                            <Text style={styles.textButton}>change album</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity onPress={this.selectPhoto} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>select a photo</Text>
                        </TouchableOpacity> 

                        <TextInput placeholder="Write some descrptions for this donation"
                            onChangeText={(descrption)=>this.setState({descrption})}
                            value={this.state.descrption}>
                        </TextInput>
                        <View style={styles.underline}></View>                    
                    </View>
                </View>
            )          
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <AlbumHeader name={this.state.entry} 
                back={() => this.props.navigation.navigate('Root')}
                add={null}/>
                <View style={styles.content}>   
                    {this._handleEntry()}

                    <TouchableOpacity onPress={this._upload} style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>submit</Text>
                    </TouchableOpacity>

                </View>
            </View>
                       
        )
    }
}

const options = {
    title: 'Choose a Photo', 
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Take a Photo', 
    chooseFromLibraryButtonTitle: 'Library', 
    cropping: true,
    includeBase64: true,
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high', 
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2, 
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: { 
        skipBackup: true, 
        path: 'images'
    }
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        backgroundColor: "white"     
    },

    content: {
        flex: 1, 
        alignItems: "center",
        justifyContent : "center",
        padding: 30,
    },

    dynamicContent: {  
        justifyContent : "center", 
        alignSelf: "stretch",
    },

    album: {
        marginBottom: 20,

    },


    underline: { 
        height: 1,
        backgroundColor:"#5898E3", 
        marginTop: 10, 
        marginBottom: 10,
    },

    buttonContainer: {
        alignSelf: "stretch",
        padding: 20,
        marginBottom: 10, 
        borderRadius: 5, 
        backgroundColor: "#2a85ed", 
        borderWidth: 2,
    },

    buttonText: { 
        textAlign: "center", 
        fontSize: 15, 
        fontWeight: "bold", 
        color: "white",
    },

    textButtonContainer: { 
        margin:10,
        marginLeft: 0,
    },

    textButton: {
        color: "#5898E3", 
        textDecorationLine:'underline', 
    },


})
