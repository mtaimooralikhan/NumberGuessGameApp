import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer  from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Colors from '../constants/color';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfimed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width/4);

  

    useEffect(
        ()=>{
            const updateLayout = () =>{
            setButtonWidth(Dimensions.get('window').width/4);
            };
        
            Dimensions.addEventListener('change',updateLayout);
            return () =>{
                Dimensions.removeEventListener('change',updateLayout);
            };
        }
    );

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, '')); //replace all that is not 0-9 with empty string
    };

    const resetInputHandler = () =>{
        setEnteredValue('');
        setConfimed(false);
    }

    const confirmInputHandler = () =>{
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber)|| chosenNumber<=0 || chosenNumber>99){
            Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99.', 
            [{text:'okay', style:'destructive', onPress:resetInputHandler}]);
            return;
        }
        setConfimed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
        
    }
    let confirmedOutput;

    if(confirmed){
       confirmedOutput = (
       <Card style= {styles.summaryContainer}>
        <BodyText>You Selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton 
         onPress={() => props.onStartGame(selectedNumber)}
         >START GAME</MainButton>
       </Card>
       );
    }
    
    return(
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>        
                <TouchableWithoutFeedback onPress={
                    ()=> {Keyboard.dismiss();}
                }>
                    <View style= {styles.screen}>
                        <TitleText style={styles.title}>Start a New Game</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input 
                            style={styles.input} 
                            blurOnSubmit 
                            autoCapitalize="none" 
                            autoCorrect={false} 
                            keyboardType="number-pad" 
                            maxLength={2}
                            onChangeText = {numberInputHandler}
                            value= {enteredValue}
                            
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{width: buttonWidth}}><Button title="Reset"  onPress={resetInputHandler} color= {Colors.accent}/></View>
                                <View style={{width: buttonWidth}}><Button title="Confirm" onPress={confirmInputHandler}  color={Colors.primary}/></View>
                            </View>

                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>    
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize:20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer:{
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
       
    },
    buttonContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    //button:{
        //width: 100
      //  width: Dimensions.get('window').width/4
    //},
    input:{
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
       marginTop: 20,
       alignItems: 'center'
    }

});

export default StartGameScreen;