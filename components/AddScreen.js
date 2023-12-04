import React, { useState } from 'react'; // Import React and useState
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'; // Import components from React Native

import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook from React Navigation
import { db, firebase } from '../services/config'; // Import Firebase configuration
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage'; // Import Firebase Storage functions
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import Firestore functions
import * as ImagePicker from 'expo-image-picker'; // Import the ImagePicker module from Expo
import { SelectList } from 'react-native-dropdown-select-list'; // Import SelectList component

import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo vector icons

const AddScreen = () => {
    // Initialize navigation
    const navigation = useNavigation();

    // Meal time options
    const meal_time = [
        { key: '1', value: 'Breakfast' },
        { key: '2', value: 'Brunch' },
        { key: '3', value: 'Lunch' },
        { key: '4', value: 'Meryenda' },
        { key: '5', value: 'Dinner' },
    ];

    // Cooking time options
    const time = [
        { key: '1', value: '30 Mins' },
        { key: '2', value: '1 Hr' },
        { key: '3', value: '1 Hr 30 Mins' },
        { key: '4', value: '2 Hrs' },
        { key: '5', value: '2 Hrs 30 Mins' },
        { key: '6', value: '3 Hrs' },
    ];

    // Recipe categories
    const categories = [
        { key: '1', value: 'Meat' },
        { key: '2', value: 'Seafood' },
        { key: '3', value: 'Poultry' },
        { key: '4', value: 'Dairy' },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Grains' },
        { key: '7', value: 'Nuts' },
        { key: '8', value: 'Dessert' },
        { key: '9', value: 'Alcoholic' },
    ];

    // State variables for recipe information
    const [food_name, setFood_name] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [direction, setDirection] = useState('');
    const [time_cook, setTime_cook] = useState('');
    const [meal, setMeal] = useState('');

    // State variable for the selected image
    const [imageUri, setImageUri] = useState(null);

    // Function to pick an image from the device's library
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    // Function to add a new recipe
    const addRecipe = async () => {
        if (!food_name || !category || !description || !ingredient || !direction || !time_cook || !imageUri || !meal) {
            alert('Please fill in all the required fields and select an image for the recipe.');
            return;
        }
        try {
            if (!imageUri) {
                alert('Please select an image for the recipe.');
                return;
            }
            const newDocRef = collection(db, 'food_recipe');
            // Initialize Firebase Storage for image upload
            const storage = getStorage();
            const imageFileName = new Date().getTime() + '.jpg';
            const storageRef = ref(storage, 'images/' + imageFileName);

            // Fetch and upload the selected image
            const response = await fetch(imageUri);
            const blob = await response.blob();
            await uploadBytes(storageRef, blob);

            // Get the image download URL
            const imageUrl = await getDownloadURL(storageRef);

            // Add the recipe to Firestore
            await addDoc(newDocRef, {
                published: firebase.auth().currentUser.uid,
                food_name,
                category,
                description,
                ingredient,
                direction,
                time_cook,
                date: serverTimestamp(),
                imageUrl,
                meal
            });
            alert('Recipe Added!');
            navigation.navigate('Create');
        } catch (error) {
            console.error('Error adding recipe: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.imageContainer} />
                )}

                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.inputButton} onPress={pickImage}>
                        <Ionicons name="images-outline" size={20} color={'#F18404'} />
                        <Text style={styles.imageText}>Add Recipe Image</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Recipe Name</Text>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        placeholder="Recipe Name"
                        onChangeText={(food_name) => setFood_name(food_name)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Meal time</Text>
                    <SelectList
                        boxStyles={{
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: '#F18404',
                            paddingHorizontal: 8,
                        }}
                        inputStyles={{ fontSize: 15 }}
                        setSelected={(val) => setMeal(val)}
                        data={meal_time}
                        save="value"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.inputHeight]}
                        placeholder="Description"
                        multiline
                        numberOfLines={4}
                        autoCorrect={false}
                        onChangeText={(description) => setDescription(description)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>category</Text>
                    <SelectList
                        boxStyles={{
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: '#F18404',
                            paddingHorizontal: 8,
                        }}
                        inputStyles={{ fontSize: 15 }}
                        setSelected={(val) => setCategory(val)}
                        data={categories}
                        save="value"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Ingredient</Text>
                    <Text style={styles.subinputText}>* Enter the ingredient separated by enter *</Text>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        multiline
                        placeholder="Ingredients"
                        onChangeText={(ingredient) => setIngredient(ingredient)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Direction</Text>
                    <Text style={styles.subinputText}>* Enter the direction separated by enter *</Text>
                    <TextInput
                        style={styles.input}
                        autoCorrect={false}
                        multiline
                        placeholder="Direction"
                        onChangeText={(direction) => setDirection(direction)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Time to cook</Text>
                    <SelectList
                        boxStyles={{
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: '#F18404',
                            paddingHorizontal: 8,
                        }}
                        inputStyles={{ fontSize: 15 }}
                        setSelected={(val) => setTime_cook(val)}
                        data={time}
                        save="value"
                    />
                </View>

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={addRecipe}
                >
                    <Text style={styles.buttonText}>Save Recipe</Text>
                </TouchableOpacity>
                <View style={styles.whiteSpace} />

            </ScrollView >
        </View >
    );
};

export default AddScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 20, // Use an absolute value (pixels) for padding
        width: '100%',
    },
    imageContainer: {
        borderRadius: 15,
        width: '100%',
        height: '20%', // Use an absolute value (pixels) for height
    },
    imageText: {
        color: '#F18404',
        fontSize: 15,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    inputText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
    },
    subinputText: {
        fontSize: 15,
        fontStyle: 'italic',
        marginBottom: 10,
        marginTop: -5,
        color: '#dc143c',
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#F18404',
        width: '100%',
        padding: 10,
        fontSize: 16,
    },
    inputButton: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#F18404',
        width: '100%',
        padding: 10,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        marginTop: 20
    },
    inputHeight: {
        textAlignVertical: 'top',
    },
    buttonContainer: {
        backgroundColor: '#F18404',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 15,
        marginBottom: 100, // Use an absolute value (pixels) for margin
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    whiteSpace: {
        marginBottom: 500, // Use an absolute value (pixels) for margin
    },
});  
