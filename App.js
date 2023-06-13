import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import {ActivityIndicator} from 'react-native'
import GetStarted from './screens/getStarted';
import Home from './screens/Home';
import OrderScreen from './screens/Order';
import ShoeScreen from './screens/Shoe';
import ExploreScreen from './screens/ExploreScreen';
import Navigation from './components/Navigation';
import Layout from './components/Layout';
import BottomTabs from './components/Layout';
import { useScreens } from 'react-native-screens'
import { ContextProvider } from './components/context';

console.log(useScreens)
const Stack = createNativeStackNavigator()

// function Sphere(props) {
//   const meshRef = useRef()

//   useFrame((state, delta) => {
//     meshRef.current.rotation.y += delta
//     meshRef.current.rotation.x += delta
//   })
  
//   return (
//     <mesh 
//       ref={meshRef}
//       {...props}
//     >
//       <boxGeometry />
//       <meshStandardMaterial color={'orange'} />
//     </mesh>
//   )
// }

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
          component={GetStarted}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='Home'
          component={Layout}
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
// const MainStack = () => {
//   return (
//     <Stack.Navigator 
//       initialRouteName='/'
//       screenOptions={{
//         gestureEnabled: true,
//         gestureDirection: 'horizontal',
//         animation:'slide_from_right'
//       }}
//     >
//       <Stack.Screen 
//         name='/'
//         component={GetStarted}
//         options={{
//           headerShown: false
//         }}
//       />
//       <Stack.Screen 
//         name='Home'
//         component={Home}
//         options={{
//           headerShown: false
//         }}
//       />
//       <Stack.Screen 
//         name='Explore'
//         component={ExploreScreen}
//         options={{
//           headerShown: false
//         }}
//       />

//     </Stack.Navigator>
//   )
// }


export default function App(props) {
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

// export default function App(props) {
//   console.log(props)
//   return (
//     <>
//       <NavigationContainer>
//         <MainStack />
//       </NavigationContainer>    
//       <Navigation />
//     </>
//   )
// }

