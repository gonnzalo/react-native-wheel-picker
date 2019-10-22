import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';

const {width} = Dimensions.get('window');
const minWeigth = 1;
const maxWeigth = 100;
const biglegWidth = 2;
const mediumSmallLegWidth = 1;
const legSpacing = biglegWidth + mediumSmallLegWidth * 9;
const spaceStart = Math.floor(width / 2);
const spaceEnd = spaceStart - legSpacing;

// make the weigth number data
function makeData(minValue, maxValue) {
  let arrayData = [];
  for (let i = minValue; i <= maxValue; i++) {
    arrayData.push(i);
  }
  return arrayData;
}

const data = makeData(minWeigth, maxWeigth);

class Wheel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wheelContainer}>
        <View style={styles.startSpacing} />
        {data.map(i => {
          return (
            <View key={i} style={styles.legsContainer}>
              <View style={styles.wheelnumbersContainer}>
                <Text style={styles.Wheelnumbers}>{i}</Text>
              </View>
              <View style={styles.bigLeg} />
              <View style={styles.smallLeg} />
              <View style={styles.smallLeg} />
              <View style={styles.smallLeg} />
              <View style={styles.smallLeg} />
              <View style={styles.mediumLeg} />
              <View style={styles.smallLeg} />
              <View style={styles.smallLeg} />
              <View style={styles.smallLeg} />
              <View style={styles.smallLeg} />
            </View>
          );
        })}
        <View style={styles.endSpacing} />
      </View>
    );
  }
}

class WheelPicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.WheelPickerContainer}>
        <ScrollView horizontal>
          <Wheel />
        </ScrollView>
      </View>
    );
  }
}

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <WheelPicker />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  // Wheel style
  wheelContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  legsContainer: {
    width: legSpacing * 11,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  wheelnumbersContainer: {
    position: 'absolute',
    top: -20,
    left: -14,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelNumber: {
    color: '#555',
    fontSize: 20,
  },
  bigLeg: {
    width: biglegWidth,
    backgroundColor: '#555',
    height: 85,
    marginRight: legSpacing,
  },
  mediumLeg: {
    width: mediumSmallLegWidth,
    backgroundColor: '#888',
    height: 70,
    marginRight: legSpacing,
  },
  smallLeg: {
    width: mediumSmallLegWidth,
    backgroundColor: '#999',
    height: 55,
    marginRight: legSpacing,
  },
  startSpacing: {
    width: spaceStart,
  },
  endSpacing: {
    width: spaceEnd,
  },
  // WheelPicker Style
  WheelPickerContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  container: {
    flex: 1,
  },
});

export default App;
