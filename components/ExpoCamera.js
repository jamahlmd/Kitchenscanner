import React from 'react';
import { View, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

class ExpoCamera extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.front,
        uri:'',
        photoURL: 'https://hollandwinkel-nl-dehollandwinkel.netdna-ssl.com/media/catalog/product/cache/1/image/380x/1beeb78083d745754856f87600e894a9/m/o/mokhop2.jpg',
        key: 'ea833cbfc1134749af6f6eccebad2eef',
        uriBase: 'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Categories%2CDescription%2CColor&details=&language=en',
        tags: [],
        caption: ''
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        setTimeout(
            this.snap,
            5000
        );
    }

    //Zoekt de tags van de foto die in this.state.photoURL staat. Verander this.state.photoURL
    //om een andere foto door de api te halen
    handleFetchData = () => {

        const data = {
            "url": this.state.uri
        };

        fetch(this.state.uriBase, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
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

    onPictureSaved = ({uri}) => {
        this.setState({uri}, () => {
            this.handleFetchData();
        });
    };


    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync().then((data) => this.onPictureSaved(data));
        }
    };

    render() {
        console.log(this.state.uri);

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
                    <Image
                        style={{
                            flex: 1,
                        }}
                        source={{ uri: this.state.uri }}
                    />
                </Camera>
            </View>
        )
    }
}


ExpoCamera.navigationOptions = {
    header: null
};

export default ExpoCamera;