import React from 'react';
import {Button,TextInput,View} from 'react-native';

class Scanner extends React.Component {
    state = {
        photoURL: 'https://hollandwinkel-nl-dehollandwinkel.netdna-ssl.com/media/catalog/product/cache/1/image/380x/1beeb78083d745754856f87600e894a9/m/o/mokhop2.jpg',
        key: 'ea833cbfc1134749af6f6eccebad2eef',
        uriBase: 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories%2CDescription%2CColor&details=&language=en',
        tags: [],
        caption: ''
    };

    //Zoekt de tags van de foto die in this.state.photoURL staat. Verander this.state.photoURL
    //om een andere foto door de api te halen
    handleFetchData = () => {

        const data = {
            "url": this.state.photoURL
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
                this.setState({
                    tags: response.description.tags,
                    caption: response.description.captions[0].text
                });
                console.log('Tags:', JSON.stringify(response.description.tags));
                console.log('Caption:', JSON.stringify(response.description.captions[0].text));
            })
            .catch(error => console.log('Error:', error));
    };

    render() {
        return (
           <View>
               <TextInput
                   style={{height: 40, width: 200,textAlign: 'center'}}
                   placeholder="Voer foto URL in"
                   onChangeText={(text) => this.setState({photoURL:text})}
                   value={this.state.photoURL}
               />

               <Button
                    title="Fetch Data"
                    onPress={this.handleFetchData}
               />
           </View>

        )
    }
}


export default Scanner;