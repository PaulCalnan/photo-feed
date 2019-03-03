import React from 'react';
import { Flatlist, Stylesheet, Text, View, Image} from 'react-native';

class feed extends React.Component{

  constructor(props){
    super(props);
  }

  render()
  {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       <Text>Feed</Text>
      </View>
    )
  }

}

export default feed;
