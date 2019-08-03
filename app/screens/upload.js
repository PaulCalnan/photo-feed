import React from 'react';
import { TextInput, ActivityIndicator, TouchableOpacity, Flatlist, StyleSheet, Text, View, Image} from 'react-native';
import { f, auth, database, storage } from '../../config/config.js';
import { Permissions, ImagePicker } from 'expo';

class upload extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        loggedin: false,
        imageId: this.uniqueId(),
        imageSelected: false,
        uploading: false,
        caption: ''
      }
    }

    _checkPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({camera:status});

      const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({cameraRoll:statusRoll});
    }

    s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    }

uniqueId = () => {
  return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
  this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
}

findNewImage = async () => {
  this._checkPermissions();

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'Images',
    allowsEditing: true,
    quality: 1
  });

  console.log(result);

  if(!result.cancelled){

    console.log('upload image');
    this.setState({
      imageSelected: true,
      imageId: this.uniqueId(),
      uri: result.uri
    })

  }else{
    console.log('cancel');
    this.setState({
      imageSelected: false
    });
  }
}

uploadImage = async (uri) => {

  var that = this;
  var userid = f.auth().currentUser.uid;
  var imageId = this.state.imageId;

  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(uri)[1];
  this.setState({currentFileType: ext});

  const response = await fetch(uri);
  const blob = await response.blob();
  var FilePath = imageId+'.'+that.state.currentFileType;

  const ref = storage.ref('user/'+userid+'/img').child(FilePath);

  var snapshot = ref.put(blob).on('state_changed', snapshot => {
    console.log('Progress', snapshot.bytestransferred, snapshot.totalBytes);
  });


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
        <View style={{flex: 1}}>
        { this.state.loggedin == true ? (
          <View style={{flex:1}}>
            { this.state.imageSelected == true ? (
              <View style={{flex:1}}>
                <View style={{height: 70,
                              paddingTop: 30,
                              backgroundColor: 'white',
                              borderColor: 'lightgrey',
                              borderBottomWidth: 0.5,
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}>
                  <Text>Upload</Text>
                </View>
                <View style={{padding:5}}>
                  <Text style={{marginTop: 5}}>Caption:</Text>
                  <TextInput
                    editable={true}
                    placeholder={'Enter your caption...'}
                    maxLength={150}
                    multiline={true}
                    numberOfLine={4}
                    onChangeText={(text) => this.setState({caption:text})}
                    style={{marginVertical: 10,
                            height: 100,
                            padding: 5,
                            borderColor: 'grey',
                            borderWidth: 1,
                            borderRadius: 3,
                            backgroundColor: 'white',
                            color: 'black'}}/>
                </View>
              </View>
            ) : (

            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize:28, paddingBottom:15}}>Upload</Text>
              <TouchableOpacity
              onPress={() => this.findNewImage()}
              style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'blue', borderRadius: 5}}>
              <Text style={{color: 'white'}}>Select Photo</Text>
              </TouchableOpacity>
            </View>
            )}
          </View>
        ) : (
          //Not logged in
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>You are not logged in</Text>
            <Text>Please login to upload a photo</Text>
          </View>
        )}
        </View>
      )
    }

}

export default upload;
