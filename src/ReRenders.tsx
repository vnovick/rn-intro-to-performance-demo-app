/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {useRenderCount} from './utils/perf';
import {NavigationProp} from '@react-navigation/native';
import {NavigationButtonsFooter} from './components/NavigationButtonsFooter';

export function ReRenders({
  navigation,
}: {
  navigation: NavigationProp<any>;
}): JSX.Element {
  const isDarkMode = false;
  const [count, setCount] = useState(0);

  const onPress = useCallback(() => {
    navigation.navigate('Pitfalls');
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{flex: 1}}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <RerenderedCmp count={count} />
        </View>
        <Button
          title="Press count"
          onPress={() => {
            setCount(count + 1);
          }}
        />
      </ScrollView>
      <NavigationButtonsFooter onPress={onPress} />
    </View>
  );
}

const RerenderedCmp = ({count}: {count: number}) => {
  useRenderCount('RerenderedComp');
  return <Text>{count}</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//Exercise: Find out why extra re-renderings happen
