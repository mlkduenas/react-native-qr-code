import { createNativeStackNavigator }
    from '@react-navigation/native-stack'
import { NavigationContainer, StackActions }
    from '@react-navigation/native'
import Home from '../screens/Home'
import Scanner from '../screens/Scanner'

const Stack = createNativeStackNavigator()
function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options ={{ headerTitle: 'QR Code Scanner'}} />
            <Stack.Screen 
                name="Scanner" 
                component={Scanner} 
                options ={{ presentation: 'modal' }} />
        </Stack.Navigator>
    )
}
export default function Navigation() {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}