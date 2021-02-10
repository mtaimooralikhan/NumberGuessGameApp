import React from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'

import TitleText from './TitleText';

import Colors from '../constants/color'
const Header = props =>{
    return(
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.HeaderIOS, android: styles.HeaderAndriod})}}>
            <TitleText style={styles.headerTitle} >{props.title}</TitleText>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase:{
        width: '100%',
        height: 90,
        paddingTop: 36,
       
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    HeaderIOS:{
        backgroundColor: 'white',
        borderBottomColor:'#ccc',
        borderBottomWidth: 1
        
    },
    HeaderAndriod:{
        backgroundColor: Colors.primary,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0
    },
    headerTitle:{
        color : Platform.OS==='ios' ? Colors.primary: 'white'
    }
 
});

export default Header;