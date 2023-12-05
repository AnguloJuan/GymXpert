import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <AppState>
          <AuthNavigator />
        </AppState>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
const AppState = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};