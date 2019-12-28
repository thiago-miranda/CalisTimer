import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Time = props => {
  const minutes = parseInt(props.time / 60, 10);
  const seconds = props.time % 60;
  const format = num => {
    if (num < 10) {
      return '0' + num;
    }
    return num;
  };
  return (
    <Text>
      {format(minutes)}:{format(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({});

export default Time;
