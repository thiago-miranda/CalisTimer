import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Select = props => {
  const [current, setCurrent] = useState(props.current);

  const handlerPress = opt => () => {
    setCurrent(opt);
  };
  const options = props.options;

  return (
    <View>
      <Text style={styleSelect.label}>{props.label}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        {options.map(opt => {
          let id = '';
          let label = '';
          if (typeof opt === 'string') {
            id = opt;
            label = opt;
          } else if (typeof opt === 'object') {
            id = opt.id;
            label = opt.label;
          }
          return (
            <TouchableOpacity
              key={id}
              style={[
                styleSelect.opt,
                id === current ? styleSelect.optSelected : null,
              ]}
              onPress={handlerPress(id)}>
              <Text style={styleSelect.optLabel}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styleSelect = StyleSheet.create({
  label: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
  opt: {
    padding: 8,
  },
  optSelected: {
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  optLabel: {
    color: 'black',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 24,
    opacity: 1,
  },
});

export default Select;
