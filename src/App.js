import React, { createContext } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import { AuthProvider, PrivateRoute } from './components/Login/useAuth';
import Ship from './components/Ship/Ship';

export const UserContext = createContext();

function App() {
  return (
    <div>
      <AuthProvider>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>

          </Route>
          <Route path="/manage">
              <Manage></Manage>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:key">
              <ProductDetails></ProductDetails>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/ship">
            <Ship></Ship>
          </PrivateRoute>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router> 
      </AuthProvider>        
    </div>
  );
}

export default App;
