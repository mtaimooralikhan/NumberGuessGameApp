import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View , SafeAreaView} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

let customFonts ={
  'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
  'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
  'Inter-SemiBoldItalic': 'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12'
};

const fetchFonts=()=> Font.loadAsync(customFonts);


export default function App() {
  
  const [userNumber, setUserNumber] = useState();
  const [guessRounds , setGuessRounds ] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return <AppLoading 
    startAsync={fetchFonts} 
    onFinish={()=>setDataLoaded(true)}
    onError = {(error)=> console.log(error)}
    />
  }
  
  const configNewGameHandler = () =>{
    setGuessRounds(0);
    setUserNumber(null);
  }
  
  const startGameHandler = (selectedNumber) =>{
    setUserNumber(selectedNumber);
    
  };

  const gameOverHandler = numOfRounds =>{
    setGuessRounds(numOfRounds);
  };

  



  let content = <StartGameScreen onStartGame={startGameHandler}/>  
 
  if (userNumber && guessRounds <= 0){
    content = <GameScreen userChoice= {userNumber} onGameOver={gameOverHandler}/>
  }
  else if(guessRounds>0){
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart = {configNewGameHandler}/>
  }
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number"/> 
      {content}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  screen: {
   flex:1
  }
});
