import './App.css';
import Welcome from './components/Welcome';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import Logout from './components/Logout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
