import { View, Text, Image } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'
import { Entypo, FontAwesome } from "@expo/vector-icons"

const FavouriteCard = (props) => {
    return (
        <View style={{
            flexDirection: "row",
            height: 108,
            width: "100%",
            borderWidth: .3,
            borderColor: 'rgba(0,0,0,.4)',
            paddingVertical: 3,
            borderRadius: 4,
            paddingHorizontal: 8,
            marginVertical: 6,
            alignItems: 'center'
        }}>
            <Image
                source={props.image}
                resizeMode='cover'
                style={{
                    height: 84,
                    width: 84,
                    borderRadius: 4
                }}
            />
            <View style={{
                marginLeft: 10,
                marginRight: 6,
                flex: 1
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'bold',
                        color: '#101010'
                    }}>{props.name}</Text>

                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Entypo name="shop" size={18} color={COLORS.primary} />
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#878787',
                            fontFamily: 'regular',
                            marginVertical: 2,
                            marginLeft: 10
                        }}
                    >
                        {props.shop}
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <FontAwesome name="money" size={18} color={COLORS.primary} />
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'bold',
                        color: COLORS.primary,
                        marginLeft: 12
                    }}>${props.price}</Text>
                </View>
            </View>
        </View>
    )
}

export default FavouriteCard