import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Animated,
} from 'react-native';

const {width} = Dimensions.get('window');
const minWeigth = 1;
const maxWeigth = 100;
const biglegWidth = 3;
const mediumSmallLegWidth = biglegWidth / 2;
const legSpacing = 11;
const legContainerWidth =
  legSpacing * 10 + biglegWidth + mediumSmallLegWidth * 9;
const spaceStart = Math.round(width / 2);
const spaceEnd = spaceStart - legSpacing;

const color = {
  background: '#f3f3f5',
  navegation: '#666',
  dark: '#58585a',
  darkMedium: '#9f9fa1',
  darkLigth: '#d6d6d8',
  primary: '##13a89e',
  white: '#fff',
};

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
              <View style={styles.wheelNumbersContainer}>
                <Text style={styles.wheelNumbers}>{i}</Text>
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

    this.state = {
      scrollX: new Animated.Value(0),
      newValue: 60,
    };
  }

  componentDidMount() {
    this.state.scrollX.addListener(({value}) => {
      if (this.textInputRef) {
        let changeValue = (
          Math.round(value / (legContainerWidth / 10)) / 10 +
          minWeigth
        ).toFixed(1);
        this.textInputRef.setNativeProps({
          text: changeValue,
        });
        this.textInputRef.value = changeValue;
      }
    });

    setTimeout(() => {
      if (this.scrollViewRef) {
        console.log(this.props.currentValue);
        this.scrollViewRef.getNode().scrollTo({
          x: Math.round(
            (legContainerWidth / 10) *
              (this.state.newValue * 10 - minWeigth * 10),
          ),
          y: 0,
          animated: true,
        });
      }
    }, 1);
  }

  componentWillUnmount() {
    this.state.scrollX.removeAllListeners;
  }

  render() {
    return (
      <View style={styles.WheelPickerContainer}>
        <View style={styles.textContainer}>
          <TextInput
            ref={element => (this.textInputRef = element)}
            style={styles.text}
            editable={false}
          />
          <TextInput style={styles.textKg} editable={false}>
            kg
          </TextInput>
        </View>
        <View>
          <Animated.ScrollView
            ref={element => (this.scrollViewRef = element)}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {x: this.state.scrollX},
                  },
                },
              ],
              {useNativeDriver: true},
            )}>
            <Wheel />
          </Animated.ScrollView>
          <Image
            source={require('./img/weight_arrow.png')}
            style={styles.pointer}
          />
        </View>
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
  // WheelPicker Style
  WheelPickerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  text: {
    fontSize: 65,
    color: '#13a89e',
  },
  textKg: {
    fontSize: 20,
    height: 80,
    color: '#13a89e',
  },
  pointer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 23,
  },

  container: {
    flex: 1,
  },
});

export default App;
