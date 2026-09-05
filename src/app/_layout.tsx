import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function RootLayoutNav() {
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const CustomBackButton = () => (
    <TouchableOpacity 
      onPress={() => router.replace('/')} 
      style={{ 
        marginLeft: 20, 
        padding: 5,     
      }}
    >
      <Ionicons 
        name="arrow-back" 
        size={24} 
        color={isDark ? "#fff" : "#000"} 
      /> 
    </TouchableOpacity>
  );

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.background, 
        },
        headerTintColor: theme.text,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          title: '', 
          headerLeft: () => <CustomBackButton /> 
        }} 
      />
      <Stack.Screen 
        name="signup" 
        options={{ 
          title: '', 
          headerLeft: () => <CustomBackButton /> 
        }} 
      />
      <Stack.Screen 
        name="home" 
        options={{ 
          title: 'My Notes', 
          headerLeft: () => null, 
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
        }} 
      />
    </Stack>
  );
}
export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}