import React, { useState } from "react"; // Import React and useState hook
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TextInput, SafeAreaView } from "react-native"; // Import components from React Native

import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { firebase } from '../services/config'; // Import Firebase configuration

import { Feather } from '@expo/vector-icons'; // Import icons from Expo vector icons


const Login = () => {
    // Initialize navigation
    const navigation = useNavigation();

    // State variable to store the credentials
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Function to log in the user with email and password
    const loginUser = async (email, password) => {
        try {
            // Attempt to sign in with the provided email and password
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error) {
            // Display an alert with the error message
            alert(error.message)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>LOGIN</Text>
            <View style={styles.inputContainer}>
                <Feather name="mail" size={30} color="black" />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <View style={styles.inputContainer}>
                <Feather name="lock" size={30} color="black" />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <TouchableOpacity style={styles.buttonStart} onPress={() => loginUser(email, password)}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={styles.buttonTextHeading} onPress={() => navigation.navigate("Register")}>Don't have an account? <Text style={styles.subheading}>Sign Up here</Text></Text>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 35,
        fontWeight: '700',
        color: '#F18404',
        letterSpacing: 5,
        textAlign: 'center',
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

