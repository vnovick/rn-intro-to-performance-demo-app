import React, {memo} from 'react';
import {Button, StyleSheet, View, ViewStyle} from 'react-native';
import {useRenderCount} from '../utils/perf';

export const NavigationButtonsFooter = memo(
  ({onPress, style}: {onPress: () => void; style?: ViewStyle}) => {
    useRenderCount('NavigationButtonsFooter');
    return (
      <View style={[style, styles.footer]}>
        <Button title="Next screen" onPress={onPress} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  footer: {},
});
