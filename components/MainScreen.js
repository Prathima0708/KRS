import React from 'react'
import Box from './Box';
import { StyleSheet, View } from 'react-native';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Box text="red" />
        <Box text="blue" />
      </View>
      <View style={styles.row}>
        <Box text="green" />
        <Box text="yellow" />
      </View>
      <View style={styles.row}>
        <Box text="purple" />
        <Box text="orange" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
export default MainScreen