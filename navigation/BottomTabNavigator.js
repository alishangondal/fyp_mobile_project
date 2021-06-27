import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ScreenChooser from "../screens/ScreenChooser";
import CategoryScreen from "../screens/CategoryScreen";
import ChiefScreen from "../screens/ChiefScreen";
import SearchScreen from "../screens/SearchScreen";
import PopularScreen from "../screens/PopularScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerShown: getHeaderTitle(route) === "Profile" ? false : true,
  });
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" type="Entypo" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Popular"
        component={PopularScreen}
        options={{
          title: "Popular",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name="fire"
              type="material-community"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="search" type="feather" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Chief"
        component={ChiefScreen}
        options={{
          title: "Chief",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name="chef-hat"
              type="material-community"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          title: "Category",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              name="food"
              type="material-community"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ScreenChooser}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="profile" type="antdesign" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case "Home":
      return "Recipes";
    case "Profile":
      return "Profile";
    case "Chief":
      return "All Chief's";
    case "Category":
      return "Category";
    case "Search":
      return "Search";
    case "Popular":
      return "Popular";
  }
}
