import { View, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { COLORS, images } from '../constants'
import * as Animatable from 'react-native-animatable'
import Input from '../components/Input'
import Button from '../components/Button'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { login_URL, reg_URL } from '../constants/utils/URL'
import {  FONTS, icons } from '../constants'

const isTestMode = true

const initialState = {
    inputValues: {
        fullName: isTestMode ? 'John Doe' : '',
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
        confirmPassword: isTestMode ? '**********' : '',
        companyName: isTestMode ? 'CowboyIceCream' : '',
        address1: isTestMode ? 'Manipal' : '',
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false,
        companyName: false,
        address1: false,
    },
    formIsValid: false,
}

const Signup = ({ navigation }) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        passwordConfirm:''
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
      setFormData({
        fullName: '',
        email: '',
        password: '',
        passwordConfirm:''
      })
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])
    
    // const onSubmit = async () => {
    //     try {
    //         setIsLoading(true)
    //         if (formData.password !== formData.passwordConfirm) {
    //           alert('Passwords do not match');
    //         }

    //         const response = await fetch(`${reg_URL}`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 fullName: formData.fullName,
    //                 email: formData.email,
    //                 password: formData.password,
    //             }),
    //         })

    //         if (response.ok) {
    //             const responseData = await response.json()
    //             console.log('API response:', responseData)
    //             // Handle successful signup, e.g., navigate to the login screen
    //             navigation.navigate('Login')
    //             setFormData({
    //               fullName: '',
    //               email: '',
    //               password: '',
    //             })
    //         } else {
    //             throw new Error('Signup failed')
    //         }
    //     } catch (error) {
    //         console.error('Error during signup:', error)
    //         // Handle error, e.g., display an error message to the user
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    const onSubmit = async () => {
      try {
        setIsLoading(true);

        if (!formData.fullName || !formData.email || !formData.password || !formData.passwordConfirm) {
            alert('Please fill in all fields');
            return
          }
    
        // Check if passwords match
        if (formData.password !== formData.passwordConfirm) {
          throw new Error('Passwords do not match');
        }
    
        const response = await fetch(`${reg_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
          }),
        });
    
        if (response.ok) {
          const responseData = await response.json();
          console.log('API response:', responseData);
          Alert.alert('Success', responseData.status, [
            { text: 'OK', onPress: () => navigation.navigate('Verification',{email:formData.email}) },
          ]);

          setFormData({
            fullName: '',
            email: '',
            password: '',
            passwordConfirm:''
          })
         // navigation.navigate('Verification');
        } else {
          throw new Error('Signup failed');
        }
      } catch (error) {
        console.error('Error during signup:', error);
    
        // Show an alert to the user when passwords do not match
        if (error.message === 'Passwords do not match') {
          alert('Passwords do not match', 'Passwords do not match');
        } else {
          // Handle other errors or display a general error message
          alert('Error', 'Signup failed. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    return (
        <LinearGradient
            colors={[COLORS.primary, COLORS.primary]}
            style={{ flex: 1, backgroundColor: COLORS.blue }}
        >
            <StatusBar hidden={true} />
            <View style={commonStyles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={commonStyles.backIcon}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text style={commonStyles.headerTitle}>Sign up</Text>
                <Text style={commonStyles.subHeaderTitle}>
                    Please sign up to get started
                </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}
            >
                <KeyboardAwareScrollView>
                    <Text style={commonStyles.inputHeader}>Name</Text>
                    <Input
                        id="fullName"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['fullName']}
                        placeholder="Name"
                        placeholderTextColor={COLORS.black}
                    />
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

                    <Text style={commonStyles.inputHeader}>
                        Re-Type Password
                    </Text>
                    <Input
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['passwordConfirm']}
                        autoCapitalize="none"
                        id="passwordConfirm"
                        placeholder="*************"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry={true}
                    />
                    {/* <Text style={commonStyles.inputHeader}>Company Name</Text>
                    <Input
                        id="companyName"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['companyName']}
                        placeholder="CowboyIceCream"
                        placeholderTextColor={COLORS.black}
                    />
                     <Text style={commonStyles.inputHeader}>Address Line 1</Text>
                    <Input
                        id="address1"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['address1']}
                        placeholder="Manipal"
                        placeholderTextColor={COLORS.black}
                    />
                     
                     <Text style={commonStyles.inputHeader}>City</Text>
                    <Input
                        id="city"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['city']}
                        placeholder="Manipal"
                        placeholderTextColor={COLORS.black}
                    />
                     <Text style={commonStyles.inputHeader}>Taluk</Text>
                    <Input
                        id="taluk"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['taluk']}
                        placeholder="Udupi"
                        placeholderTextColor={COLORS.black}
                    />
                     <Text style={commonStyles.inputHeader}>District</Text>
                    <Input
                        id="district"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['district']}
                        placeholder="Udupi"
                        placeholderTextColor={COLORS.black}
                    />
                    <Text style={commonStyles.inputHeader}>State</Text>
                    <Input
                        id="state"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['state']}
                        placeholder="Karnataka"
                        placeholderTextColor={COLORS.black}
                    />
                     <Text style={commonStyles.inputHeader}>Pincode</Text>
                    <Input
                        id="pincode"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['pincode']}
                        placeholder="576104"
                        placeholderTextColor={COLORS.black}
                    /> */}
                    <Button
                        title="SIGN UP"
                        isLoading={isLoading}
                        filled
                        onPress={onSubmit}
                        //  onPress={() => navigation.navigate('Login')}
                        style={commonStyles.btn1}
                    />
                </KeyboardAwareScrollView>
                <View style={commonStyles.center}>
                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                        Already have account?{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                            Login In
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </LinearGradient>
    )
}

export default Signup
