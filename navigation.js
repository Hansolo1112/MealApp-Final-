import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SettingScreen from "./components/Setting";
import AddScreen from "./components/AddScreen";
import RecipeDetails from "./components/RecipeDetails";
import CreatedRecipe from "./components/CreatedRecipe";
import Create from "./screens/Create";
import SaveDetails from "./components/SaveDetails";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Create" component={Create} />
            <Stack.Screen name="Add Recipe" component={AddScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="Recipe Details" component={RecipeDetails} />
            <Stack.Screen name="Created Recipe" component={CreatedRecipe} />
            <Stack.Screen name="Save Detail" component={SaveDetails} />
        </Stack.Navigator>
    );
};
