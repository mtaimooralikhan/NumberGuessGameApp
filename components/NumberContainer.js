import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Colors from '../constants/color';

const NumberContainer = props => {
    return(
        <View style={styles.constainer}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};
const styles  = StyleSheet.create({
    constainer : {
        borderWidth: 2,
        borderColor: Colors.accent,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        color: Colors.accent,
        fontSize: 22


    }
});


export default NumberContainer;