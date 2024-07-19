import Home from './pages/home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/onboarding'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/onboarding" element={<OnBoarding/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default App