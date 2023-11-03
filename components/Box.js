import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Box = ({ text }) => {
  return(
<View style={styles.box}>
  <Text>{text}</Text>
</View>
  )  
};

const styles = StyleSheet.create({
    box: {
        width: '45%', // Adjust the width as needed
        height: 100,   // Decreased height
        margin: 5,
        borderRadius: 10, // Add border radius for rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,  // Add a border to the box
        borderColor: 'black',  // Set the border color
      },
});

export default Box;
