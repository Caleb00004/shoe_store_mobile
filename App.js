import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { useState } from 'react';
import { View, Text } from 'react-native';
import GetStarted from './screens/getStarted';
import Home from './screens/Home';
import OrderScreen from './screens/Order';
import ShoeScreen from './screens/Shoe';
import ExploreScreen from './screens/ExploreScreen';
import Profile from './screens/Profile';
import { ContextProvider } from './components/context';
import BottomNav from './components/BottomNav';
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
        tabBar={(props) => <BottomNav {...props} />}
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animation:'slide_from_right',
            tabBarStyle: {
                position: 'absolute',
                justifyContent: 'space-around',
                elevation: 10,
                borderColor: 'gray'
            },
            headerShown: false,
        }}
        backBehavior={'history'}
    >
        <Tab.Screen name="Home" component={Home} options={{tabBarIcon: <Feather name="home" size={25} color={'gray'} /> }} />
        <Tab.Screen name="Explore" component={ExploreScreen} options={{tabBarIcon: <AntDesign name="find" size={25} color={'gray'}/> }} />
        <Tab.Screen name="Order" component={OrderScreen} options={{tabBarIcon: <FontAwesome name="shopping-cart" size={25} color="grey" /> }} />
        {/* <Tab.Screen name={'shoe'} component={ShoeStack}/> */}
        {/* <Tab.Screen name='shoe' component={ShoeScreen} options={{tabBarIconStyle: { display: "none" }, tabBarShowLabel: false, tabBarStyle: {height:0, display: 'none', backgroundColor:'red'}}} /> */}
        <Tab.Screen name="profile" component={Profile} options={{tabBarIcon: <AntDesign name="user" size={25} color="grey" />}} />
    </Tab.Navigator>

  )
}

const LayoutStack = () => {
  return (

    <Stack.Navigator 
      initialRouteName='/'
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        animation:'slide_from_right'
      }}
    >
        <Stack.Screen 
          name='/'
          component={TabStack}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='shoe'
          component={ShoeScreen}
          options={{
            headerShown: false,
            animation:'slide_from_bottom'
          }}
        />
    </Stack.Navigator>
  )
}

export default function App(props) {
  const [displayStart, setDisplayStart] = useState(true)

  if(displayStart) {
    return (
      <View style={{flex: 1, margin: 0, padding: 0}}>
        {/* <StatusBar style='auto'/> */}
        <GetStarted setDisplayStart={setDisplayStart}/>
      </View>
    )
  } else {
    console.log('APPS')
    return (
      <>
        <ContextProvider>
          <NavigationContainer>
            <LayoutStack />
          </NavigationContainer>
        </ContextProvider>
      </>
    )
  }
}
