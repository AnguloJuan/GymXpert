import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';

export default function App() {
  return (
    <GluestackUIProvider>
      <NavigationContainer>
          <AuthNavigator />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}