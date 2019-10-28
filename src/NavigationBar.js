import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import color from './color';

const NavigationBar = props => {
  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity
        onPress={() => {
          props.handleSave(false);
        }}>
        <View>
          <Text style={styles.headerBack}> &lt;</Text>
        </View>
      </TouchableOpacity>
      <View>
        <Text style={styles.header}>WEIGTH</Text>
      </View>
      <TouchableOpacity onPress={() => props.handleSave(true)}>
        <View>
          <Text style={styles.headerSave}>Save</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // NavigationBar Style
  navigationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: color.navegation,
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    fontSize: 20,
    color: color.white,
  },
  headerBack: {
    fontSize: 23,
    color: color.white,
  },
  headerSave: {
    fontSize: 20,
    color: color.white,
  },
});

export default NavigationBar;
