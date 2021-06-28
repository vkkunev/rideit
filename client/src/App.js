import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Community from './pages/Community'
import Register from './pages/Register'

import Header from './components/Header/Header'
import { AuthProvider } from './auth/auth'
import AuthRoute from './auth/AuthRoute'



function App() {

  function selectCategory (category) {
    setCategory(category)
  }

  const [category, setCategory] = useState({"category": 'all'});

  return (
    <AuthProvider>
      <Router>
        <Header selectCategory={selectCategory}/>
        <Route exact path='/' render={() => <Home category={category} />}/>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <AuthRoute exact path='/create-post' component={Post} />
        <AuthRoute exact path='/create-community' component={Community} />
        <AuthRoute exact path='/logout' component={Login} />
      </Router>
    </AuthProvider>
  );
}

export default App;
