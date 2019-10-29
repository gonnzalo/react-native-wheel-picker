import React, {Component} from 'react';
import {StyleSheet, View, Image, TextInput, Animated} from 'react-native';
import {minWeigth, maxWeigth, changeValue, scrollToCurrentValue} from './utils';
import color from './color';
import NavigationBar from './NavigationBar';
import Wheel from './Wheel';
import PropTypes from 'prop-types';

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

WheelPicker.propTypes = {
  setModalVisible: PropTypes.func.isRequired,
  setCurrentWeigth: PropTypes.func.isRequired,
  currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default WheelPicker;
