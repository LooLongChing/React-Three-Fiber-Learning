import React, { useEffect, useRef } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import CustomObject from "./CustomObject"
import { Environment, ContactShadows, RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, useHelper, MeshReflectorMaterial, Float, Text, Html, PivotControls, TransformControls, OrbitControls, Sky, Lightformer } from '@react-three/drei'
import { button, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as Three from 'three'

export default function Experience() {

    const directionalLightRef = useRef()
    // useHelper(directionalLightRef, Three.DirectionalLightHelper, 1)

    const { perfVisible } = useControls({
        perfVisible: true
    })

    const controls = useControls('Sphere', {
        position: 
        {
           value: { x: -2, y: 1 },
           step: 0.01,
           joystick: 'invertY'
        },
        color: '#ff0000',
        visible: true,
        clickMe: button(() => {
            console.log('HiHi')
        }),
        choice: {  options: ['a', 'b', 'c']}
    })

    const contactShadowsControl = useControls('ContactShadows', {
        color: '#1d8f75',
        opacity: {value: 0.4, min: 0, max: 1},
        blur: {value: 2.8, min: 0, max: 10}
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [1, 2, 3] }
    })

    const { envMapIntensity } = useControls('environment map', {
        envMapIntensity: { value: 3.5, min: 0, max: 12 }
    })

    const scene = useThree(state => state.scene)
    useEffect(() => {
        scene.environmentIntensity = envMapIntensity
    }, [ envMapIntensity ])
    
    const controlsRef = useRef()
    const cubeRef = useRef()
    const sphereRef = useRef()

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime

        if (controlsRef.current) {
            // controlsRef.current.update()
        }

        // cubeRef.current.position.x += Math.sin(time) * delta
        cubeRef.current.rotation.y += delta * 0.2
    })

    return (
        <>
            {/* <BakeShadows /> */}
            {/* <SoftShadows size={ 25 } samples={ 10 } focus={ 0 } /> */}
            
            { perfVisible ? <Perf position="top-left" /> : null}

            <OrbitControls makeDefault/>

            {/* <AccumulativeShadows
                position={[ 0, -0.99, 0 ]}
                scale={ 10 }
                color="#316d39"
                opacity={ 0.8 }
                frames={ Infinity }
                temporal
                blend={ 100 }
            >
                <RandomizedLight 
                    amount={ 8 }
                    radius={ 1 }
                    ambient={ 0.5 }
                    intensity={ 3 }
                    position={[1, 2, 3]}
                    bias={ 0.001 }
                />
            </AccumulativeShadows> */}

            <ContactShadows 
                position={ [ 0, 1, 0 ] }
                scale={ 10 }
                resolution={ 512 }
                far={ 5 }
                color={ contactShadowsControl.color }
                opacity={ contactShadowsControl.opacity }
                blur={ contactShadowsControl.blur }
            />

            {/* <directionalLight 
                ref={ directionalLightRef }
                position={ sunPosition } 
                intensity={4.5} 
                castShadow 
                shadow-mapSize={[ 1024, 1024 ]}
                shadow-camera-near={ 1 }
                shadow-camera-far={ 10 }
                shadow-camera-top={ 2 }
                shadow-camera-right={ 4 }
                shadow-camera-bottom={ -2 }
                shadow-camera-left={ -4 }
            /> */}
            {/* <ambientLight intensity={1.5} /> */}

            {/* <Sky sunPosition={ sunPosition }/> */}

            <Environment 
                preset="sunset"
                // resolution={ 32 }
                ground={{
                    height: 7,
                    radius: 28,
                    scale: 100
                }}
            >
                {/* <color args={ ['blue'] } attach='background' /> */}
                {/* <Lightformer 
                    position-z={ -5 } 
                    scale={ 10 } 
                    color='red'
                    intensity={ 10 }
                    // form='ring'
                /> */}
                {/* <mesh position-z={ -5 } scale={ 10 } >
                    <planeGeometry />
                    <meshBasicMaterial color={ [ 10, 0, 0 ] } />
                </mesh> */}
            </Environment>

            

            <group>
                {/* Sphere */}
                <PivotControls enabled={false} anchor={[0, 0, 0]} depthTest={false}>
                    <mesh ref={ sphereRef } castShadow position-x={ controls.position.x } position-y={ controls.position.y }>
                        <sphereGeometry />
                        <meshStandardMaterial color={ controls.color } />

                        {/* <Html 
                            position={[1, 1, 0]}
                            wrapperClass="label"
                            center
                            distanceFactor={ 6 }
                            occlude={ [sphereRef, cubeRef] }
                        >
                            That's a sphere!
                        </Html>    */}
                    </mesh>
                </PivotControls>

                {/* Cube */}
                <mesh ref={ cubeRef } castShadow rotation-y={Math.PI * 0.25} position-x={2} position-y={1} scale={1.5} visible={ controls.visible }>
                        <boxGeometry  />
                        <meshStandardMaterial  color="mediumpurple" />
                </mesh>
                {/* <TransformControls enabled={ true } object={ cubeRef }/> */}
                {/* error with accumulative shadow */}
                
            </group>

            {/* Floor */}
            {/* <mesh rotation-x={-Math.PI * 0.5} position-y={0} scale={10}>
                <planeGeometry />
                <meshStandardMaterial color="greenyellow" /> */}
                {/* <MeshReflectorMaterial 
                    resolution={ 512 }
                    blur={[ 1000, 1000]}
                    mixBlur={ 1 }
                    mirror={ 0.75 }
                    color='greenyellow'
                /> */}
            {/* </mesh> */}

            <Float
                speed={ 5 }
                floatIntensity={ 2 }
            >
                <Text 
                    font="./font/kenyan coffee bd it.otf"
                    color="salmon"
                    position={[ 0, 1.5, 0]}
                >
                    HiHi
                </Text>
            </Float>

            {/* <CustomObject /> */}
        </>
    )
}