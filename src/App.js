import React from 'react';
import { Route ,Redirect,Switch} from 'react-router-dom';
import Movies from './components/movies'
import MoviesForm from "./components/moviesForm";
import Customers from './components/customers';
import Rentals from "./components/rentals";
import NotFound from './components/notFound';
import NavBar from './components/common/navBar';
import LoginForm from './components/loginFrom';
import RegisterForm from './components/registerForm';
import './App.css';


function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/movies/:id" component={MoviesForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect exact from="/" to="/movies"></Redirect>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
