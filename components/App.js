import React from "react";
import {View, Button } from 'react-native';
import styles from '../style';

const App = (props) => (
    <View style={styles.container} className="test">
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





export default App;