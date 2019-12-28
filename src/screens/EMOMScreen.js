import React, {useState, useEffect} from 'react';

import {
  Keyboard,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';

import Title from '../components/Title';
import Select from '../components/Select';
import Time from '../components/Time';

const EMOMScreen = props => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  const [alerts, setAlerts] = useState(0);
  const [countdown, setCountdown] = useState(1);
  const [timer, setTimer] = useState('2');

  const [isRunning, setIsRunning] = useState(false);
  const [countdownValue, setCountdownValue] = useState(5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const kbShow = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true);
    });
    const kbHide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false);
    });
    return () => {
      kbHide.remove();
      kbShow.remove();
    };
  }, []);

  /*const play = () => {
    setIsRunning(true);
    if (countdown === 1) {
      const countdownTimer = setInterval(() => {
        setCountdownValue(countdownValue - 1);
        if (countdownValue === 0) {
          clearInterval(countdownTimer);
        }
      }, 1000);
    }
  };*/
  /*
  useEffect(() => {
    if (countdown === 1) {
      if (countdownValue === 0) {
        clearInterval(timer);
      } else {
        const id = setInterval(() => {
          setCountdownValue(prevCount => prevCount - 1);
          setTimer(id);
        }, 1000);
        setTimer(id);
      }
      return () => clearInterval(timer);
    }
  }, [isRunning]);*/

  /*useEffect(() => {
    if (countdown === 1) {
      return;
    }
    const interval = setInterval(_ => {
      setCountdownValue(prevCount => prevCount - 1);
    }, 1000);
    return _ => clearInterval(interval);
  }, [countdown]);
*/

  useEffect(() => {
    const count1 = () => {
      setCount(count => count + 1);
    };
    if (countdown === 1 && countdownValue !== 0) {
      const interval = setInterval(_ => {
        setCountdownValue(prevCount => prevCount - 1);
      }, 1000);
      return _ => {
        clearInterval(interval);
        if (countdownValue === 0) {
          const countTimer = setInterval(count1, 1000);
        }
      };
    } else if (count !== +timer * 60) {
      const countTimer = setInterval(count1, 1000);
      return _ => {
        clearInterval(countTimer);
      };
    } else {
      return;
    }
  }, [count, countdown, countdownValue, isRunning, timer]);

  const play = () => {
    setIsRunning(true);
  };
  /*
  const play = () => {
    setIsRunning(true);
    if (countdown === 1) {
      setCountdownTimer(
        setInterval(() => {
          setCountdownValue(prevCount => prevCount - 1);
          if (countdownValue === 0) {
            clearInterval(countdownTimer);
          }
        }, 1000),
      );
    }
  };
*/
  if (isRunning) {
    const percMinute = (count % 60) / 60;
    const perceTime = count / 60 / parseInt(timer, 10);
    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <Text>Countdown: {countdownValue}</Text>
        <Text>Count: {count}</Text>
        <Time time={count} />
        <Text>Minutes: {percMinute}</Text>
        <Text>Time: {perceTime}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <ScrollView style={styles.container}>
        <Title
          style={{paddingTop: keyboardIsVisible ? 20 : 200}}
          title="EMOM"
          subTitle="Every Minute On the Minute"
        />
        <Image
          style={{alignSelf: 'center', width: 50, height: 50, marginBottom: 17}}
          source={require('../../assets/settings.png')}
        />
        <Select
          label="Alertas:"
          current={alerts}
          options={[
            {
              id: 0,
              label: 'desligado',
            },
            {
              id: 15,
              label: '15s',
            },
            {
              id: 30,
              label: '30s',
            },
            {
              id: 45,
              label: '45s',
            },
          ]}
          onSelect={opt => setAlerts(opt)}
        />

        <Select
          label="Contagem regressiva:"
          current={countdown}
          options={[
            {
              id: 1,
              label: 'Sim',
            },
            {
              id: 0,
              label: 'Não',
            },
          ]}
          onSelect={opt => setCountdown(opt)}
        />
        <Text style={styles.label}>Quantos Minutos?</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={timer}
          onChangeText={text => {
            setTimer(text);
          }}
        />
        <Text style={styles.label}>minutos</Text>
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => {
            play();
          }}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../../assets/play-btn.png')}
          />
        </TouchableOpacity>
        <Text>Testar</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EMOMScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6304A',
  },
  label: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
  },
  input: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 48,
  },
});

export default EMOMScreen;
