import React from 'react';
import App from './components/App';
import PasswordCheck from './components/PasswordCheck';
import Handheld from './components/Handheld';
import Scanner from './components/Scanner';
import Settings from './components/Settings';
import ExpoCamera from './components/ExpoCamera';

import { createStackNavigator } from 'react-navigation';


export default nav = createStackNavigator({
    App: { screen :App },
    PasswordCheck: { screen: PasswordCheck },
    Handheld: { screen: Handheld},
    Scanner: { screen: Scanner},
    Settings: { screen: Settings},
    ExpoCamera: {screen: ExpoCamera}
});
