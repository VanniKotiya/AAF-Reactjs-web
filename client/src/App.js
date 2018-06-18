import React, { Component } from 'react';
import Home from "./components/Home";
import Main from "./components/Mainpage";
import AddProject from "./components/Addproject";
import Page from "./components/Page";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import FindPublicpost from "./components/FindPublicpost";
import MyProjects from "./components/MyProjects";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";



class App extends Component {
  render() {
    return (
     <Router>
         <Switch>

             <Route exact path ="/" component ={Home}/>
             <Route exact path ="/mainpage" component ={Main}/>
             <Route exact path ="/Addproject" component ={AddProject}/>

             <Route exact path ="/Page" component ={Page}/>

             <Route exact path ="/Login" component ={Login}/>
             <Route exact path ="/Register" component ={Register}/>
             <Route exact path ="/UserProfile" component ={UserProfile}/>
             <Route exact path ="/FindPublicpost" component ={FindPublicpost}/>
             <Route exact path ="/MyProjects" component ={MyProjects}/>


         </Switch>
     </Router>
    );
  }
}

export default App;
