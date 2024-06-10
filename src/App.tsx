import LanguageChangeHook from './Hooks/LanguageChange';
import './App.css';
import Navbar from './Components/Navbar';
import { useEffect, useMemo, useState } from 'react';
import myPhoto from './assets/myPhoto.jpg';
import { HiCheck, HiArrowCircleUp,HiMinusCircle,HiArrowNarrowRight } from 'react-icons/hi';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contact from './Pages/Contact';
import Events from './Pages/Events';
import Advertisements from './Pages/Advertisements';
import HomeScreen from './Pages/HomeScreen';
import EventDetails from './Pages/EventDetails';
import MyAccount from './Pages/MyAccount';

function App() {
  
  useEffect(() => {

  }, []); 
  

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/HomeScreen" element={<HomeScreen />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Advertisements" element={<Advertisements />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/EventDetails" element={<EventDetails />} />
          <Route path="/MyAccount" element={<MyAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
