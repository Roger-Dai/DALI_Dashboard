import React, {Component} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator, Image} from 'react-native';
import {Container, Header, Content, Text, List, ListItem, Thumbnail, Left, Body, Right, Button, Item, Icon, Input } from 'native-base';

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
    // <View style={{backgroundColor: 'white'}}>
    //     <Image
    //       style={{width: 50, height: 50}}
    //       source={{uri: `http://mappy.dali.dartmouth.edu/${item.iconUrl}`}}
    //     />
    //     <Text style={{fontSize: 20, marginTop: 20, marginLeft: 10}}>
    //         {item.name}
    //     </Text>
    //     <Text style={{fontSize: 15, color: 'grey', marginTop: 5, marginLeft: 10}} >
    //         {item.message}
    //     </Text>
    // </View>
    <ListItem avatar>
      <Left>
        <Thumbnail source={{ uri: `http://mappy.dali.dartmouth.edu/${item.iconUrl}` }} />
      </Left>
      <Body>
        <Text>{item.name}</Text>
        <Text>{item.message}</Text>
      </Body>
      <Right>
        <Button transparent>
          <Text>View</Text>
        </Button>
      </Right>
    </ListItem>
    // <ListItem
    //   roundAvatar
    //   title={`${item.name}`}
    //   subtitle={item.message}
    //   avatar={{ uri: `http://mappy.dali.dartmouth.edu/${item.iconUrl}` }}
    // />
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

const styles = StyleSheet.create({
});
