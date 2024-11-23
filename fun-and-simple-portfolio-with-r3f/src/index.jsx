import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { StrictMode } from 'react'
import { Leva } from 'leva'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const debugParam = window.location.hash === '#debug'

root.render(
    <StrictMode>
        <Leva collapsed hidden={ !debugParam } />
        <Canvas
            className='r3f'
            camera={{
                fov: 45,
                near: 0.1,
                far: 2000,
                position: [-3, 1.5, 4]
            }}
        >
            <Experience />
        </Canvas>
    </StrictMode>
)