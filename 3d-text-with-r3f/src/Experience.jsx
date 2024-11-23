import { useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import * as Three from 'three'

const torusGeometry = new Three.TorusGeometry(1, 0.6, 16, 32)
const material = new Three.MeshNormalMaterial()

export default function Experience()
{
    const [ mapcapTexture ] = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256)

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <Center>
            <Text3D
                font="./fonts/helvetiker_regular.typeface.json"
                size={ 0.75 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled 
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
            >
                Hello world!
                <meshMatcapMaterial mapcapTexture={ mapcapTexture } />
            </Text3D>
        </Center>

        { [...Array(100)].map((value, index) => 
            <mesh
            key={ index }
                position={ [
                    (Math.random() - 0.5) * 10,     
                    (Math.random() - 0.5) * 10,     
                    (Math.random() - 0.5) * 10,     
                ] }
                scale={ 0.2 + Math.random() * 0.2 }
                rotation={ [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ] }
            >
                <torusGeometry />
                <meshNormalMaterial />
            </mesh>
        ) }

    </>
}