import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import { firebase } from '../services/config'
import { SelectList } from 'react-native-dropdown-select-list';

import { Feather } from '@expo/vector-icons';

const Register = () => {
    // Initialize navigation
    const navigation = useNavigation();

    // Define state variables for email, password, full name, and selected allergy
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [allergy, setAllergy] = useState('')

    // Define a list of allergy options
    const allergyList = [
        { key: '1', value: 'Meat' },
        { key: '2', value: 'Seafood' },
        { key: '3', value: 'Poultry' },
        { key: '4', value: 'Dairy' },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Grains' },
        { key: '7', value: 'Nuts' },
        { key: '8', value: 'Dessert' },
        { key: '9', value: 'Alcoholic' }
    ];

    // Function to register a new user
    const registerUser = async (email, password, fullName, allergy) => {

        // Create a new user with email and password
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {

                // Send a verification email to the user
                firebase.auth().currentUser.sendEmailVerification({
                    handleCodeInApp: true,
                    url: 'https://food-app-2146c.firebaseapp.com',
                })
                    .then(() => {
                        alert('Verification email sent!');
                    }).catch((error) => {
                        alert(error.message);
                    })
                    .then(() => {

                        // Store user information in the Firestore database
                        firebase.firestore().collection('users')
                            .doc(firebase.auth().currentUser.uid)
                            .set({
                                fullName,
                                allergy,
                                email,
                            })
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            })
            .catch((error => {
                alert(error.message);
            }));
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>SIGN UP</Text>
            <View style={styles.inputContainer}>
                <Feather name="user" size={30} color="black" />
                <TextInput
                    placeholder='Full name'
                    style={styles.input}
                    onChangeText={(firstName) => setFullName(firstName)}
                    autoCorrect={false}
                />
            </View>
            <View style={styles.inputSelect}>
                <Feather name="search" size={26} color="black" />
                <SelectList setSelected={(val) => setAllergy(val)} data={allergyList}
                    save="value"
                    placeholder="Select Allergy"
                    search={false}
                    boxStyles={{ width: 200, borderWidth: 0, marginLeft: -15, alignItems: 'center' }}
                    dropdownStyles={{ borderWidth: 0, marginTop: -15 }}
                    inputStyles={{ fontSize: 18, color: 'gray' }} />
            </View>

            <View style={styles.inputContainer}>
                <Feather name="mail" size={30} color="black" />
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputContainer}>
                <Feather name="lock" size={30} color="black" />
                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    autoCorrect={false}
                />
            </View>

            <TouchableOpacity
                onPress={() => registerUser(email, password, fullName, allergy)}
                style={styles.buttonStart}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
            <Text style={styles.buttonTextHeading} onPress={() => navigation.navigate("Login")}>Already a user? <Text style={styles.subheading}>Login here</Text></Text>
        </SafeAreaView>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: '700',
        color: '#F18404',
        letterSpacing: 2,
        textAlign: 'center',
    },
    inputSelect: {
        marginTop: 20,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#EAEAEA",
        paddingHorizontal: 10,
        paddingVertical: 5,
        gap: 10,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
    },
    inputContainer: {
        marginTop: 20,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#EAEAEA",
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 10,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
    },
    input: {
        fontSize: 16,
    },
    buttonStart: {
        marginVertical: 20,
        backgroundColor: '#F18404',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextHeading: {
        alignSelf: 'center',
        fontSize: 14,
    },
    subheading: {
        fontSize: 18,
        fontWeight: '700',
        color: '#F18404',
    },
});

