import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'
import { StrictMode } from 'react'
import { Leva } from 'leva'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const cameraSetting = {
    fov: 45,
    near: 0.1,
    far: 200,
    position:[3, 2, 6]
}

root.render(
    <StrictMode>
        <Leva collapsed />
        <Canvas 
            shadows={ false }
            camera={ cameraSetting }
        >
            <Experience />
        </Canvas>
    </StrictMode>
)