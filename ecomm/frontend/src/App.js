
import './App.css';
import { Navbar } from './components/Navbar';
import {AllRoutes} from "./components/AllRoutes"
import { useDispatch } from 'react-redux';
import { logout } from './components/Redux/auth/action';
import { useEffect, useState, useRef } from 'react';

function App() {

  // const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [timerId, setTimerId] = useState(false);
  const renderCount = useRef(1);

  const dispatch = useDispatch()

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  useEffect(() => {
    const autoLogout = () => {
      if (document.visibilityState === "hidden") {
        // set timer to log user out
        const id = window.setTimeout(() => dispatch(logout()), 60000);
        setTimerId(id);
      } else {
        // clear existing timer
        window.clearTimeout(timerId);
      }
    };

    document.addEventListener("visibilitychange", autoLogout);

    return () => document.removeEventListener("visibilitychange", autoLogout);
  }, [timerId]);

    


  return (
    <div className="App">
         
         <Navbar />
        <AllRoutes />
 

    </div>
  );
}

export default App;
