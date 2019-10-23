import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Modal,
} from 'react-native';
import WheelPicker from './src/WheelPicker';
import color from './src/color';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentWeigt: 'Select',
      modalVisible: false,
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setCurrentWeigth = this.setCurrentWeigth.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setCurrentWeigth(weigth) {
    this.setState({currentWeigt: weigth});
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.appContainer}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}>
            <View style={styles.container}>
              <WheelPicker
                setModalVisible={this.setModalVisible}
                setCurrentWeigth={this.setCurrentWeigth}
                currentValue={this.state.currentWeigt}
              />
            </View>
          </Modal>

          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <View style={styles.selectContainer}>
              <Text style={styles.textSelect}>Weigth</Text>
              <Text style={styles.textSelectWeight}>
                {this.state.currentWeigt}{' '}
                {!isNaN(this.state.currentWeigt) && 'Kg'} &gt;
              </Text>
            </View>
          </TouchableHighlight>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  selectContainer: {
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopColor: color.darkLigth,
    borderTopWidth: 1,
    borderBottomColor: color.darkLigth,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 30,
  },
  textSelect: {
    fontSize: 20,
    color: color.dark,
  },
  textSelectWeight: {
    fontSize: 16,
    color: color.secundaryDark,
  },
});

export default App;
