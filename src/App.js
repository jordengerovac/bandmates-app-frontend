import './App.css';
import Welcome from './components/Welcome';
import Login from './components/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import Logout from './components/Logout';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import ConnectSpotify from './components/ConnectSpotify';
import SpotifyData from './components/SpotifyData';
import Search from './components/Search';
import BOTBDashboard from './components/BOTBDashboard';
import CreateBOTB from './components/CreateBOTB';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/logout" component={Logout} />
        <Route path="/profile" component={Profile} />
        <Route path="/update-profile" component={UpdateProfile} />
        <Route path="/connect-spotify" component={ConnectSpotify} />
        <Route path="/spotify-data" component={SpotifyData} />
        <Route path="/search" component={Search} />
        <Route path="/botb" component={BOTBDashboard} />
        <Route path="/create-botb" component={CreateBOTB} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
