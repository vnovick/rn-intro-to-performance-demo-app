import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './HomeScreen';
import {PitfallsScreen} from './PitfallsScreen';
import {SafeAreaView, StatusBar} from 'react-native';
import './utils/messageQueueMonitoring';
import {ReRenders} from './ReRenders';

const Stack = createNativeStackNavigator();

export default function App() {
  const screenStyle = {
    flex: 1,
  };
  return (
    <SafeAreaView style={screenStyle}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#4d089a'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ReRenders" component={ReRenders} />
          <Stack.Screen name="Pitfalls" component={PitfallsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
