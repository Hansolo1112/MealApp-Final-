import React, { useEffect, useState } from 'react'; // Import React and hooks
import { StyleSheet, StatusBar, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'; // Import components from React Native

import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { firebase } from '../services/config'; // Import Firebase configuration
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore'; // Import Firestore related functions

import { Entypo } from '@expo/vector-icons'; // Import icons from Expo vector icons

const Favorite = () => {
    // Initialize navigation
    const navigation = useNavigation()

    // Get the current user from Firebase authentication
    const currentUser = firebase.auth().currentUser;

    // Initialize state variables to store the list of saved recipe IDs and the corresponding recipe data
    const [savedRecipeIds, setSavedRecipeIds] = useState([]);
    const [recipes, setRecipes] = useState([]);

    // Add a real-time listener to fetch user's saved recipes
    useEffect(() => {
        if (currentUser) {
            const userRef = doc(collection(firebase.firestore(), 'users'), currentUser.uid);

            // Add an onSnapshot listener to get real-time updates
            const unsubscribe = onSnapshot(collection(userRef, 'savedRecipes'), (querySnapshot) => {
                const savedIds = querySnapshot.docs.map((doc) => doc.id);
                setSavedRecipeIds(savedIds);
            });

            return () => {
                // Unsubscribe from the listener when the component unmounts
                unsubscribe();
            };
        }
    }, [currentUser]);

    useEffect(() => {
        // Fetch all recipe data
        const fetchRecipes = async () => {
            try {
                const foodCollection = collection(firebase.firestore(), 'food_recipe');
                const querySnapshot = await getDocs(foodCollection);

                const recipeData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                setRecipes(recipeData);
            } catch (error) {
                console.error('Error fetching recipe data:', error);
            }
        };

        fetchRecipes();
    }, []);

    const savedRecipes = recipes.filter((recipe) => savedRecipeIds.includes(recipe.id));


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.body}>
                <Text style={styles.headerBodyText}>Save Recipes</Text>
                <View style={styles.bodyContainer}>
                    {savedRecipes.map((recipe) => (
                        <TouchableOpacity key={recipe.id} style={styles.itemContainer} onPress={() => navigation.navigate('Save Detail', { recipe })}>
                            <Image style={styles.foodImage} source={{ uri: recipe.data.imageUrl }} resizeMode="cover" />
                            <Text style={styles.headerText}>{recipe.data.food_name}</Text>
                            <Text style={styles.subText}>{recipe.data.meal}</Text>
                            <View style={styles.details}>
                                <Entypo name="time-slot" size={20} color="black" />
                                <Text style={styles.subText}>{recipe.data.time_cook}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <View style={styles.itemContainerShadow} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Favorite;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    body: {
        padding: 20,
    },
    headerBodyText: {
        fontSize: 30,
        fontWeight: '700',
        paddingHorizontal: 10
    },

    bodyContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },

    itemContainer: {
        flexDirection: 'column',
        width: '45%',
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#F18404',
        padding: 20,
        borderRadius: 20,
        gap: 10,
    },

    itemContainerShadow: {
        width: '45%',
        height: 250,
    },

    foodImage: {
        borderRadius: 10,
        width: '100%',
        height: '50%',
    },

    headerText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
    },

    subText: {
        fontSize: 16,
    },

    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },

    whiteSpace: {
        marginBottom: 150,
    },
});

