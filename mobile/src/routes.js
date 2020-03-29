import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Incidents from "./pages/incidents";
import Details from "./pages/details";

const AppStack = createStackNavigator();

export default function routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Screen name='Incidents' component={Incidents} />
        <AppStack.Screen name='Detail' component={Details} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
