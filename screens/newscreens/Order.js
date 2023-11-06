import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Button

} from 'react-native';
import {
  Feather,
  Ionicons,
  MaterialIcons,
  Octicons,

  Fontisto,
} from '@expo/vector-icons'
import { CheckBox } from '@react-native-community/checkbox';
import shop1 from "../../assets/images/shops/shop7.jpg"
import { images } from "../../constants/images"
import Toast from 'react-native-toast-message';
// import { SafeAreaView } from 'react-native-safe-area-context'

// import { ScrollView } from 'react-native-virtualized-view'


import { COLORS } from '../../constants'
import Header from '../../components/Header'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Order = ({ navigation }) => {
  const [brandsModalVisible, setBrandsModalVisible] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isCardClicked, setIsCardClicked] = useState(false);


  const brands = [
    // Define your brands data here
    'Brand A',
    'Brand B',
    'Brand C',
    // ...
  ];

  const data = [
    {
      id: 1,
      image: require('../../assets/images/shops/shop7.jpg'), // Use `require` for local images
      label: 'Nandini H C Milk 500 Ml',
      mrp: 30,
      price: 25,
      favorite: false,
    },
    {
      id: 2,
      image: require('../../assets/images/shops/shop7.jpg'), // Use `require` for local images
      label: '2M Choco strands',
      mrp: 25,
      price: 20,
      favorite: true,
    },
    {
      id: 3,
      image: require('../../assets/images/shops/shop7.jpg'), // Use `require` for local images
      label: '2M Dark choco chips ',
      mrp: 25,
      price: 20,
      favorite: true,
    },
    {
      id: 3,
      image: require('../../assets/images/shops/shop7.jpg'), // Use `require` for local images
      label: '2M Dark choco chips ',
      mrp: 25,
      price: 20,
      favorite: true,
    },
    {
      id: 3,
      image: require('../../assets/images/shops/shop7.jpg'), // Use `require` for local images
      label: '2M Dark choco chips ',
      mrp: 25,
      price: 20,
      favorite: true,
    },

    // Add more items as needed
  ];


  const handleBrandSelection = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleOpenCartModal = (product) => {
    setIsCardClicked(!isCardClicked);
    setCartModalVisible(true);
  };

  function handleCardModal() {
    setCartModalVisible(false)
    Toast.show({

      position: 'bottom',
      text1: 'Added to cart',
    });
    // alert("Added to cart")
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >

      <View
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        <Header title="Order" />
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => setCategoryModalVisible(true)}
            style={{
              width: '40%',
              backgroundColor: COLORS.primary,
              padding: 10,
              borderRadius: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10
            }}
          >
            <Text style={{ color: 'white', marginRight: 5 }}>Categories</Text>
            <MaterialCommunityIcons name="arrow-down" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setBrandsModalVisible(true)}
            style={{
              width: '40%',
              backgroundColor: COLORS.primary,
              padding: 10,
              borderRadius: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10
            }}
          >
            <Text style={{ color: 'white', marginRight: 5 }}>Brands</Text>
            <MaterialCommunityIcons name="arrow-down" size={20} color="white" />
          </TouchableOpacity>
        </View>



        {/* Brands Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={brandsModalVisible}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                width: 200, // Set the desired width
                height: 200, // Set the desired height
                backgroundColor: 'white',
                padding: 16,
                borderRadius: 10,
                position: 'absolute', // Use position 'absolute'
              }}
            >
              <ScrollView>
                {brands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    onPress={() => handleBrandSelection(brand)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text>{selectedBrands.includes(brand) ? '\u2713' : ' '}</Text>
                    <Text>{brand}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Apply Button */}
              <TouchableOpacity
                onPress={() => setBrandsModalVisible(false)}
                style={{
                  backgroundColor: COLORS.primary,
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Search Bar */}
        <TextInput
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />

        {/* Cards */}
        <ScrollView>
          {data.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleOpenCartModal(item)}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 16,
                  borderRadius: 10,
                  marginBottom: 16,
                  elevation: isCardClicked ? 5 : 0, // Remove shadow when card is clicked
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={item.image} style={{ width: 50, height: 50, marginRight: 30 }} />
                  <Text>{item.label}</Text>
                </View>
                <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginTop: -10, marginLeft: 80 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Text>MRP: ₹ {item.mrp}</Text>
                  <Text style={{ marginLeft: 10 }}>Price: ₹ {item.price}</Text>
                  <TouchableOpacity onPress={() => handleOpenCartModal(item)} style={{ marginLeft: 100 }}>
                    {item.favorite ? (
                      <MaterialCommunityIcons name="heart" size={24} color="red" />
                    ) : (
                      <MaterialCommunityIcons name="heart" size={24} color="gray" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}




        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={cartModalVisible}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                padding: 16,
                borderRadius: 10,
                width: 300,
                borderWidth: 1,
                borderColor: 'black',
              }}
            >
              <View>
                <Text>Almira Samosa Patti 500 Gms</Text>



                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 5,
                    marginTop: 10,
                    padding: 1,
                  }}
                >
                  {/* Table header */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'black' }}>
                    <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: 'black', padding: 10 }}>
                      <Text>MRP</Text>
                    </View>
                    <View style={{ flex: 1, padding: 5 }}>
                      <Text>₹85</Text>
                    </View>
                  </View>

                  {/* First row of dynamic content */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: 'black' }}>
                    <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: 'black', padding: 10 }}>
                      <Text> >0</Text>
                    </View>
                    <View style={{ flex: 1, padding: 5 }}>
                      <Text>₹63.37</Text>
                    </View>
                  </View>



                  {/* Add more rows as needed */}
                </View>




                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Quantity:</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 5,
                      }}
                    >
                      <Text>1</Text>
                    </View>

                  </View>
                </View>
                <Text style={{ marginLeft: 90 }}>Total :₹ 405</Text>
                <TouchableOpacity
                  onPress={handleCardModal}
                  style={{
                    backgroundColor: COLORS.primary,
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: 'white' }}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>



          </View>

        </Modal>

      </View>
    </SafeAreaView>
  );
};

export default Order