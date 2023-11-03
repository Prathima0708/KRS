import React from 'react'
import Box from './Box';
import { StyleSheet, View } from 'react-native';

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Box text="Order" />
        <Box text="Buy again" />
      </View>
      <View style={styles.row}>
        <Box text="Order list" />
        <Box text="Cart" />
      </View>
      <View style={styles.row}>
        <Box text="Favorites" />
        <Box text="Ledger" />
      </View>
      <View style={styles.row}>
        <Box text="Invoices" />
        <Box text="Return" />
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