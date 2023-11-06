/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {actBusy, spamBridge} from './utils/perf';
import {NavigationProp} from '@react-navigation/native';
import {NavigationButtonsFooter} from './components/NavigationButtonsFooter';

export function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={actBusy}>
        <View style={styles.button}>
          <Text>Spam mqt_js</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={spamBridge}>
        <View style={styles.button}>
          <Text>Spam bridge</Text>
        </View>
      </TouchableOpacity>
      <NavigationButtonsFooter
        onPress={() => {
          navigation.navigate('ReRenders');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {},
});

//Exercise: Find out why extra re-renderings happen
