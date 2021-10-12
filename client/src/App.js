import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import TrackView from "./components/Tracks/TrackView";
import PrivateRoute from "./services/PrivateRoute";
import Nav from "./components/General/Nav";
import ControlsBar from "./components/General/ControlsBar";
import Callback from "./components/Login/Callback";

const App = () => {

    return (
        <ChakraProvider>
          <Router>
            <Nav />
            <Switch>
              <PrivateRoute  path="/home" component={Home}/>
              <PrivateRoute  path="/tracks" component={TrackView}/>
              <Route  path="/" component={Login}/>
              <Route  path="/callback" component={Callback}/>
            </Switch>
            <ControlsBar />
          </Router>
        </ChakraProvider>
    )
}

export default App;
