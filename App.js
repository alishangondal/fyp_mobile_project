import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import UserContext from "./connection/userContext";
import AuthNavigation from "./navigation/AuthNavigation";
import CatScreen from "./components/ProjectComponents/Category/SpecficCategorylist";
import RecipeDetailScreen from "./screens/ItemDetailScreen/RecipeDetails";
import DisplayUserCustomizeList from "./components/ProjectComponents/Favourite/DisplayUserCustomeList";
import FoodDisplayList from "./components/ProjectComponents/foodlist";
import SearchScreen from "./screens/SearchScreen";
import { Provider } from "./Context/FoodContext";
import ChiefProfileScreen from "./components/ProjectComponents/chieflogin";
import FoodScreen from "./screens/ItemDetailScreen/Fooddetail";
import { UserLogProvider } from "./connection/userLogContext";
const Stack = createStackNavigator();

export default App = () => {
  const [loggedIn, setLoggedin] = useState();
  const value = { loggedIn, setLoggedin };
  return (
    <UserContext.Provider value={value}>
      <UserContext.Consumer>
        {({ loggedIn, setLoggedin }) => (
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <UserLogProvider>
              <Provider>
                <NavigationContainer>
                  <Stack.Navigator>
                    <Stack.Screen name="Root" component={BottomTabNavigator} />
                    <Stack.Screen
                      name="CatSpec"
                      component={CatScreen}
                      options={{ title: "Specified Category" }}
                    />
                    <Stack.Screen
                      name="RecipeDetail"
                      component={RecipeDetailScreen}
                      options={{
                        title: "Recipe Detail",
                      }}
                    />
                    <Stack.Screen name="Search" component={SearchScreen} />
                    <Stack.Screen name="Food" component={FoodScreen} />
                    <Stack.Screen
                      name="ChiefProfile"
                      component={ChiefProfileScreen}
                    />
                    <Stack.Screen
                      name="FoodDisplayList"
                      component={FoodDisplayList}
                      options={{ title: "Food List" }}
                    />
                    <Stack.Screen
                      name="DisplayList"
                      component={DisplayUserCustomizeList}
                      options={{ title: "Recipe List" }}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </Provider>
            </UserLogProvider>
          </View>
        )}
      </UserContext.Consumer>
    </UserContext.Provider>
  );
  // if (loggedIn === true) {

  // } else {
  //   return (
  //     <UserContext.Provider value={value}>
  //       <UserContext.Consumer>
  //         {({ loggedIn, setLoggedin }) => (
  //           <View style={styles.container}>
  //             {Platform.OS === "ios" && <StatusBar barStyle="default" />}
  //             <UserLogProvider>
  //               <Provider>
  //                 <NavigationContainer>
  //                   {loggedIn === true && <Text>Hello</Text>}
  //                   <AuthNavigation />
  //                 </NavigationContainer>
  //               </Provider>
  //             </UserLogProvider>
  //           </View>
  //         )}
  //       </UserContext.Consumer>
  //     </UserContext.Provider>
  //   );
  // }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
