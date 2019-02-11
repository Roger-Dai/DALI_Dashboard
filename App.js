/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, ActivityIndicator} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<Props> {
  
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://mappy.dali.dartmouth.edu/members.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  _renderItem = ({item}) => (
    <View style={{backgroundColor: 'white'}}>
        {/* <Image
          style={{width: 50, height: 50}}
          source={{uri: 'http://mappy.dali.dartmouth.edu/images/ricky.jpg'}}
        /> */}
        <Text style={{fontSize: 20, marginTop: 20, marginLeft: 10}}>
            {item.name}
        </Text>
        <Text style={{fontSize: 15, color: 'grey', marginTop: 5, marginLeft: 10}} >
            {item.message}
        </Text>
    </View>
  );

  _renderSeparator = () => {
    return (
        <View
        style={{
            height: 1,
            width: "100%",
            backgroundColor: "#CED0CE",
        }}
        />
    )
  };

  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.name}, {item.message}</Text>}
          keyExtractor={({id}, index) => index}
          onEndReachedThreshold={0.1}
          ItemSeparatorComponent={this._renderSeparator}
          style={{marginBottom: 25}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
