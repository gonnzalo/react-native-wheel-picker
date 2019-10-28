import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TextInput, Animated} from 'react-native';
import {
  minWeigth,
  maxWeigth,
  biglegWidth,
  mediumSmallLegWidth,
  legSpacing,
  legContainerWidth,
  spaceStart,
  spaceEnd,
  data,
  changeValue,
  scrollToCurrentValue,
} from './utils';
import color from './color';
import NavigationBar from './NavigationBar';

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

class WheelPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: new Animated.Value(0),
      newValue: 60,
    };

    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    // scroll event
    this.state.scrollX.addListener(({value}) => {
      let newValue = changeValue(value);
      if (this.textInputRef) {
        this.textInputRef.setNativeProps({
          text: newValue,
        });
        this.textInputRef.value = newValue;
      }
      if (this.wheelRef) {
        this.makeCircle(newValue);
      }
    });

    // scroll to starting point (default or current)
    setTimeout(() => {
      if (this.scrollViewRef) {
        this.scrollViewRef.getNode().scrollTo({
          x: scrollToCurrentValue(this.props.currentValue),
          y: 0,
          animated: true,
        });
      }
    }, 1);
  }

  componentWillUnmount() {
    this.state.scrollX.removeAllListeners;
  }

  // Make the semicirle shape using the leg ref... ? toDo: edges
  makeCircle(val) {
    let tempMargin = 0;
    for (let i = -300; i <= 300; i += 10) {
      if (Number(val) > minWeigth + 2.9 && Number(val) < maxWeigth - 2) {
        if (i <= -200) tempMargin = tempMargin + 2.8;
        if (i >= -200 && i < -150) tempMargin = tempMargin + 2.5;
        if (i >= -150 && i < -100) tempMargin = tempMargin + 2;
        if (i >= -100 && i < -50) tempMargin = tempMargin + 1.5;
        if (i >= -50 && i < -10) tempMargin = tempMargin + 0.5;
        if (i > 20 && i <= 60) tempMargin = tempMargin - 0.5;
        if (i > 60 && i <= 110) tempMargin = tempMargin - 1.5;
        if (i > 110 && i <= 160) tempMargin = tempMargin - 2;
        if (i > 160 && i <= 210) tempMargin = tempMargin - 2.5;
        if (i >= 210) tempMargin = tempMargin - 2.8;
        this.wheelRef.legRef[(Number(val) + i / 100).toFixed(1)].setNativeProps(
          {
            marginBottom: tempMargin,
          },
        );
      }
    }
  }

  handleSave(val) {
    if (val) this.props.setCurrentWeigth(this.textInputRef.value);
    this.props.setModalVisible(false);
  }

  render() {
    return (
      <View style={styles.WheelPickerContainer}>
        <NavigationBar
          setModalVisible={this.props.setModalVisible}
          handleSave={this.handleSave}
        />
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
            <Wheel ref={element => (this.wheelRef = element)} />
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
  // WheelPicker Style
  WheelPickerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 65,
    padding: 0,
    margin: 0,
    color: color.primary,
  },
  textKg: {
    fontSize: 20,
    height: 85,
    textAlignVertical: 'bottom',
    color: color.primary,
  },
  pointer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 30,
  },
});

export default WheelPicker;
