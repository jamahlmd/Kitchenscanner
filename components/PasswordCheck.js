import React, {Component} from 'react';
import {TextInput, View, Button, StyleSheet} from 'react-native';

class PasswordCheck extends Component{
    state = {
        text: '',
        code: '1234'
    };
    static navigationOptions = {
        header: null
    };

    checkPassword = () =>
        this.state.text === this.state.code ? this.props.navigation.navigate('Settings') : alert('Fout probeer opniew');

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Handleiding"
                        onPress={() =>this.props.navigation.navigate('Handheld')}
                        color="#808080"
                    />
                </View>
                <View style={styles.bodyContainer}>

                    <TextInput
                        keyboardType="numeric"
                        style={{height: 40, width: 200,textAlign: 'center'}}
                        placeholder="Voer pincode in"
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        secureTextEntry={true}
                    />

                </View>
                <View style={{flex: 2,paddingHorizontal: 50, justifyContent: 'space-around', marginBottom: 150}}>
                    <Button
                        title="Bevestig"
                        onPress={this.checkPassword}
                        style={{borderRadius: 15}}
                    />
                    <Button
                        title="Ga terug"
                        onPress={() =>this.props.navigation.navigate('App')}
                    />
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: '#9999FF'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 20
},
    bodyContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default PasswordCheck;