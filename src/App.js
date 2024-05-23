import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import RecipeDetails from './pages/RecipeDetails';
import CalorieCalculator from './pages/calculateTotalCal';
import Personalize from './pages/personalize';
import Food_recognition from './pages/Food_recognition';



function App() {


  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/Home" element={ <Home/> } />
        <Route path="/About" element={ <About/> } />
        <Route path="/Login" element={ <Login/> } />
        <Route path="/Signup" element={ <Signup/> } />
        <Route path="/Profile" element={ <Profile/> } />
        <Route path="/Explore" element={ <Explore/> } />
        <Route path="/recipe/:id" element={ <RecipeDetails/> } />
        <Route path="/CalorieCalculator" element={ <CalorieCalculator/> } />
        <Route path="/Personalize" element={ <Personalize/> } />
        <Route path='/contact' element={ <Food_recognition/>} />
  
        
      </Routes>
    </Router>
  </div>
  );
}

export default App