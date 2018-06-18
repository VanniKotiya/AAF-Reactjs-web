import  React,{Component} from 'react';
import axios from "axios";


// import "../css/style.css";

class Register extends Component{
        constructor(props){
        super(props);
        this.state ={
            username:"",
            email:"",
            firstname:"",
            lastname :"",
            password:"",
            password_con:"",
            userdata : null,
            sucess: false

        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitHandler(e) {
        e.preventDefault();
        axios
            .post("http://localhost:8001/api/register", this.state)
            .then(result => {
                if (result.data.errors) {
                    return this.setState(result.data);

                }
                return this.setState({
                    userdata: result.data,
                    errors: null,
                    success: true
                },(window.location = "/Login"));
            });
    }
    render() {
        return (



            <div className="forms">

                <h1 className="h1s">Sign Up for Free</h1>
                <br/>

                <form onSubmit={this.submitHandler} >

                    <div className="field-wraps">
                        {/*<label>*/}
                            {/*Username<span className="req">*</span>*/}
                        {/*</label>*/}
                        <input type="text"
                               placeholder={"Username"}
                               className={"inputs"}
                               onChange={this.changeHandler}
                               name="username" id="username"
                               required autoComplete="off"
                        />{" "}

                    </div>

                    {this.state.errors &&
                    this.state.errors.username && (
                        <p>{this.state.errors.username.msg}</p>
                    )}


                    <div className="field-wraps">
                        {/*<label>*/}
                            {/*Email Address<span className="req">*</span>*/}
                        {/*</label>*/}
                        <input type="email"
                               className={"inputs"}
                               placeholder={"email"}
                               onChange={this.changeHandler}
                               name="email"
                               id="emailreg"
                               required autoComplete="off"
                        />
                        {this.state.errors &&
                        this.state.errors.email && <p>{this.state.errors.email.msg}</p>}
                    </div>


                    <div className="top-row">
                        <div className="field-wraps">
                            {/*<label>*/}
                                {/*First Name<span className="req">*</span>*/}
                            {/*</label>*/}
                            <input type="text"
                                   className={"inputs"}
                                   placeholder={"firstname"}
                                   onChange={this.changeHandler}
                                   name="firstname"
                                   id="firstname"
                                   required autoComplete="off"
                            />
                            {this.state.errors &&
                            this.state.errors.firstname && (
                                <p>{this.state.errors.firstname.msg}</p>
                            )}
                        </div>

                        <div className="field-wraps">
                            {/*<label>*/}
                                {/*Last Name<span className="req">*</span>*/}
                            {/*</label>*/}
                            <input type="text"
                                   className={"inputs"}
                                   placeholder={"lastname"}
                                   onChange={this.changeHandler}
                                   name="lastname" id="lastname"
                                   required autoComplete="off"
                            />
                            {this.state.errors &&
                            this.state.errors.lastname && (
                                <p>{this.state.errors.lastname.msg}</p>
                            )}
                        </div>

                    </div>



                    <div className="field-wraps">
                        {/*<label>*/}
                            {/*Set A Password<span className="req">*</span>*/}
                        {/*</label>*/}
                        <input type="password"
                               className={"inputs"}
                               placeholder={"password"}
                               onChange={this.changeHandler}
                               name="password"
                               id="passwordreg"
                               required autoComplete="off"
                        />
                        {this.state.errors &&
                        this.state.errors.password && (
                            <p>{this.state.errors.password.msg}</p>
                        )}
                    </div>

                    <div className="field-wraps">
                        {/*<label>*/}
                            {/*Set A Password<span className="req">*</span>*/}
                        {/*</label>*/}
                        <input type="password"
                               className={"inputs"}
                               placeholder={"password"}
                               onChange={this.changeHandler}
                               name="password_con"
                               id="password_con" required autoComplete="off"
                        />
                        {this.state.errors &&
                        this.state.errors.password_con && (
                            <p>{this.state.errors.password_con.msg}</p>
                        )}
                    </div>
                    {this.state.success && <p>You are successfully registerated!</p>}

                    <button type="submit" className="button button-block">Get Started</button>
                </form>
            </div>

        );

    }

}

export default  Register;