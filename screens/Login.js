import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { COLORS, FONTS, icons } from '../constants'
import Checkbox from 'expo-checkbox'
import * as Animatable from 'react-native-animatable'
import Input from '../components/Input'
import Button from '../components/Button'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient'
import { login_URL } from '../constants/utils/URL'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const isTestMode = true

const initialState = {
    inputValues: {
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
    },
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}

const Login = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false)
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // const inputChangedHandler = useCallback(
    //     (inputId, inputValue) => {
    //         const result = validateInput(inputId, inputValue)
    //         dispatchFormState({ inputId, validationResult: result, inputValue })
    //     },
    //     [dispatchFormState]
    // )

    const inputChangedHandler = (id, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }))
    }

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    async function onSubmit() {
        const request_model = {
            email: formData.email,
            password: formData.password,
        }
        const jsonString = JSON.stringify(request_model, null, 2) // null and 2 are optional for formatting (indentation of 2 spaces)
        console.log(jsonString)
        try {
            setIsLoading(true)

            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
            }

            // const res = await axios.post(`${login_URL}`, request_model, {
            //     headers: headers,
            // }
            // )

            const res = await axios.post(`${login_URL}`, request_model)

            if (res.data) {
                console.log('API response:', res.data)
            } 

            if(res.data.status==="success"){
                navigation.navigate('LocationAccess')
            }
           
            else {
            }
            try {
                await AsyncStorage.setItem("userid", res.data.userId);
              } catch (error) {}
        } catch (error) {
            console.log('error')
            alert("Please enter correct pin")
            console.error('Error during signin:', error)
        } finally {
            //  navigation.navigate('LocationAccess')
            setIsLoading(false)
        }
    }

    // const onSubmit = async () => {
    //     try {
    //         setIsLoading(true)

    //         if (!formData.email || !formData.password) {
    //             alert('Please fill in all fields');
    //             return
    //           }
    //         const response = await fetch(`${login_URL}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email: formData.email,
    //                 password: formData.password,
    //             }),
    //         })

    //         if (response.ok) {
    //             const responseData = await response.json()
    //             console.log('API response:', responseData)
    //             // Handle successful signup, e.g., navigate to the login screen
    //             navigation.navigate('LocationAccess')
    //         } else {
    //            // throw new Error('Signin failed')

    //         }
    //         console.log(response)
    //         navigation.navigate('LocationAccess')
    //     } catch (error) {
    //         console.error('Error during signin:', error)
    //         // Handle error, e.g., display an error message to the user
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    // implementing facebook authentication
    const facebookAuthHandler = () => {
        return null
    }

    // implementing twitter authentication
    const twitterAuthHandler = () => {
        return null
    }

    // implementing apple authentication
    const appleAuthHandler = () => {
        return null
    }

    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary]}
            style={{ flex: 1, backgroundColor: COLORS.blue }}
        >
            <StatusBar hidden />
            <View style={commonStyles.header}>
                <Text style={commonStyles.headerTitle}>Log In</Text>
                <Text style={commonStyles.subHeaderTitle}>
                    Please sign in to your existing account
                </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}
            >
                <Text style={commonStyles.inputHeader}>Email</Text>
                <Input
                    id="email"
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities['email']}
                    placeholder="Email"
                    placeholderTextColor={COLORS.black}
                    keyboardType="email-address"
                />
                <Text style={commonStyles.inputHeader}>Password</Text>
                <Input
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities['password']}
                    autoCapitalize="none"
                    id="password"
                    placeholder="*************"
                    placeholderTextColor={COLORS.black}
                    secureTextEntry={true}
                />

                <View style={commonStyles.checkBoxContainer}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Checkbox
                            style={commonStyles.checkbox}
                            value={isChecked}
                            color={isChecked ? COLORS.primary : COLORS.black}
                            onValueChange={setChecked}
                        />
                        <Text style={{ ...FONTS.body4 }}>Remenber me</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                            Forgot Password ?
                        </Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title="LOG IN"
                    isLoading={isLoading}
                    filled
                    onPress={onSubmit}
                    style={commonStyles.btn}
                />
                <View style={commonStyles.center}>
                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                        Don't have an account?{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.black,
                        textAlign: 'center',
                    }}
                >
                    Or
                </Text>

                <View style={commonStyles.socialContainer}>
                    <TouchableOpacity
                        onPress={facebookAuthHandler}
                        style={commonStyles.socialIconContainer}
                    >
                        <Image
                            source={icons.facebook}
                            resizeMode="contain"
                            style={commonStyles.socialLogo}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={twitterAuthHandler}
                        style={commonStyles.socialIconContainer}
                    >
                        <Image
                            source={icons.google}
                            resizeMode="contain"
                            style={commonStyles.socialLogo}
                        />
                    </TouchableOpacity>
                </View> */}
            </Animatable.View>
        </LinearGradient>
    )
}

export default Login
