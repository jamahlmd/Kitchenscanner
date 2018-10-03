import React from "react";
import { StyleSheet, View, Button } from 'react-native';

const App = (props) => (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <Button
                title="Instellingen"
                onPress={() => props.navigation.navigate('PasswordCheck')}
                color="#4C4CFF"
            />
            <Button
                title="Handleiding"
                onPress={() => props.navigation.navigate('Handheld')}
                color="#808080"
            />
        </View>
        <View style={styles.bodyContainer}>
            <View>
                <Button
                    title="Scan"
                    onPress={() => props.navigation.navigate('ExpoCamera')}
                    color='rgb(255,192,76)'
                />
            </View>
        </View>
    </View>
);



App.navigationOptions = {
    header: null
};



const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: '#9999FF'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bodyContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default App;