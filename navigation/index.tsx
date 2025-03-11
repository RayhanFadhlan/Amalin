import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ZakatScreen from '../screens/ZakatScreen';
import ZakatCalculatorScreen from '../screens/ZakatCalculatorScreen';
import ZakatMalScreen from '../screens/ZakatMalScreen';
import ZakatFitrahScreen from '../screens/ZakatFitrahScreen';
import { View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Zakat"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Zakat" 
          component={ZakatScreen} 
          options={{ title: 'Zakat' }} 
        />
        <Stack.Screen 
          name="ZakatCalculator" 
          component={ZakatCalculatorScreen} 
          options={{ title: 'Kalkulator Zakat' }} 
        />
        <Stack.Screen 
          name="ZakatMal" 
          component={ZakatMalScreen} 
          options={{ title: 'Zakat Mal' }} 
        />
        <Stack.Screen 
          name="ZakatFitrah" 
          component={ZakatFitrahScreen} 
          options={{ title: 'Zakat Fitrah' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}