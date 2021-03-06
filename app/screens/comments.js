import React from 'react';
import { Flatlist, StyleSheet, Text, View, Image} from 'react-native';
import { f, auth, database, storage } from '../../config/config.js';

class upload extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        loggedin: false
      }
    }

        componentDidMount = () => {
          var that = this;
          f.auth().onAuthStateChanged(function(user){
            if(user){
              //Logged in
              that.setState({
                loggedin: true
              });
            }else{
              //Not logged in
              that.setState({
                loggedin: false
              });
            }
          });
        }


    render()
    {
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        { this.state.loggedin == true ? (
          //Are logged in
          <Text>Comments</Text>
        ) : (
          //Not logged in
          <View>
            <Text>You are not logged in</Text>
            <Text>Please login to post a comment</Text>
          </View>
        )}
        </View>
      )
    }

}

export default upload;
