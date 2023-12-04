import React, { useState, useEffect } from 'react'; // Import React and the necessary hooks
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native'; // Import components from React Native

import { firebase } from '../services/config'; // Import Firebase configuration
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation

import { MaterialIcons, AntDesign } from '@expo/vector-icons'; // Import icons from Expo vector icons

const Profile = () => {
    // Initialize navigation
    const navigation = useNavigation();

    // State variable to store the user's name
    const [name, setName] = useState("");

    // Fetch the user's name from Firestore when the component mounts
    useEffect(() => {
        firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    // If the user exists, set the 'name' state variable to the user's name
                    setName(snapshot.data());
                }
            });
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topLayer} />
            <View style={styles.bottomLayer} >

            </View>
            <View style={styles.profileContainer}>
                <View style={{ height: 100, width: 100, borderColor: '#F18404', borderWidth: 4, borderRadius: 100, alignItems: 'center', justifyContent: 'center', }} >
                    <AntDesign name="user" size={50} color="gray" />
                </View>
                <Text style={styles.profileName}>
                    {name.fullName}
                </Text>
                <Text style={styles.emailName}>{name.email}</Text>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate("Setting")}
                    ><AntDesign name="setting" size={24} color="white" />
                        <Text style={styles.buttonText}> Setting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => firebase.auth().signOut()} style={styles.buttonStart}
                    ><MaterialIcons name="logout" size={24} color="white" />
                        <Text style={styles.buttonText}> Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topLayer: {
        backgroundColor: '#F18404',
        flex: 1.5
    },
    bottomLayer: {
        flex: 3,
        backgroundColor: 'white',
    },
    profileContainer: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 4,
        borderRadius: 30,
        borderColor: '#F18404',
        elevation: 20,
        height: '35%',
        width: '85%',
        top: '5%',
    },
    profileName: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 25,
    },
    emailName: {
        fontSize: 18,
        fontStyle: 'italic'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    buttonStart: {
        marginTop: 10,
        backgroundColor: '#F18404',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        elevation: 5,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});

