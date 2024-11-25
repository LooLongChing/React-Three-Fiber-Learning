import * as Three from 'three'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { InstancedRigidBodies, CylinderCollider, BallCollider, CuboidCollider, RigidBody, Physics } from '@react-three/rapier'
import { useMemo, useEffect, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'

export default function Experience()
{
    const hamburger = useGLTF('./hamburger.glb')

    const cubesCount = 100
    const instances = useMemo(() =>
    {
        const instances = []

        for(let i = 0; i < cubesCount; i++){
            instances.push({
                key: 'instance_' + i,
                position: [ 
                    (Math.random() - 0.5) * 8,
                    6 + i * 0.2,
                    (Math.random() - 0.5) * 8
                ],
                rotation: [ Math.random(), Math.random(), Math.random() ]
            })
        }

        return instances
    }, [])
    // const cubes = useRef()

    // useEffect(() => 
    // {
    //     for(let i = 0; i < cubesCount; i++){
    //         const matrix = new Three.Matrix4()
    //         matrix.compose(
    //             new Three.Vector3(i * 2, 0, 0),
    //             new Three.Quaternion(),
    //             new Three.Vector3(1, 1, 1)
    //         )
    //         cubes.current.setMatrixAt(i, matrix)
    //     }
    // }, [])

    const [ hitSound ] = useState(() => 
    {
        return new Audio('./hit.mp3')
    })

    const cubeRef = useRef()
    const twister = useRef()

    const cubeJump = () =>
    {
        const mass = cubeRef.current.mass()
        cubeRef.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 })
        cubeRef.current.applyTorqueImpulse({ 
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5
        })
    }

    useFrame((state) => 
    {
        const time = state.clock.getElapsedTime()

        const eulerRotation = new Three.Euler(0, time * 3, 0)
        const quaternionRotation = new Three.Quaternion()
        quaternionRotation.setFromEuler(eulerRotation)
        twister.current.setNextKinematicRotation(quaternionRotation)

        const angle = time * 0.5
        const x = Math.cos(angle) * 2
        const z = Math.sin(angle) * 2
        twister.current.setNextKinematicTranslation({ x: x, y: -0.8, z: z })
    })

    const collisionEnter = () =>
    {
        // hitSound.currentTime = 0
        // hitSound.volume = Math.random()
        // hitSound.play()
    }

    const { physicsDebug } = useControls('Physics', {
        physicsDebug: false
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <Physics debug={ physicsDebug } gravity={[ 0, -9.81, 0 ]}>

            <RigidBody colliders='ball'>
                <mesh castShadow position={ [ -1.5, 2, 0 ] }>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            <RigidBody 
                ref={ cubeRef } 
                position={ [ 1.5, 2, 0 ] }
                restitution={ 0 }
                friction={ 0.7 }
                colliders={ false }
                onCollisionEnter={ collisionEnter }
                // onCollisionExit={() => { console.log('exit')} }
                // onSleep={() => { console.log('sleep')} }
                // onWake={() => { console.log('wake')} }
            >
                <mesh castShadow onClick={ cubeJump } >
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
                <CuboidCollider mass={ 1 } args={ [ 0.5, 0.5, 0.5 ] } />
            </RigidBody>

            <RigidBody type='fixed'>
                <mesh receiveShadow position-y={ - 1.25 }>
                    <boxGeometry args={ [ 10, 0.5, 10 ] } />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>

            <RigidBody
                ref={ twister }
                position={[ 0, -0.8, 0 ]}
                friction={ 0 }
                type='kinematicPosition'
            >
                <mesh receiveShadow scale={[ 0.4, 0.4, 3 ]} >
                    <boxGeometry />
                    <meshStandardMaterial color="red" />
                </mesh>
            </RigidBody>

            <RigidBody 
                colliders={ false }
            >
                <mesh receiveShadow position-y={ 4 }>
                    <primitive object={ hamburger.scene } scale={ 0.25 } />
                    <CylinderCollider args={ [ 0.5, 1.25 ] } />
                </mesh>
            </RigidBody>

            <RigidBody type='fixed'>
                <CuboidCollider args={[ 5, 2, 0.5 ]} position={[ 0, 1, 5.5 ]} />
                <CuboidCollider args={[ 5, 2, 0.5 ]} position={[ 0, 1, -5.5 ]} />
                <CuboidCollider args={[ 0.5, 2, 5 ]} position={[ 5.5, 1, 0 ]} />
                <CuboidCollider args={[ 0.5, 2, 5 ]} position={[ -5.5, 1, 0 ]} />
            </RigidBody>

            <InstancedRigidBodies instances={ instances }>
                <instancedMesh castShadow args={[ null, null, cubesCount ]}>
                    <boxGeometry />
                    <meshStandardMaterial color='tomato' />
                </instancedMesh>
            </InstancedRigidBodies>

        </Physics>

    </>
}