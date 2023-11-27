import React from 'react'
import { SafeAreaView } from 'react-native'
import { View } from 'react-native'
import { Text } from 'react-native'
import Header from '../../components/Header'
import { FONTS, SIZES } from '../../constants';
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native'

const OrderList = () => {
    const dummyData = [
        {
          orderNo: 18,
          date: '2023-11-13',
          total: '$100',
          ratings: 4.5,
          orderStatus: 'Delivered',
        },
        {
            orderNo: 18,
            date: '2023-11-13',
            total: '$100',
            ratings: 4.5,
            orderStatus: 'Delivered',
          },
          {
            orderNo: 18,
            date: '2023-11-13',
            total: '$100',
            ratings: 4.5,
            orderStatus: 'Delivered',
          },
          {
            orderNo: 18,
            date: '2023-11-13',
            total: '$100',
            ratings: 4.5,
            orderStatus: 'Delivered',
          },

        // Add more dummy data as needed
      ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.cardContainer}>
        <Header title="Order List" />
        {dummyData.map((item, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.cardRow}>
              <Text style={styles.orderNo}>Order No: {item.orderNo}</Text>
              <Text style={styles.date}>Date: {item.date}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.total}>Total: {item.total}</Text>
              <View style={styles.ratingsContainer}>
                <Text style={styles.ratings}>Ratings: </Text>
                {Array.from({ length: Math.floor(item.ratings) }).map((_, i) => (
                  <MaterialCommunityIcons
                    key={i}
                    name="star"
                    size={20}
                    color="black"
                    style={styles.starIcon}
                  />
                ))}
              </View>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.cardRow}>
              <Text style={styles.orderStatus}>Order Status: {item.orderStatus}</Text>
            </View>
          </View>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      fontFamily: 'regular',
    },
    cardContainer: {
      flex: 1,
      padding: 16,
      textAlign: 'center',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      elevation: 3,
      padding: 16,
      marginTop:20,
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    orderNo: {
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily:'regular'
    },
    date: {
      fontSize: 16,
      fontFamily:'regular'
    },
    total: {
      fontSize: 16,
       fontFamily:'regular'
    },
    ratings: {
      fontSize: 16,
      fontFamily:'regular'
    },
    horizontalLine: {
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      marginVertical: 10,
    },
    orderStatus: {
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily:'regular'
    },
    ratingsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      starIcon: {
        marginLeft: 5,
      },
  });

export default OrderList