import React                     from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Navbar}                  from "./components/Navbar.jsx";
import {AuthContext}             from "./context/AuthContext.js";
import {useAuth}                 from "./hooks/auth.hook.js";
import {useRoutes}               from "./routes.js";
import 'materialize-css'

function App() {
   const {token, login, logout, userId} = useAuth()
   const isAuthenticated = !!token
   const routes = useRoutes(isAuthenticated)
   
   return (
      <AuthContext.Provider value={{
         token, login, logout, userId, isAuthenticated
      }}>
         <Router>
            {isAuthenticated && <Navbar />}
            <div className="container">
               {routes}
            </div>
         </Router>
      </AuthContext.Provider>
      
   );
}

export default App;
