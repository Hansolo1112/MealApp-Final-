import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native"; // Import components from React Native
import React, { useState, useEffect } from "react"; // Import React and necessary hooks

import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook from React Navigation
import { firebase } from '../services/config'; // Import Firebase configuration
import { collection, doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore'; // Import Firestore functions

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const RecipeDetails = () => {

    const navigation = useNavigation();
    // Get the route and extract the 'recipe' parameter from the route
    const route = useRoute();
    const { recipe } = route.params;

    // Get the current user from Firebase authentication
    const currentUser = firebase.auth().currentUser;

    // Initialize a state variable to track whether the recipe is saved by the user
    const [isSaved, setIsSaved] = useState(false);

    // Check if the recipe is saved by the current user
    useEffect(() => {
        if (currentUser) {
            // Get a reference to the user's document
            const userRef = doc(collection(firebase.firestore(), 'users'), currentUser.uid);

            // Get a reference to the recipe document within the user's 'savedRecipes'
            const recipeRef = doc(userRef, 'savedRecipes', recipe.id);

            // Check if the recipe exists in the user's saved recipes
            getDoc(recipeRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        setIsSaved(true);
                    }
                })
                .catch((error) => {
                    console.error('Error checking saved recipe:', error);
                });
        }
    }, [currentUser, recipe]);

    // Function to save the recipe to the user's saved recipes
    const saveRecipe = () => {
        if (currentUser) {
            // Get a reference to the user's document
            const userRef = doc(collection(firebase.firestore(), 'users'), currentUser.uid);

            // Get a reference to the recipe document within the user's 'savedRecipes'
            const recipeRef = doc(userRef, 'savedRecipes', recipe.id);

            // Set the document to indicate the recipe is saved with a timestamp
            setDoc(recipeRef, { savedAt: firebase.firestore.FieldValue.serverTimestamp() })
                .then(() => {
                    setIsSaved(true);
                    console.log('Recipe saved successfully.');
                })
                .catch((error) => {
                    console.error('Error saving recipe:', error);
                });
        }
    };

    // Function to remove the recipe from the user's saved recipes
    const removeSavedRecipe = () => {
        if (currentUser) {
            // Get a reference to the user's document
            const userRef = doc(collection(firebase.firestore(), 'users'), currentUser.uid);

            // Get a reference to the recipe document within the user's 'savedRecipes'
            const recipeRef = doc(userRef, 'savedRecipes', recipe.id);

            // Delete the recipe document from the user's saved recipes
            deleteDoc(recipeRef)
                .then(() => {
                    setIsSaved(false);
                    console.log('Recipe removed from saved recipes.');
                })
                .catch((error) => {
                    console.error('Error removing saved recipe:', error);
                });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={40} color="black" />
                </TouchableOpacity>

                {isSaved ? (
                    <TouchableOpacity style={styles.backButton} onPress={removeSavedRecipe}>
                        <Ionicons name="heart-sharp" size={40} color="black" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.backButton} onPress={saveRecipe}>
                        <Ionicons name="heart-outline" size={40} color="black" />
                    </TouchableOpacity>
                )}
            </View>
            <Image style={styles.imageContainer} source={{ uri: recipe.data.imageUrl }} resizeMode="cover" />
            <View style={styles.body}>
                <View style={styles.bodySubContainer}>
                    <Text style={styles.recipeName}>{recipe.data.food_name}</Text>
                    <View style={styles.recipeDetails}>
                        <Text style={styles.sectionText}>
                            {recipe.data.category}
                        </Text>
                        <View style={styles.divider} />
                        <Text style={styles.sectionText}>
                            {recipe.data.meal}
                        </Text>
                        <View style={styles.divider} />
                        <Text style={styles.sectionText}>
                            {recipe.data.time_cook}
                        </Text>
                    </View>
                </View>
                <ScrollView style={styles.ScrollView}>
                    <View style={styles.bodyContainer}>
                        <Text style={styles.subHeaderText}>Description</Text>
                        <Text style={styles.textDescription}>{recipe.data.description}</Text>
                        <Text style={styles.subHeaderText}>Ingredients</Text>
                        <Text style={styles.textIngredients}>{recipe.data.ingredient}</Text>
                        <Text style={styles.subHeaderText}>Direction to cook</Text>
                        <Text style={styles.subText}>{recipe.data.direction}</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};



export default RecipeDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    ScrollView: {
        width: '100%'
    },
    header: {
        flex: 2,
        backgroundColor: '#f79216',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    body: {
        flex: 6,
        width: '100%',
        alignItems: 'center',
    },
    backButton: {
        marginHorizontal: 20,
        marginTop: 40,
    },
    imageContainer: {
        height: 320,
        width: 320,
        position: 'absolute',
        bottom: '55%',
        borderRadius: 160,
    },
    recipeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
    },
    bodySubContainer: {
        marginTop: 175,
        marginBottom: 10,
    },
    recipeDetails: {
        flexDirection: "row",
        gap: 10,
        alignItems: 'center'
    },
    sectionText: {
        fontSize: 18,
    },
    divider: {
        borderLeftWidth: 1,
        height: 20,
    },
    bodyContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    subHeaderText: {
        fontSize: 24,
        fontWeight: '500',
    },

    textDescription: {
        fontSize: 15,
        textAlign: 'justify',
        marginBottom: 20,
    },
    textIngredients: {
        marginBottom: 20,
        fontSize: 15,
    },
    subText: {
        marginBottom: 100,
        fontSize: 15,
        textAlign: 'justify',
    }
});
