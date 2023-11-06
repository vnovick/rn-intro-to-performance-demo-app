import React, {
  useState,
  //   useCallback,
  //   useMemo,
  //   PureComponent,
  useEffect,
  useRef,
  memo,
  useMemo,
} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleProp,
  ButtonProps,
  ViewProps,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useRenderCount} from './utils/perf';

const expensiveCalculation = num => {
  // Simulate an expensive calculation
  console.log('Performing expensive calculation...');
  return num * num;
};

const ExpensiveCalculationComponent = ({num}: any) => {
  useRenderCount('#5 - ExpensiveCalculationComponent - lack of useMemo usage');
  //Add useMemo to improve performance
  const result = useMemo(() => expensiveCalculation(num), [num]);
  return <Text>Result: {result}</Text>;
};

const Item = ({item}: any) => {
  useRenderCount('Item');
  return (
    <View style={styles.item}>
      <Text>{item}</Text>
    </View>
  );
};

const ItemMemoizedButObj = memo(({...item}: any) => {
  useRenderCount(`Item ${JSON.stringify(item)} with memo, but getting objects`);
  return <Text>{JSON.stringify(item)}</Text>;
});

const InlineFunctionComponent = memo(
  ({onPress}: {onPress: ButtonProps['onPress']}) => {
    useRenderCount(
      '#1 - InlineFunctionComponent (with memo) - inline function recreated every time',
    );
    return <Button title="Click me" onPress={onPress} />;
  },
);

const InlineObjectLiteralComponent = memo(
  ({style}: {style: StyleProp<any>}) => {
    useRenderCount(
      '#2 - InlineObjectLiteralComponent (with memo) - object is passed, but its a new reference every time',
    );
    return (
      <View style={style}>
        <Text>Inline Object Literal</Text>
      </View>
    );
  },
);

const ScrollViewListComponent = ({num}: {num: number}) => {
  useRenderCount('#3 - Non FlatList component without memoization');
  const arr = Array.from(Array(num).keys());
  return (
    <ScrollView style={styles.list}>
      {arr.map(item => (
        <Item item={item} />
      ))}
    </ScrollView>
  );
};

const FlatListComponent = ({num}: {num: number}) => {
  useRenderCount('#4 - FlatListComponet without memoization');
  const arr = Array.from(Array(num).keys());
  return (
    <FlatList
      data={arr}
      style={styles.list}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => item.toString()}
    />
  );
};

const FlatListWithMomoization = () => {
  useRenderCount('#3 - FlatList with memoization, but passing objects');
  const arr = [
    {
      id: 1,
      test: {
        a: 'b',
      },
    },
    {id: 2, test: 'b'},
    {id: 3, test: 'c'},
  ];
  return (
    <FlatList
      style={styles.list}
      data={arr}
      renderItem={({item}) => <ItemMemoizedButObj {...item} />}
    />
  );
};

const UnnecessaryStateUpdatesComponent = () => {
  const [state, setState] = useState(0);
  useRenderCount('UnnecessaryStateUpdatesComponent');
  return <Button title="No Change" onPress={() => setState(state)} />;
};

const NotUtilizingMemoComponent = memo(({value}: any) => {
  useRenderCount('#0 - NotUtilizingMemoComponent');
  return <Text>{value}</Text>;
});

const NotUsingCallbacksComponent = () => {
  const [value, setValue] = useState('');
  useRenderCount('NotUsingCallbacksComponent');
  return (
    <TextInput
      value={value}
      onChangeText={text => setValue(text)}
      style={{backgroundColor: 'gray'}}
    />
  );
};

const NotBatchingStateUpdatesComponent = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  useRenderCount(
    `#7 - NotBatchingStateUpdatesComponent on separate ticks ${a}, ${b}`,
  );
  const increment = () => {
    setA(a + 1);
    // Delay the second state update to cause it to occur in a separate tick
    setTimeout(() => {
      setB(b + 1);
    }, 0);
  };
  return (
    <Button
      title="Increment NotBatchingStateUpdatesComponent"
      onPress={increment}
    />
  );
};

const InputComponent = ({text, onTextChange}: any) => {
  useRenderCount('#6 - InputComponent - re-renders on every state update');
  return (
    <TextInput
      value={text}
      onChangeText={onTextChange}
      style={{backgroundColor: 'purple'}}
    />
  );
};
// ... other components showcasing other pitfalls

export const PitfallsScreen = React.memo(() => {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('');

  const onTextChange = (text: string) => {
    setText(text);
  };

  const increment = () => {
    setCount(count + 1);
  };

  useRenderCount('PitfallsScreen');

  return (
    <View>
      <NotUtilizingMemoComponent value={count} />
      <InlineFunctionComponent onPress={() => alert('Inline function')} />
      <InlineObjectLiteralComponent style={{padding: 10}} />
      <UnnecessaryStateUpdatesComponent />
      <NotUsingCallbacksComponent />
      <NotBatchingStateUpdatesComponent />
      <InputComponent text={text} onTextChange={onTextChange} />
      <ExpensiveCalculationComponent num={10} />
      <ScrollViewListComponent num={1000} />
      <FlatListComponent num={1000} />
      <FlatListWithMomoization />
      <Button title="Increment" onPress={increment} />
      <Text>{`Count: ${count}`}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  pad: {
    padding: 10,
  },
  item: {
    backgroundColor: 'gray',
  },
  list: {
    maxHeight: 200,
  },
});
