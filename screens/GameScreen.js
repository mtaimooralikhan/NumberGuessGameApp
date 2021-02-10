import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation'
 
import NumberContainer  from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-style';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude)=> {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNum = Math.floor(Math.random()*(max-min))+min;
    if(randomNum===exclude){
        return generateRandomBetween(min, max , exclude);
    }
    else{
        return randomNum;
    }

};
const renderListItems = (listLength,itemData) => (
    <View style={styles.listItems}>
        <BodyText>#{listLength- itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {


    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
    
    const initialGuess = generateRandomBetween(1,100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [avaliableDeviceWidth, setAvalaibleDeviceWidth ]= useState(Dimensions.get('window').width);
    const [avaliableDeviceHeight, setAvalaibleDeviceHeight ]= useState(Dimensions.get('window').height);
    
    const {userChoice, onGameOver} = props;



    useEffect( ()=>{
        const updateLayout = () =>{
            setAvalaibleDeviceWidth(Dimensions.get('window').width);
            setAvalaibleDeviceHeight(Dimensions.get('window').height);

        };
        Dimensions.addEventListener('change', updateLayout);
        return() =>{
            Dimensions.removeEventListener('change',updateLayout);
        }
    }

    );

    useEffect(()=>{
        if(currentGuess=== userChoice){
            onGameOver(pastGuesses.length);
        }
    },
    [currentGuess, userChoice, onGameOver ]
    );

    const nextGuessHandler = direction => {
        if((direction==='lower' && currentGuess< props.userChoice)||
        (direction==='greater' && currentGuess> props.userChoice)){
            Alert.alert('Don\'t lie!', 'you know that this is wrong...', [{text:'sorry', style:'cancel' }]);
            return;
        }
        if(direction==='lower'){
            currentHigh.current = currentGuess;
        }
        else{
            currentLow.current = currentGuess+1;
        }
        const nextNumber =  generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(currentRounds => currentRounds+1);    
        setPastGuesses(curPastGuesses=> [nextNumber.toString(),...curPastGuesses]);
    };

    let listContainerStyle= styles.ListContainer;

    if(avaliableDeviceWidth<350){
        listContainerStyle = styles.listContainerBig;
    }

    if(avaliableDeviceHeight <500){
        return(
            <View style= {styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <View style={styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size= {24} color="white"/>
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>    
                <MainButton  onPress={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons name="md-add" size= {24} color="white"/>
                </MainButton>
            </View>
            <View style = {listContainerStyle}>
            {
            /*<ScrollView contentContainerStyle={styles.List}>
                {pastGuesses.map((guess,index )=> renderListItems(guess, pastGuesses.length-index))}
            </ScrollView>*/}
            <FlatList 
            keyExtractor={(item)=>item} 
            data={pastGuesses} 
            renderItem={renderListItems.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.List}

            />
            </View>
        </View>
        );
    }
    return(
   

    <View style= {styles.screen}>
    <Text style={DefaultStyles.title}>Opponent's Guess</Text>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card style= {styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name="md-remove" size= {24} color="white"/>
        </MainButton>
        <MainButton  onPress={nextGuessHandler.bind(this, 'greater')}>
        <Ionicons name="md-add" size= {24} color="white"/>
        </MainButton>
    </Card>
    <View style = {listContainerStyle}>
    {
    /*<ScrollView contentContainerStyle={styles.List}>
        {pastGuesses.map((guess,index )=> renderListItems(guess, pastGuesses.length-index))}
    </ScrollView>*/}
    <FlatList 
    keyExtractor={(item)=>item} 
    data={pastGuesses} 
    renderItem={renderListItems.bind(this, pastGuesses.length)}
    contentContainerStyle={styles.List}

    />
    </View>
    </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding: 10,
        alignItems: 'center'

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20: 5,
        width: 400,
        maxWidth: '90%'
    },
    ListContainer:{
        flex:1,
        width: '60%'
    },
    listContainerBig:{
        flex: 1,
        width: '80%'
    },
    List:{
        flexGrow: 1,
        //alignItems: 'center',
        justifyContent: 'flex-end'
    },

    listItems:{
        borderColor: '#ccc',
        borderWidth:1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    controls:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    }
    
});
export default GameScreen; 