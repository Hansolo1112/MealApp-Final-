import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Favorite from "./screens/Favorite";
import Create from "./screens/Create";

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                lazyLoad: true,
                tabBarStyle: [{
                    position: 'absolute',
                    height: 80, // Set the desired height
                    paddingHorizontal: 20,
                },],
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome name="home" size={40} color={focused ? '#F18404' : '#CBCBCB'} />
                    ),
                }}
            />

            <Tab.Screen
                name="Create"
                component={Create}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="ios-add-circle" size={35} color={focused ? '#F18404' : '#CBCBCB'} />
                    ),
                }}
            />

            <Tab.Screen
                name="Favorite"
                component={Favorite}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome name="heart" size={30} color={focused ? '#F18404' : '#CBCBCB'} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5 name="user-alt" size={30} color={focused ? '#F18404' : '#CBCBCB'} />
                    ),
                }}
            />
        </Tab.Navigator>

    );
};