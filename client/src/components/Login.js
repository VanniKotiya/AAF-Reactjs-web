import  React,{Component} from 'react';
import axios from "axios";

 import "../css/style.css";






class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password: "",
            error:null

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
            .post("http://localhost:8001/api/login", this.state)
            .then(res => {
                console.log(res);
                if (res.data.error) {
                    return this.setState({ error: res.data.message });
                }
                if (res.data.errors) {
                    return this.setState({ valerrors: res.data.errors });
                }
                localStorage.setItem('useids',res.data.id);
                return (window.location = "/Addproject");
            });
    }



    render() {
        return (
        <div>
            <div className="forms">
                <h1 className={"h1s"}>Welcome Back!</h1>


                <form onSubmit={this.submitHandler}  >

                    <div className="field-wraps">
                        {/*<label>*/}
                            {/*Email Address<span placeholder={"Email Address"} className="req">*</span>*/}
                        {/*</label>*/}
                        <br/>

                        <input type="email"
                               placeholder={"Email Address"}
                               onChange={this.changeHandler}
                               name ="email"
                               id="email"
                               className={"inputs"}
                               required autoComplete="off"/>
                    </div>

                    <div className="field-wraps ">
                        {/*<label>*/}
                            {/*Password<span className="req">*</span>*/}
                        {/*</label>*/}

                        <input type="password"
                               placeholder={"Password"}
                               onChange={this.changeHandler}
                               name="password"
                               id="password"
                               className={"inputs"}
                               required autoComplete="off"/>
                        {this.state.error && <p>{this.state.error}</p>}
                    </div>



                    <button className="button button-block">Log In</button>

                </form>

            </div>
        </div>
        );

    }

}

export default  Login;