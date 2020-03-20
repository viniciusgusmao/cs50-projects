// @refresh reset
import React,{ useState, useEffect } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { vibrate, convertSecondsToTime } from './utils';

const Count = ({initialDate, play, stop, reset, updateInitialDate, resetControl}) => {
  const [time, setTime] = useState(initialDate);

  useEffect(() => {
    let interval;
    setTime(initialDate);

    let date = new Date(initialDate);

    if(play)
      interval = setInterval(() => {
        setTime(date.setSeconds(date.getSeconds() - 1));
      },1000)    

    if(reset){
      clearInterval(interval);
      setTime(date.setSeconds(date.getSeconds()));
    }

    if(stop){
      clearInterval(interval);
      updateInitialDate(time);
      setTime(time);
    }

    return () => clearInterval(interval)
    
  },[initialDate, play, stop, reset, updateInitialDate, resetControl])

  const stopAndVibrateOrContinue = (time) => {
    let convertedTime = convertSecondsToTime(time); 
    if (convertedTime == "00:00"){
      resetControl()
      vibrate();
    }
    return convertedTime;
  }

  return (
    <Text style={{
      fontSize: 40,
      marginVertical: 30
    }}>{stopAndVibrateOrContinue(time)}</Text>
  );
}

Count.propTypes = {
  initialDate: PropTypes.number.isRequired,
  play: PropTypes.bool.isRequired,
  stop: PropTypes.bool.isRequired,
  reset: PropTypes.bool.isRequired,
  updateInitialDate: PropTypes.func.isRequired,
  resetControl: PropTypes.func.isRequired
}

export default Count;


