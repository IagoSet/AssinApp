import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import GerenciarAssinaturas from './screens/ControleAssinaturas';
import AssinaturasRecentes from './screens/AssinaturasAtuais';
import TodasAssinaturas from './screens/TodasAssinaturas';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/IconButton';
import AuthProvider from './src/auth-contexto';
import ApararAssinaturas from './screens/ApararAssinaturas';

export default function App() {
  const Tab = createBottomTabNavigator();

  function BottonTabScreen() {
    return (
      <Tab.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: '#111827' },
          headerTintColor: '#F9FAFB',
          tabBarActiveTintColor: '#06B6D4',
          tabBarInactiveTintColor: '#94A3B8',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
          tabBarStyle: { backgroundColor: '#1F2937', paddingBottom: 4 },
          headerRight: () => (
            <IconButton
              icon="add-circle-outline"
              size={26}
              color="#06B6D4"
              onPress={() => navigation.navigate('GerenciarAssinaturas')}
            />
          ),
        })}
      >
        <Tab.Screen
          name="AssinaturasRecentes"
          component={AssinaturasRecentes}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
            tabBarLabel: 'Recentes',
            title: 'Assinaturas Recentes',
            tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
          }}
        />
        <Tab.Screen
          name="TodasAssinaturas"
          component={TodasAssinaturas}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-circle-outline" size={size} color={color} />
            ),
            tabBarLabel: 'Todas',
            title: 'Todas as Assinaturas',
            tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
          }}
        />
      </Tab.Navigator>
    );
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Assinaturas"
            component={BottonTabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ApararAssinaturas"
            component={ApararAssinaturas}
            options={{
            title: 'Aparar Assinaturas',
            headerStyle: { backgroundColor: '#111827' },
            headerTintColor: '#F9FAFB',
            headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen
            name="GerenciarAssinaturas"
            component={GerenciarAssinaturas}
            options={{
              title: 'Nova Assinatura',
              headerStyle: { backgroundColor: '#111827' },
              headerTintColor: '#F9FAFB',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // azul escuro
    alignItems: 'center',
    justifyContent: 'center',
  },
});
