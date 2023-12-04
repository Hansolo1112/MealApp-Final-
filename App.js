import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from './services/config';

import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Register from './screens/Register';
import Tabs from './tabs';

import Setting from './components/Setting';
import AddScreen from './components/AddScreen';
import RecipeDetails from './components/RecipeDetails';
import CreatedRecipe from './components/CreatedRecipe';
import SaveDetails from './components/SaveDetails';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // handle user state changes 
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
      <Stack.Screen name="Add Recipe" component={AddScreen} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen options={{ headerShown: false }} name="Recipe Detail" component={RecipeDetails} />
      <Stack.Screen options={{ headerShown: false }} name="Save Detail" component={SaveDetails} />
      <Stack.Screen options={{ headerShown: false }} name="Created Recipe" component={CreatedRecipe} />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}
