import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ZakatScreen from '../screens/ZakatScreen';
import ZakatCalculatorScreen from '../screens/ZakatCalculatorScreen';
import ZakatMalScreen from '../screens/ZakatMalScreen';
import ZakatFitrahScreen from '../screens/ZakatFitrahScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DoaScreen from '../screens/DoaScreen';
import CreateDoaScreen from '../screens/CreateDoaScreen';
import MyDoasScreen from '../screens/MyDoasScreen';
import Colors from '../constants/Colors';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  // Check if user is authenticated
  const isAuthenticated = false; // This would normally come from your auth state

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Zakat' : 'Login'}
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
        {/* Auth Screens */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* Main Screens */}
        <Stack.Screen 
          name="Zakat" 
          component={ZakatScreen} 
          options={{ 
            title: 'Zakat',
            headerShown: false,
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
        
        {/* Doa Screens */}
        <Stack.Screen 
          name="Doa" 
          component={DoaScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CreateDoa" 
          component={CreateDoaScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MyDoas" 
          component={MyDoasScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}