import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { COLORS } from '../constants'
import * as Animatable from "react-native-animatable"
import Button from '../components/Button'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons } from "@expo/vector-icons"
import OTPTextInput from 'react-native-otp-textinput'
import { LinearGradient } from 'expo-linear-gradient'
import { useRoute } from '@react-navigation/native'
import { validatepin_URL } from '../constants/utils/URL'

const Verification = ({ navigation }) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const otpInput = useRef(null)
    const [pin, setPin] = useState('');
    const route=useRoute()

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    const handleVerify = async () => {
      console.log("Email",route.params.email);
      console.log("Pin",pin)
        try {
          setIsLoading(true);
    
          // Check if pin is not empty
          if (!pin) {
            throw new Error('Please enter the OTP');
          }
    
          // Make API call to validate pin
          const response = await fetch(`${validatepin_URL}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: route.params.email, // Replace with the actual email
              pin: pin,
            }),
          });
    
          if (response.ok) {
            // Pin validation successful
            console.log('Pin validation successful');
            // Add your logic for success, e.g., navigate to the login screen
            navigation.navigate('Login');
          } else {
            // Pin validation failed
            throw new Error('Pin validation failed');
          }
        } catch (error) {
          console.error('Error during pin validation:', error);
    
          // Show an alert to the user
          if (error.message === 'Please enter the OTP') {
            alert('Error', 'Please enter the OTP');
          } else {
            // Handle other errors or display a general error message
            alert('Error', 'Pin validation failed. Please try again.');
          }
        } finally {
          setIsLoading(false);
        }
      };

      function optChangeHandler(event){
        const value = event.nativeEvent.text;
        setPin(value)
      }

    return (
        <LinearGradient 
          colors={[COLORS.primary, COLORS.primary]}
          style={{ flex: 1, backgroundColor: COLORS.blue }}>
            <StatusBar hidden={true} />
            <View style={commonStyles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={commonStyles.backIcon}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={commonStyles.headerTitle}>Verification</Text>
                <Text style={commonStyles.subHeaderTitle}>We have sent a code to your email</Text>
                <Text style={commonStyles.subHeaderTitleBold}>{route.params.email}</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}>
                <View style={styles.center}>
                    <Text style={commonStyles.inputHeader}>Code</Text>
                    <TouchableOpacity
                        onPress={() => console.log("Resend")}
                    >
                        <Text style={{ textDecorationLine: 'underline' }}>Resend</Text>
                    </TouchableOpacity>
                </View>
                <OTPTextInput
                    textInputStyle={commonStyles.OTPStyle}
                    inputCount={6}
                    tintColor={COLORS.primary}
                    // onChange={(pin) => setPin(pin)}
                    onChange={optChangeHandler}
                />
                <Button
                    title="VERIFY"
                    isLoading={isLoading}
                    filled
                    onPress={handleVerify}
                 //   onPress={() => navigation.navigate('ResetPassword')}
                    style={commonStyles.btn1}
                />
            </Animatable.View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    center: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default Verification