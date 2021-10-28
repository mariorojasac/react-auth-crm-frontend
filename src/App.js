import { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import { auth } from './services/firebase';

import './App.css';

// const ProtectedRoute = ({user, component }) => {
//   if(props.user) {
//     return ;
//   } else {
//     return <Redirect to="/login" />
//   }
// };

function App() {
  
  const [ user, setUser ] = useState(null);

  useEffect(() => {
  const unsubscribe =  auth.onAuthStateChanged(user => setUser(user));
  return () => unsubscribe(); // clean up action - remove observer from memory when not needed
  }, []);

  return (
    <>
      <Header user={user} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login" render={() => (
            user ? <Redirect to="/dashboard" /> : <Login />
          )} />
          <Route path="/dashboard" render={() => (
            user ? <Dashboard /> : <Redirect to="/login" />
          )} />
        </Switch>
      <Footer />
    </>
  );
}

export default App;
