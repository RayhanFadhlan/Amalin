import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ZakatScreen from '../screens/ZakatScreen';
import ZakatCalculatorScreen from '../screens/ZakatCalculatorScreen';
import ZakatMalScreen from '../screens/ZakatMalScreen';
import ZakatFitrahScreen from '../screens/ZakatFitrahScreen';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Zakat"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: Colors.light.background,
          },
        }}
      >
        <Stack.Screen 
          name="Zakat" 
          component={ZakatScreen} 
          options={{ 
            title: 'Zakat',
            headerLargeTitle: true,
          }} 
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