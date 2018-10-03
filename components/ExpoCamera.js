import React from 'react';
import { View, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

class ExpoCamera extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.front,
        uri: '',
        key: 'ea833cbfc1134749af6f6eccebad2eef',
        uriBase: 'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Categories%2CDescription%2CColor&details=&language=en',
        tags: [],
        caption: ''
    };


    componentDidUpdate(prevState, prevProps) {

    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        setTimeout(
            this.snap,
            2000
        );
    }

    handleFetchData = () => {

        const data = Base64Binary.decode(this.state.uri);



        fetch(this.state.uriBase, {
            method: 'POST',
            body: data,
            headers:{
                'Content-Type': 'application/octet-stream',  //multipart/form-data - application/octet-stream
                'Ocp-Apim-Subscription-Key': this.state.key
            }
        }).then(res => res.json())
            .then(response => {
                // this.setState({
                //     tags: response.description.tags,
                //     caption: response.description.captions[0].text
                // });
                console.log(response);
                //console.log('Tags:', JSON.stringify(response.description.tags));
                //console.log('Caption:', JSON.stringify(response.description.captions[0].text));
            })
            .catch(error => console.log('Error:', error));
    };

    onPictureSaved = ({base64}) => {
        this.setState({uri: base64}, () => {
            this.handleFetchData();
        });
    };


    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({base64: true}).then((data) => this.onPictureSaved(data));
        }
    };

    render() {
        // console.log(this.state.uri);

        return (
            <View style={{ flex: 1 }}>
                <Camera
                    ref={ref => { this.camera = ref; }}
                    style={{ flex: 1 }} type={this.state.type}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                    </View>

                    DIT IS PUUR VOOR TEST OM TE CHECKEN OF IE WEL DE FOTO MAAKT
                    {
                        this.state.uri && (
                            <Image
                                style={{
                                    flex: 1,
                                }}
                                source={{ uri: this.state.uri}}
                            />
                        )
                    }

                </Camera>
            </View>
        )
    }
}


ExpoCamera.navigationOptions = {
    header: null
};


var Base64Binary = {
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    /* will return a  Uint8Array type */
    decodeArrayBuffer: function(input) {
        var bytes = (input.length/4) * 3;
        var ab = new ArrayBuffer(bytes);
        this.decode(input, ab);

        return ab;
    },

    removePaddingChars: function(input){
        var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
        if(lkey == 64){
            return input.substring(0,input.length - 1);
        }
        return input;
    },

    decode: function (input, arrayBuffer) {
        //get last chars to see if are valid
        input = this.removePaddingChars(input);
        input = this.removePaddingChars(input);

        var bytes = parseInt((input.length / 4) * 3, 10);

        var uarray;
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        var j = 0;

        if (arrayBuffer)
            uarray = new Uint8Array(arrayBuffer);
        else
            uarray = new Uint8Array(bytes);

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        for (i=0; i<bytes; i+=3) {
            //get the 3 octects in 4 ascii chars
            enc1 = this._keyStr.indexOf(input.charAt(j++));
            enc2 = this._keyStr.indexOf(input.charAt(j++));
            enc3 = this._keyStr.indexOf(input.charAt(j++));
            enc4 = this._keyStr.indexOf(input.charAt(j++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            uarray[i] = chr1;
            if (enc3 != 64) uarray[i+1] = chr2;
            if (enc4 != 64) uarray[i+2] = chr3;
        }

        return uarray;
    }
}

export default ExpoCamera;