import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native';
import DefaultStyles from '../constants/default-style';
import BodyText from '../components/BodyText';
import  Colors  from '../constants/color';
import MainButton from '../components/MainButton';
const GameOverScreen = props =>{
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    
    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    
    return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    let imageStyle = styles.imageContainer;
    if(availableDeviceHeight<500){
       imageStyle = styles.imageContainerSmall; 
    }

    return(
        
        <ScrollView>
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>The Game is Over!</Text>
            <View style={imageStyle}>
            <Image source={
                //for local image 
                require('../assets/success.png') 
                //for web image
                //{uri: 'https://image.shutterstock.com/image-photo/view-ama-dablam-on-way-260nw-699633193.jpg'}
            }
                style={styles.image} 
                resizeMode="cover"/>
            </View>
            <View style={styles.resultContainer}>
                <BodyText style= {styles.resultText}>Your Phone needed: 
                <Text style= {styles.highlight} >{props.roundsNumber}</Text> 
                Rounds to guess the number:  
                <Text style= {styles.highlight}>{props.userNumber}</Text>
                </BodyText>
            </View>
            
            <MainButton 
             onPress={props.onRestart}
             >NEW GAME</MainButton>
        </View>
        </ScrollView>
        
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer:{
      
        width: Dimensions.get('window').width*0.7,
        height: Dimensions.get('window').width*0.7,
        borderRadius: Dimensions.get('window').width*0.7/2,
        borderWidth: 3, 
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height/30
    },
    imageContainerSmall:{
        width: Dimensions.get('window').width*0.4,
        height: Dimensions.get('window').width*0.4,
        borderRadius: Dimensions.get('window').width*0.4/2,
        borderWidth: 3, 
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height/30
    },
    image: {
        width: '100%',
        height: '100%', 
       
    },
    highlight:{
       color : Colors.primary,
       fontFamily: 'open-sans-bold',

    }, 
    resultText:{
        textAlign: 'center',
        fontSize: Dimensions.get('window').height <400 ? 16: 20
    }, 
    resultContainer :{
        marginHorizontal:30,
        marginVertical: Dimensions.get('window').height/60
    }
   
});
export default GameOverScreen;