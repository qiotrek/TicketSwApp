import LanguageChangeHook from './Hooks/LanguageChange';
import './App.css';
import Navbar from './Components/Navbar';
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Contact from './Pages/Contact';
import Events from './Pages/Events';
import Advertisements from './Pages/Advertisements';
import HomeScreen from './Pages/HomeScreen';
import EventDetails from './Pages/EventDetails';
import MyAccount from './Pages/MyAccount';
import { AuthProvider } from './context/AuthContext';
import { NavigationContextProvider } from './context/NavigationContextProvider';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import { RoutingSettings } from './RoutingSettings';
import ProtectedRoute from './Components/ProtectedRoute';

function App() { 

  return (
    <AuthProvider>
      <NavigationContextProvider>
        <BrowserRouter>
            <div>
              <Navbar />
              <Routes>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/login" element={<Login/>}/>
                
              <>
                {RoutingSettings.flatMap(route => (
                  route.children.map(({ path, Component, roles, editableRoles }, index) => {
                    return (
                      <Route key={path} path={path}
                        element={
                          <ProtectedRoute roles={roles}>
                            <Component  editableRoles={editableRoles} />
                          </ProtectedRoute>
                        }
                      />
                    );
                  })
                ))}
              </>
        
                {/* <Route path="/HomeScreen" element={<HomeScreen />} />
                <Route path="/Events" element={<Events />} />
                <Route path="/Advertisements" element={<Advertisements />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/EventDetails" element={<EventDetails />} />
                <Route path="/MyAccount" element={<MyAccount />} /> */}
              </Routes>
            </div>
        </BrowserRouter>
      </NavigationContextProvider>
    </AuthProvider>
  );
}

export default App;
