import React, { useState, useEffect } from "react"; // Import React and hooks
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, ScrollView, Image, TextInput, SafeAreaView } from "react-native"; // Import components from React Native

import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { collection, getDocs, onSnapshot } from 'firebase/firestore'; // Import Firestore related functions
import { db, firebase } from "../services/config"; // Import Firebase configuration

import { Entypo } from '@expo/vector-icons'; // Import icons from Expo vector icons
import { AntDesign } from '@expo/vector-icons'; // Import more icons from Expo vector icons


const Home = () => {
    // Initialize navigation
    const navigation = useNavigation();

    // List of food categories for filtering
    const foodCategory = [
        { id: 1, title: 'All' },
        { id: 2, title: 'Meat' },
        { id: 3, title: 'Seafood' },
        { id: 4, title: 'Poultry' },
        { id: 5, title: 'Dairy' },
        { id: 6, title: 'Vegetables' },
        { id: 7, title: 'Grains' },
        { id: 8, title: 'Nuts' },
        { id: 9, title: 'Dessert' },
        { id: 10, title: 'Alcoholic' }
    ];

    // State variables for selected category, food recipes, search text, and user's allergy data
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [foodrecipe, setFoodrecipe] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [userAllergyData, setUserAllergyData] = useState([]);

    useEffect(() => {
        // It fetches the user's allergy data from Firestore.
        firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    // Set the user's allergy data to userAllergyData
                    setUserAllergyData(snapshot.data().allergy || []); // Use allergy data if it exists, otherwise, use an empty array
                } else {
                    console.log("User does not exist"); // Log a message if the user does not exist
                }
            });
    }, []);

    useEffect(() => {
        // Define a function to fetch and filter recipes
        const fetchRecipes = async () => {
            try {
                // Get a reference to the 'food_recipe' collection
                const foodCollection = collection(db, 'food_recipe');
                // Fetch the initial data from the Firestore collection
                const querySnapshot = await getDocs(foodCollection);
                // Map the fetched documents to an array of objects containing 'id' and 'data'
                const initialData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }));

                // Filter the initial data based on selectedCategory, searchText, and userAllergyData
                const filteredData = initialData.filter((recipe) => {
                    const categoryMatch = selectedCategory === 'All' || recipe.data.category === selectedCategory;
                    const nameMatch = recipe.data.food_name.toLowerCase().includes(searchText.toLowerCase());

                    // Check if the recipe's category is in the user's allergies
                    if (userAllergyData.length > 0) {
                        const isAllergyCategory = userAllergyData.includes(recipe.data.category);

                        if (isAllergyCategory) {
                            // Exclude the recipe if it's in the user's allergies
                            return false;
                        }
                    }
                    return categoryMatch && nameMatch;
                });
                // Set the filtered data as the initial value for 'foodrecipe'
                setFoodrecipe(filteredData);

                // Subscribe to updates in the Firestore collection
                const unsubscribe = onSnapshot(foodCollection, (querySnapshot) => {
                    // Map the updated documents to an array of objects containing 'id' and 'data'
                    const updatedData = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }));

                    // Filter the updated data based on the same criteria as above
                    const updatedFilteredData = updatedData.filter((recipe) => {
                        const categoryMatch = selectedCategory === 'All' || recipe.data.category === selectedCategory;
                        const nameMatch = recipe.data.food_name.toLowerCase().includes(searchText.toLowerCase());

                        // Check if the recipe's category is in the user's allergies
                        if (userAllergyData.length > 0) {
                            const isAllergyCategory = userAllergyData.includes(recipe.data.category);
                            if (isAllergyCategory) {
                                // Exclude the recipe if it's in the user's allergies
                                return false;
                            }
                        }
                        return categoryMatch && nameMatch;
                    });
                    // Set the updated and filtered data as the new value for 'foodrecipe'
                    setFoodrecipe(updatedFilteredData);
                });
                // Return an unsubscribe function to clean up the listener
                return () => {
                    unsubscribe();
                };
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        // Call the fetchRecipes function initially and whenever dependencies change
        fetchRecipes();
    }, [selectedCategory, searchText, userAllergyData]);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.input} >
                    <AntDesign name="search1" size={24} color="black" />
                    <TextInput placeholder="Search Recipe" value={searchText} onChangeText={(text) => setSearchText(text)} />
                </View>
                <Text style={styles.sectionText}>Category</Text>
                <ScrollView style={styles.categoryContainer} horizontal={true}>
                    {foodCategory.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            onPress={() => setSelectedCategory(category.title)}
                            style={styles.categoryButtons}
                        >
                            <Text >
                                {category.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <ScrollView style={styles.body}>
                <Text style={styles.sectionText}>Recipe</Text>
                <View style={styles.bodyContainer}>
                    {foodrecipe.map((recipe) => (
                        <TouchableOpacity key={recipe.id} style={styles.itemContainer} onPress={() => navigation.navigate('Recipe Detail', { recipe })}>
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
                    <View style={styles.whiteSpace} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        paddingTop: 10,
        paddingHorizontal: 10,
        height: '20%',
        gap: 10,
    },

    body: {
        padding: 10,
    },

    input: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#F18404',
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    categoryContainer: {
        flexDirection: 'row',
    },

    sectionText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    categoryButtons: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#F18404',
        height: 40,
        width: 80,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f2f0',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,

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
        marginBottom: 200,
    },
});

