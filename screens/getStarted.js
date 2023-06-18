import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { useLoader } from '@react-three/fiber';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader } from 'expo-three';
// import * as SplashScreen from 'expo-splash-screen';


// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

function Cone(props) {
    const coneRef = useRef()
  
    useFrame((state, delta) => {
      coneRef.current.rotation.y += delta
      coneRef.current.rotation.x -= delta
    })
  
  
    return (
      <mesh position={[0,-1.5,1]} ref={coneRef}>
        <coneGeometry/>
        <meshStandardMaterial color={'red'}/>
      </mesh>
    )  
  }

// NOT NEEDED //////////////
function Shoe(props) {
  console.log('SHOE COMPONENT')
    const shoeRef = useRef()
    const material = useLoader(MTLLoader, require('../assets/Airmax/shoe.mtl')) // loading the material of the 3d Object
    const obj = useLoader( // loading the 3D model/ object
      OBJLoader,
      require('../assets/Airmax/shoe.obj'),
      (loader) => {
        material.preload() // preloading the material to the 3D object
        loader.setMaterials(material) // setting the material to the object
      }
    )

    const [base, normal, rough] = useLoader(TextureLoader, [
      require('../assets/Airmax/textures/BaseColor.jpg'),
      require('../assets/Airmax/textures/Normal.jpg'),
      require('../assets/Airmax/textures/Roughness.png'),
    ]);
  
    useFrame((state, delta) => {
      // shoeRef.current.rotation.y += delta
      // shoeRef.current.rotation.x += 0.01
      shoeRef.current.rotation.z += delta * 1.3
      // shoeRef.current.rotation.y += delta
      // shoeRef.current.rotation.x += delta 
    })
    
    useLayoutEffect(() => {
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // props.setAppReady(true)
          child.material.map = base;
          child.material.normalMap = normal;
          child.material.roughnessMap = rough;
        }
      });
    }, [obj])
    
  
    return (
        <mesh {...props} ref={shoeRef} style={styles.shoe}>
        <primitive object={obj} scale={14}></primitive>
        </mesh>
    )
}

// NOT NEEDED ////////////
function CanvasContainer() {
  console.log('MY CANVASS')
    return (
        <Canvas style={styles.test}>
            {/* <ambientLight />  To point light to our 3d model in all directions */}
            <pointLight position={[10, 10, 10]} />
            {/* <Sphere position={[1, 2, 0]}/>
            <Sphere />
            <Cone />       */}
            {/* <Hello /> */}
            {/* <Suspense fallback={<Cone />}> */}
            <Cone />
              {/* <Shoe rotation={[1,-1,1]} /> */}
            {/* </Suspense> */}

        </Canvas>
    )  
}
  
export default function GetStarted({navigation, setDisplayStart}) {

    const [appReady, setAppReady] = useState(true)
  
    console.log(appReady)

    // const onLayoutRootView = useCallback(async () => {
    //   if (appReady) {
    //     // This tells the splash screen to hide immediately! If we call this after
    //     // `setAppIsReady`, then we may see a blank screen while the app is
    //     // loading its initial state and rendering its first pixels. So instead,
    //     // we hide the splash screen once we know the root view has already
    //     // performed layout.
    //     await SplashScreen.hideAsync();
    //   }
    // }, [appReady]);

    // if(!appReady) {
    //   return (
    //     null
    //   )
    // }

    return (
        <View style={{display:'flex', flexDirection:'column', justifyContent: 'space-around', flex:1}}>

          <View style={{paddingTop: 40, paddingLeft: 30, alignItems: 'center'}}>
            <Image 
                source={require('../assets/logo.png')}
                height={30}
                width={30}
            />
          </View>

          <Image
              source={require('../assets/Jordans_images/yellow_jordans.png')}
              style={{...styles.image }}
          />

          {/* <CanvasContainer /> */}

          <View>
            <Image 
                source={require('../assets/360.png')}
                style={{height: 50, resizeMode: 'contain', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}
            />
            <Text style={{padding: 10, fontSize: 25, textAlign: 'center'}}>Just do it with Nike</Text>
            <Text style={{color: 'grey', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' , width: '80%'}} >Get access to more than 1000 nike shoes also another brands with %20 off</Text>
            <Pressable 
              onPress={() => setDisplayStart(false)}
              style={{height: 40, width: '80%', backgroundColor: 'orange', marginLeft: 'auto', marginRight:'auto', marginBottom: 20, marginTop: 30, justifyContent: 'center', alignItems:'center'}}
              android_ripple={{color: 'grey'}}
            >
              <Text style={{color: 'white'}}>Continue</Text>
            </Pressable>
          </View>
        </View>
  )
}

const styles = StyleSheet.create({
    test: {
      flex: 1,
    },
    image: {
      height: '45%',
      width: '100%',
      resizeMode: 'contain',
      transform: [{rotateZ: "-20deg"}] 
  },
    container: {
      width: '100%',
      height: 50,
      backgroundColor: '#ebebeb',
      borderRadius: 25,
      overflow: 'hidden',
    },
    slider: {
      width: 50,
      height: 50,
      backgroundColor: '#ff0000',
      borderRadius: 25,
    },
  });
  