import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Toaster} from 'react-hot-toast'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import ContextProvider from './Context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
<BrowserRouter>
<ContextProvider>

<Toaster/>
    <App />
</ContextProvider>
</BrowserRouter>
)
