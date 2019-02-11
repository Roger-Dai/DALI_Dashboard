import React, {Component} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator, Image} from 'react-native';
import {Container, Header, Content, Text, List, ListItem, Thumbnail, Left, Body, Right, Button, Item, Icon, Input } from 'native-base';
import {createStackNavigator, createAppContainer} from 'react-navigation';

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
    <ListItem avatar>
      <Left>
        <Thumbnail source={{ uri: `http://mappy.dali.dartmouth.edu/${item.iconUrl}` }} />
      </Left>
      <Body>
        <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
        <Text>{item.message}</Text>
        <Text>I am on during term(s) {item.terms_on}</Text>
        <Text>Projects: {item.project}</Text>
      </Body>
      <Right>
        <Button transparent>
          <Text>View</Text>
        </Button>
      </Right>
    </ListItem>
  );


  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <FlatList
          data={this.state.dataSource}
          renderItem={this._renderItem}
          keyExtractor={item => item.iconUrl}
          onEndReachedThreshold={0.1}
          style={{marginBottom: 2}}
        />
      </Container>
    );
  }
}