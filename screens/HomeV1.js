import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import {
  Feather,
  Ionicons,
  MaterialIcons,
  Octicons,
  MaterialCommunityIcons,
  Fontisto,
} from '@expo/vector-icons'
import { ScrollView } from 'react-native-virtualized-view'
import { StatusBar } from 'expo-status-bar'
import CustomModal from '../components/CustomModal'
import { furnitureStores } from '../data/shops'
import { furnitureCategories } from '../data/utils'

const HomeV1 = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [modalVisible, setModalVisible] = useState(true)

  const handlePressGotIt = () => {
      // Handle the logic when the "GOT IT" button is pressed
      setModalVisible(false)
  }

  const handleSearch = (text) => {
      setSearchQuery(text)
  }

  const renderProductCategories = () => {
      return (
          <View>
              <View
                  style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 8,
                      alignItems: 'center',
                  }}
              >
                  <Text style={{ ...FONTS.body2 }}>All Categories</Text>
                  <TouchableOpacity
                      onPress={() => console.log('See all category')}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                      <Text style={{ fontSize: 16, fontFamily: 'regular' }}>
                          See All
                      </Text>
                      <View>
                          <MaterialIcons
                              name="keyboard-arrow-right"
                              size={24}
                              color={COLORS.gray4}
                          />
                      </View>
                  </TouchableOpacity>
              </View>

              <FlatList
                  horizontal={true}
                  data={furnitureCategories}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                      <TouchableOpacity
                          key={index}
                          style={{
                              height: 60,
                              paddingHorizontal: 8,
                              marginHorizontal: 10,
                              alignItems: 'center',
                              flexDirection: 'row',
                              shadowColor: 'rgba(150, 150, 154,.4)',
                              shadowOffset: {
                                  width: 12,
                                  height: 12,
                              },
                              shadowOpacity: 0.15,
                              shadowRadius: 30,
                              elevation: 0.1,
                              borderRadius: 50,
                              borderColor: COLORS.tertiaryGray,
                              borderWidth: 1,
                          }}
                      >
                          <Image
                              source={item.image}
                              resizeMode="contain"
                              style={{
                                  height: 44,
                                  width: 44,
                                  borderRadius: 22,
                                  marginRight: 10,
                              }}
                          />
                          <Text
                              style={{ fontSize: 16, fontFamily: 'regular' }}
                          >
                              {item.name}
                          </Text>
                      </TouchableOpacity>
                  )}
              />
          </View>
      )
  }
  const renderSearchBar = () => {
      return (
          <View
              style={{
                  width: SIZES.width - 32,
                  height: 62,
                  borderRadius: 10,
                  backgroundColor: COLORS.tertiaryGray,
                  alignItems: 'center',
                  flexDirection: 'row',
              }}
          >
              <View
                  style={{
                      marginHorizontal: SIZES.padding,
                  }}
              >
                  <Ionicons name="search" size={24} color={COLORS.gray4} />
              </View>
              <TextInput
                  placeholder="Search products, shops, categories..."
                  onChangeText={handleSearch}
                  placeholderTextColor={COLORS.gray5}
              />
          </View>
      )
  }

  const renderShops = () => {
      return (
          <View style={{ height: 'auto' }}>
              <View
                  style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 8,
                      alignItems: 'center',
                  }}
              >
                  <Text style={{ ...FONTS.body2 }}>Open Shops</Text>
                  <TouchableOpacity
                      onPress={() => navigation.navigate('OpenShops')}
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                      <Text style={{ fontSize: 16, fontFamily: 'regular' }}>
                          See All
                      </Text>
                      <View>
                          <MaterialIcons
                              name="keyboard-arrow-right"
                              size={24}
                              color={COLORS.gray4}
                          />
                      </View>
                  </TouchableOpacity>
              </View>
              <FlatList
                  nestedScrollEnabled
                  data={furnitureStores}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                      <TouchableOpacity
                          onPress={() => navigation.navigate('ShopView2')}
                          style={{
                              width: SIZES.width - 32,
                              borderColor: COLORS.tertiaryGray,
                              borderWidth: 1,
                              paddingBottom: 2,
                              marginBottom: 12,
                              borderRadius: 15,
                          }}
                      >
                          <Image
                              source={item.image}
                              style={{
                                  width: SIZES.width - 32,
                                  height: 136,
                                  borderRadius: 15,
                              }}
                          />
                          <Text
                              style={{
                                  fontSize: 18,
                                  fontFamily: 'regular',
                                  marginVertical: 6,
                              }}
                          >
                              {item.name}
                          </Text>
                          <View
                              style={{
                                  marginBottom: 4,
                                  flexDirection: 'row',
                              }}
                          >
                              {item.keywords.map((keyword, index) => (
                                  <Text
                                      key={index}
                                      style={{
                                          fontSize: 14,
                                          color: COLORS.gray5,
                                          textTransform: 'capitalize',
                                      }}
                                  >
                                      {keyword}
                                      {index !== item.keywords.length - 1
                                          ? '-'
                                          : ''}
                                  </Text>
                              ))}
                          </View>

                          <View style={{ flexDirection: 'row' }}>
                              <View
                                  style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                  }}
                              >
                                  <Octicons
                                      name="star"
                                      size={24}
                                      color={COLORS.primary}
                                  />
                                  <Text style={{ marginLeft: 8 }}>
                                      {item.rating}
                                  </Text>
                              </View>
                              <View
                                  style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      marginHorizontal: SIZES.padding3,
                                  }}
                              >
                                  <MaterialCommunityIcons
                                      name="truck-delivery-outline"
                                      size={24}
                                      color={COLORS.primary}
                                  />
                                  <Text style={{ marginLeft: 8 }}>
                                      {item.shipping}
                                  </Text>
                              </View>
                              <View
                                  style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                  }}
                              >
                                  <Fontisto
                                      name="stopwatch"
                                      size={22}
                                      color={COLORS.primary}
                                  />
                                  <Text style={{ marginLeft: 8 }}>
                                      {item.deliveryTime} days
                                  </Text>
                              </View>
                          </View>
                      </TouchableOpacity>
                  )}
              />
          </View>
      )
  }
  return (
      <SafeAreaView style={styles.area}>
          <View style={{ flex: 1, marginHorizontal: 16 }}>
              <StatusBar hidden={true} />
              <View
                  style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 20,
                  }}
              >
                  <View
                      style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                      }}
                  >
                      <TouchableOpacity
                          onPress={() => navigation.toggleDrawer()}
                          style={{
                              height: 45,
                              width: 45,
                              borderRadius: 22.5,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: COLORS.gray,
                          }}
                      >
                          <Image
                              source={icons.menu}
                              style={{
                                  height: 24,
                                  width: 24,
                              }}
                          />
                      </TouchableOpacity>
                      <View
                          style={{
                              flexDirection: 'column',
                              marginLeft: 12,
                          }}
                      >
                          <Text
                              style={{
                                  fontSize: 12,
                                  fontWeight: 'bold',
                                  color: COLORS.primary,
                              }}
                          >
                              DELIVER TO
                          </Text>
                          <View
                              style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                              }}
                          >
                              <Text
                                  style={{
                                      fontSize: 14,
                                      fontWeight: 'regular',
                                  }}
                              >
                                  Halab lab office
                              </Text>
                              <Image
                                  source={icons.arrowDown2}
                                  style={{
                                      height: 12,
                                      width: 12,
                                      marginLeft: 4,
                                  }}
                              />
                          </View>
                      </View>
                  </View>

                  <TouchableOpacity
                      onPress={() => navigation.navigate('Cart')}
                      style={{
                          height: 45,
                          width: 45,
                          borderRadius: 22.5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: COLORS.tertiaryBlack,
                      }}
                  >
                      <View>
                          <View
                              style={{
                                  position: 'absolute',
                                  top: -16,
                                  left: 12,
                                  backgroundColor: COLORS.primary,
                                  height: 25,
                                  width: 25,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 12.5,
                                  zIndex: 999,
                              }}
                          >
                              <Text
                                  style={{
                                      fontSize: 16,
                                      color: COLORS.white,
                                  }}
                              >
                                  2
                              </Text>
                          </View>
                          <Feather
                              name="shopping-bag"
                              size={24}
                              color={COLORS.white}
                          />
                      </View>
                  </TouchableOpacity>
              </View>

              <View
                  style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 16,
                  }}
              >
                  <Text style={{ fontSize: 16, fontFamily: 'regular' }}>
                      Hey Halal,
                  </Text>
                  <Text style={{ fontSize: 16, fontFamily: 'bold' }}>
                      Good Afternoon!
                  </Text>
              </View>
              <ScrollView>
                  {renderSearchBar()}
                  {renderProductCategories()}
                  {renderShops()}
              </ScrollView>
          </View>
          <CustomModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              onPressGotIt={handlePressGotIt}
              code="#1243CD2"
          />
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
      flex: 1,
      backgroundColor: COLORS.white,
  },
})

export default HomeV1