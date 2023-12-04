import React, { useState, useEffect } from 'react'; // Import React and the necessary hooks
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'; // Import components from React Native

import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { collection, query, where, onSnapshot } from 'firebase/firestore'; // Import Firestore-related functions from Firebase

import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo vector icons
import { db, firebase } from '../services/config'; // Import Firebase configuration

const Create = () => {
    // Initialize navigation
    const navigation = useNavigation()
    // State to hold the user's food recipes
    const [foodrecipe, setFoodrecipe] = useState([]);
    // Use an effect to fetch the user's food recipes when the component mounts
    useEffect(() => {
        // Get the current user
        const user = firebase.auth().currentUser;

        if (user) {
            const userUid = user.uid;
            // Reference to the 'food_recipe' collection
            const foodCollection = collection(db, 'food_recipe');
            // Create a query to fetch recipes published by the current user
            const userQuery = query(foodCollection, where('published', '==', userUid));
            // Subscribe to changes in the user's recipes
            const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
                // Map the query snapshot to extract recipe data
                const updatedData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                // Update the foodrecipe state with the user's recipes
                setFoodrecipe(updatedData);
            });
            return () => {
                // Unsubscribe from the snapshot listener when the component unmounts
                unsubscribe();
            };
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.upperLayer}>
                <TouchableOpacity style={styles.buttonStart} onPress={() => navigation.navigate("Add Recipe")}>
                    <Ionicons name="ios-add-circle" size={35} color={'#F18404'} />
                    <Text style={styles.buttonText}>Add Recipe?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomLayer}>
                <ScrollView style={styles.body}>
                    {foodrecipe.map((recipe) => (
                        <TouchableOpacity style={styles.buttonContainer} key={recipe.id} onPress={() => navigation.navigate('Created Recipe', { recipe })}>
                            <Text style={styles.subText}>{recipe.data.food_name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default Create;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        paddingHorizontal: 20
    },

    upperLayer: {
        flex: 1,
        width: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomLayer: {
        flex: 8,
        width: '100%',
    },

    buttonStart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 70,
        borderWidth: 2,
        borderColor: '#F18404',
        borderRadius: 15,
        margin: 10,
    },

    buttonText: {
        color: '#F18404',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subText: {
        fontSize: 20,
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        borderWidth: 2,
        borderColor: '#F18404',
        borderRadius: 15,
        marginBottom: 15,
        backgroundColor: '#f79216',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
});

