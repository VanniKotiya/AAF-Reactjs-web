import  React,{Component} from 'react';
import Login from "./Login";
import Register from "./Register";
import Addproject from "./Addproject";
import FindPublicpost from "./FindPublicpost";
import Page from "./Page";
import UserProfile from "./UserProfile";
import MyProjects from "./MyProjects";
//import MyProjects from "./MyProjects";

import Header from "./Header";


class Home extends Component{
    render() {
        return (
            <div>
                <Header/>
                {/*<Login/>*/}
                {/*<Register/>*/}
                {/*<Addproject/>*/}
                {/*<FindPublicpost/>*/}
                {/*<Page/>*/}
                {/*<UserProfile/>*/}
                <MyProjects/>
            </div>

        );

    }

}

export default  Home;


