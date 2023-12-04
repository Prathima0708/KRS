import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants'
import { ScrollView } from 'react-native-virtualized-view'
import FavouriteCard from '../components/FavouriteCard'
import { products } from '../data/products'
import Header from '../components/Header'
import { getFavorites_URL } from '../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Favourite = ({ navigation }) => {
    /***
     * Render User favourite Shops
     */
    const [favorites,setFavorites]=useState([]); 
    const[userId,setUserId]=useState('')
    useEffect(() => {
        console.log('products screen')
        const getUserId = async () => {
            try {
                // Retrieve the value of "userid" from AsyncStorage
                const userid = await AsyncStorage.getItem('userid')

                // Check if the value is present
                if (userid !== null) {
                    setUserId(userid)
                    console.log('User ID:', userId)
                } else {
                    console.log('User ID not found in AsyncStorage')
                }
            } catch (error) {
                console.error('Error retrieving user ID:', error)
            }
        }

        getUserId()
    }, [])
      useEffect(() => {
        async function getAllFavorites() {
          try {
            const res = await axios.post(`${getFavorites_URL}`);
      
            setFavorites(res.data);
          } catch (e) {
            console.log(e);
          }
        }
      
        getAllFavorites();
      }, []);
    function renderMyFavouriteShops() {
        return (
            <View>
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <FavouriteCard
                            image={item.image}
                            shop={item.shop}
                            name={item.name}
                            price={item.price}
                        />
                    )}
                />
            </View>
        )
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            <View
                style={{
                    flex: 1,
                    padding: 16,
                }}
            >
                <Header title="Favourite" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderMyFavouriteShops()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Favourite