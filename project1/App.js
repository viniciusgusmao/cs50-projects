import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Count from "./Count";

const CONSTANTS = {
  POMODORO_TIME: 25,
  SHORTBREAK_TIME: 5
}

export default function App() {
  const [maxTime, setMaxTime] = useState(CONSTANTS.POMODORO_TIME)
  const [play, setPlay] = useState(false)
  const [stop, setStop] = useState(false)
  const [reset, setReset] = useState(false)
  const [initialDate, setInitialDate] = useState(new Date(1900,1,1,1,CONSTANTS.POMODORO_TIME,0).setSeconds(0))

  const switchTypeTimer = (type) => {
    switch (type) {
      case "pomodoro":
        setMaxTime(CONSTANTS.POMODORO_TIME);
        setInitialDate(new Date(1900,1,1,1,CONSTANTS.POMODORO_TIME,0).setSeconds(0))
        break;
      case "shortbreak":
        setMaxTime(CONSTANTS.SHORTBREAK_TIME);
        setInitialDate(new Date(1900,1,1,1,CONSTANTS.SHORTBREAK_TIME,0).setSeconds(0))
        break;
      default:
        break;
    }
  }

  const startControl = () => {
    setPlay(true);
    setReset(false);
    setStop(false);
  }

  const stopControl = () => {
    setPlay(false);
    setReset(false);
    setStop(true);
  }

  const updateInitialDate = (date) => {
    setInitialDate(date);
  }

  const resetControl = () => {
    setPlay(false);
    setReset(true);
    setStop(false);
    setInitialDate(new Date(1900,1,1,1,maxTime,0).setSeconds(0));
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsDown}>
        <TouchableOpacity style={{ backgroundColor: 'orange' }} onPress={() => switchTypeTimer('pomodoro')} >
          <Text style={styles.textButton}>Pomodoro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'gray'}} onPress={() => switchTypeTimer('shortbreak')}  >
          <Text style={styles.textButton}>Short break</Text>
        </TouchableOpacity>
      </View>
      <Count initialDate={initialDate} play={play} stop={stop} reset={reset} updateInitialDate={updateInitialDate} resetControl={resetControl} />
      <View style={styles.buttonsDown}>
        <TouchableOpacity style={{ backgroundColor: 'green' }} onPress={startControl} >
          <Text style={styles.textButton}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'red'}} onPress={stopControl} >
          <Text style={styles.textButton}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: 'blue' }} onPress={resetControl} >
          <Text style={styles.textButton}>Reset</Text>          
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textButton: {
    color: 'white',
    padding: 10,
    fontSize: 20
  },  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsDown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,    
  }
});
