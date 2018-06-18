import  React,{Component} from 'react';
import  {NavLink} from 'react-router-dom';

import "../css/main.css";



class page extends Component{
    render() {
        return (
            <div>
                <section className="banner" role="banner">
                    <header id="headers">
                        <div className="header-content clearfix">
                            <NavLink to={'/Page'} className="logo " >LEXIS</NavLink>
                            <nav className="navigation" role="navigation">
                                <ul className="primary-nav">
                                    <li><NavLink to={'/Login'}>Login</NavLink></li>
                                    <li><NavLink to={'/Register'}>Signup</NavLink></li>

                                </ul>
                            </nav>
                            <a href="#" className="nav-toggle">Menu<span></span></a></div>
                    </header>

                    <div className="container">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="banner-text text-center">
                                <h1>Lets Manage your project.</h1>
                                <p>Lorem ipsum dolor sit ametcursus magna vel scelerisque Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit. Praesent commodo cursus magna vel scelerisque nisl
                                    consectetur et.nisl consectetur et.</p>
                                <NavLink to={'/Register'} className="btns btn-large">Let's Register Free</NavLink>
                                <br/>
                                    <p>Already use Lexis? <NavLink to={'/Login'} className="btn-small ">Log in.</NavLink></p>
                            </div>


                        </div>
                    </div>
                </section>

            </div>

        );

    }

}

export default  page;


