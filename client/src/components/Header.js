import  React,{Component} from 'react';
import  {NavLink} from 'react-router-dom';
import axios from "axios";


import "../css/bootstrap.css";


class Header extends Component{
    render() {
        return (
            <div>


                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink to={'/Page'} className="navbar-brand" >LEXIS</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {/*<li className="nav-item active">*/}
                                {/*<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>*/}
                            {/*</li>*/}
                            {/*<li className="nav-item">*/}
                                {/*<a className="nav-link" href="#">Link</a>*/}
                            {/*</li>*/}
                            {/*<li className="nav-item dropdown">*/}
                                {/*<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"*/}
                                   {/*data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                                    {/*Dropdown*/}
                                {/*</a>*/}
                                {/*<div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}
                                    {/*<a className="dropdown-item" href="#">Action</a>*/}
                                    {/*<a className="dropdown-item" href="#">Another action</a>*/}
                                    {/*<div className="dropdown-divider"></div>*/}
                                    {/*<a className="dropdown-item" href="#">Something else here</a>*/}
                                {/*</div>*/}
                            {/*</li>*/}
                            {/*<li className="nav-item">*/}
                                {/*<a className="nav-link disabled" href="#">Disabled</a>*/}
                            {/*</li>*/}
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            {/*<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>*/}
                                {/*<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/}
                            < NavLink to={'/FindPublicpost'}className="btn btn-link" >Public Projects<span className="sr-only">(current)</span></NavLink>
                            < NavLink to={'/MyProjects'}className="btn btn-link" >My Project <span className="sr-only">(current)</span></NavLink>
                            < NavLink to={'/Addproject'}className="btn btn-link" > Add Project <span className="sr-only">(current)</span></NavLink>
                            < NavLink to={'/UserProfile'}className="btn btn-link" >Profile<span className="sr-only">(current)</span></NavLink>
                            <button
                                className="btn btn-link"
                                onClick={() =>{
                                    axios
                                        .get("http://localhost:8001/api/logout")

                                        .then(res =>
                                            localStorage.clear()
                                            (window.location = "/Page"))
                                }
                                }
                            >
                                Log Out
                            </button>

                        </form>
                    </div>
                </nav>
            </div>

        );

    }

}

export default  Header;




