import React from "react"; // Import React
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from "react-native"; // Import components from React Native

import { useRoute } from '@react-navigation/native'; // Import the useRoute hook from React Navigation
import { deleteDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { db } from "../services/config"; // Import Firebase configuration
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook from React Navigation

import { Feather } from '@expo/vector-icons';

const CreatedRecipe = () => {
    // Initialize navigation
    const navigation = useNavigation()

    // Get the current route and extract the "recipe" parameter from route.params
    const route = useRoute();
    const { recipe } = route.params;

    // Function to handle the deletion of a recipe
    const handleDeleteRecipe = async () => {
        try {
            // Delete the recipe document from Firestore using its ID
            await deleteDoc(doc(db, 'food_recipe', recipe.id));
            console.log(`Recipe with ID ${recipe.id} deleted successfully.`);
            // Navigate back to the previous screen or a different screen
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left-circle" size={40} color="black" />
                </TouchableOpacity>
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
                <ScrollView>
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

export default CreatedRecipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
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