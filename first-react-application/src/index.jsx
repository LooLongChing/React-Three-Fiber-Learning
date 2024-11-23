import { createRoot } from 'react-dom/client'
import App from './App.js'
import './style.css'

const root = createRoot(document.querySelector('#root'))

const toto = "there"

root.render(
    <>
        {/* Some Comment */}
        <App clickersCount={ 3 }>
            <h1>My first application</h1>
            <h2>And my fancy subtitle</h2>
        </App>
    </>
)