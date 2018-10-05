// The main entry of the app
// Constructed by routers

'use strict'
import React, {Component} from "react"
import {View, SafeAreaView, Button, AsyncStorage} from "react-native"
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, 
    createDrawerNavigator, createMaterialTopTabNavigator, DrawerItems} from 'react-navigation'
import Login from "./src/login/login"
import SignUp from "./src/login/signup"
import MainView from "./src/main/main"
import AuthLoadingScreen from "./src/login/authloading"
import DonateView from "./src/main/donate"
import HistoryView from "./src/main/history"
import HelpView from "./src/main/help"
import SupportView from "./src/main/support"
import FPassword from "./src/login/fpassword"
import MyAlbum from "./src/component/myalbum"
import './src/component/localStorage'


export default class App extends Component {


    render() {
        return (
            <AppNavigator />
        )
    }
}

// Login and ForgotPassword navigator
const LoginNavigator = createStackNavigator (
    {
        Login: Login,
        FPassword: FPassword,
    },
    {
        initialRouteName: 'Login',
        navigationOptions: {
            header: null,
        }
    }
)
 
// History and single directory navigator
const HistoryNavigator = createStackNavigator(
    {
        Root: HistoryView,
        Single: MyAlbum,
        OnDonate: DonateView
    },
    {
        initialRouteName: 'Root',
        navigationOptions: {
            header: null,  
        }
    }
)

// A drawer navigation to move in main views
const MainNavigator = createDrawerNavigator (
    {
        Home: {
            screen: MainView
        },
        History: {
            screen: HistoryNavigator
        },
        Help: {
            screen: HelpView
        },
        Support: {
            screen: SupportView
        },
        
    },
    {
        contentComponent:(props) => (
            <View style={{flex:1}}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems {...props} />
                    <Button title="Logout" onPress={() => {
                        AsyncStorage.removeItem('uToken')
                        props.navigation.navigate('AuthLoading')} }/> 
                </SafeAreaView>
            </View>
        ),
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
    }
)

// A navigation for determine if the user has logged in
const AppNavigator = createSwitchNavigator (
{
        Auth: LoginNavigator,
        Main: MainNavigator,
        AuthLoading: AuthLoadingScreen,
    },
    {
        initialRouteName: 'AuthLoading',
    }
)

