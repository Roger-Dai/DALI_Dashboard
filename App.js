import React, {Component} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator, Image} from 'react-native';
import {Container, Header, Content, Text, List, ListItem, Thumbnail, Left, Body, Right, Button, Item, Icon, Input } from 'native-base';

export default class App extends Component<Props> {
  
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      data: []
    }
    this.arrayholder = [];
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
        this.arrayholder = responseJson
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

  searchFilterFunction = text => {
    console.log(this.arrayholder);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
    });
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
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input 
              placeholder="Search by name" 
              onChangeText={text => this.searchFilterFunction(text)}
            />
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