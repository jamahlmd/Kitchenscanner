import React from 'react';
import {Animated, Dimensions, ScrollView, Image, CameraRoll, StyleSheet, Text, View } from 'react-native';

const {width ,height} = Dimensions.get('window');

export default class App extends React.Component {

    state = {
        photos: [],
        animatedValue: new Animated.Value(0)
    };

    animate = () => {
        Animated.timing(                  // Animate over time
            this.state.animatedValue,            // The animated value to drive
            {
                toValue: 100,                   // Animate to opacity: 1 (opaque)
                duration: 2500,              // Make it take a while
            }
        ).start();
    };

    fetchPhotos = async () => {
        try {
            const data = await CameraRoll.getPhotos({first: 10, assetType: 'All'});
            this.setState({photos: data.edges});

        } catch (e) {

        }
    };
    render() {
        return (
            <View style={styles.container}>
                <Text onPress={this.animate} style={{ fontSize: 25}}>Fetch</Text>
                {/*<ScrollView>*/}
                {/*<View style={{flexDirection: 'row', flexWrap:'wrap'}}>*/}
                {/*{*/}
                {/*this.state.photos.map( (image,index) => (*/}
                {/*<Image*/}
                {/*key={index}*/}
                {/*style={{width: width /2, height: height /2}}*/}
                {/*source={{ uri:image.node.image.uri}}*/}
                {/*/>*/}
                {/*))*/}
                {/*}*/}
                {/*</View>*/}
                {/*</ScrollView>*/}
                <Animated.View style={{width: 100, height: 100, backgroundColor: 'red', marginTop: this.state.animatedValue}}>
                    Test
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 14,
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
});
