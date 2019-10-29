import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import color from './color';
import {
  biglegWidth,
  mediumSmallLegWidth,
  legSpacing,
  legContainerWidth,
  spaceStart,
  spaceEnd,
  data,
} from './utils';

// Make the wheel with ref in legs
class Wheel extends Component {
  constructor(props) {
    super(props);

    this.legRef = [];
  }
  render() {
    return (
      <View style={styles.wheelContainer}>
        <View style={styles.startSpacing} />
        {data.map(i => {
          return (
            <View key={i} style={styles.legsContainer}>
              <View style={styles.wheelNumbersContainer}>
                <Text style={styles.wheelNumbers}>{i}</Text>
              </View>
              <View
                style={styles.bigLeg}
                ref={element => (this.legRef[i.toFixed(1)] = element)}
              />
              <View
                style={styles.smallLeg}
                ref={element => (this.legRef[i + 0.1] = element)}
              />
              <View
                style={styles.smallLeg}
                ref={element => (this.legRef[i + 0.2] = element)}
              />
              <View
                style={styles.smallLeg}
                ref={element => (this.legRef[i + 0.3] = element)}
              />
              <View
                style={styles.smallLeg}
                ref={element => (this.legRef[i + 0.4] = element)}
              />
              <View
                style={styles.mediumLeg}
                ref={element => (this.legRef[i + 0.5] = element)}
              />
              <View
                style={styles.smallLeg}
                ref={element => (this.legRef[i + 0.6] = element)}
              />
              <View
                style={styles.smallLeg}
                ref={element => (this.legRef[i + 0.7] = element)}
              />
              <View
                style={styles.smallLeg}
                ref={element => (this.legRef[i + 0.8] = element)}
              />
              <View
                style={styles.smallLeg}
                ref={element => (this.legRef[i + 0.9] = element)}
              />
            </View>
          );
        })}
        <View style={styles.endSpacing} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Wheel style
  wheelContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 180,
  },
  legsContainer: {
    width: legContainerWidth,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 28,
  },
  wheelNumbersContainer: {
    position: 'absolute',
    top: 13,
    left: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelNumbers: {
    position: 'absolute',
    textAlign: 'center',
    color: color.dark,
    width: 40,
    fontSize: 20,
  },
  bigLeg: {
    width: biglegWidth,
    backgroundColor: color.dark,
    height: 85,
    marginRight: legSpacing,
  },
  mediumLeg: {
    width: mediumSmallLegWidth,
    backgroundColor: color.darkMedium,
    height: 70,
    marginRight: legSpacing,
  },
  smallLeg: {
    width: mediumSmallLegWidth,
    backgroundColor: color.darkLigth,
    height: 55,
    marginRight: legSpacing,
  },
  startSpacing: {
    width: spaceStart - mediumSmallLegWidth,
  },
  endSpacing: {
    width: spaceEnd,
  },
});

export default Wheel;
