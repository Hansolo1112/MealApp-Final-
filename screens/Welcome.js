import React from "react"; // Import React
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, SafeAreaView } from "react-native"; // Import components from React Native

import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation

import welcome from '../assets/images/welcome.png'; // Import the 'welcome' image from the assets

const Welcome = () => {
    // Initialize navigation
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.imgContainer} source={welcome} resizeMode="cover" />
            <View style={styles.buttonContainer}>
                <Text style={styles.textContainer}>
                    <Text style={styles.heading}>Meet<Text style={styles.primaryColor}> Meal Planner</Text>{'\n'}Savor. <Text style={styles.primaryColor}>Repeat.</Text></Text>
                    <Text style={styles.subheading}>{'\n'}Fueling Your Wellness Journey, One Meal at a Time!</Text>
                </Text>
                <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonText}>Welcome</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        flex: 4.5,
        width: '100%',
    },
    buttonContainer: {
        alignItems: 'center',
        flex: 2,
        width: '100%',
    },
    textContainer: {
        width: '80%',
        maxWidth: 400,
        alignItems: 'center',
    },
    heading: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
    },
    subheading: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
    },
    primaryColor: {
        color: '#F18404',
    },
    buttonStart: {
        marginTop: 20,
        backgroundColor: '#F18404',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
});

