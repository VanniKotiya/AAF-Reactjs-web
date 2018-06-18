import React, {Component} from 'react';
import axios from "axios";

 import Header from "./Header";


class userprofile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:localStorage.getItem('useids'),
            firstname:"",
            username:" ",
            lastname:"",
            password:"",
            password_con:"",
            email:"",
            userdata : null,
            sucess: false,

            isloggedin: true
        };


         this.changeHandler = this.changeHandler.bind(this);
         this.submitHandler = this.submitHandler.bind(this);
    }
    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitHandler(e) {
        e.preventDefault();
        axios.put("http://localhost:8001/api/updateuser?id="+this.state.id,this.state)
            .then(result => {
                if (result.success===false ){
                    alert("couldn't updated");
                    // return this.setState(result.data);

                }else{
                    alert("updated");
                }
                // return this.setState({
                //     userdata: result.data,
                //     errors: null,
                //     success: true
                //
                // });
            });
    }
    componentDidMount(){
        this.getUserinfo();
    }
    getUserinfo = () => {
        //localStorage.getItem('id');
        axios
            .get('http://localhost:8001/api/addusersprofile/'+this.state.id)
            .then(result => {
                if (result.data) {
                    this.setState({firstname:result.data.firstname});
                    this.setState({lastname:result.data.lastname});
                    this.setState({username:result.data.username});
                    this.setState({email:result.data.email});

                    //this.setState({password:result.data.email});


                    //alert("user found");
                } else {
                    //alert("use not found");
                }
                //return this.setState({userdata:result.data,errors:null,sucess:true });
            });
    }

    deluser = () =>{
        axios
            .delete('http://localhost:8001/api/deluser?id='+this.state.id)
            .then(result => {
                alert("the User deleted")
                localStorage.clear()
                return (window.location = "/Page");
                //return this.setState({userdata:result.data,errors:null,sucess:true });
            });
    };






        render() {
        return (
            <div>
                <div>
                    <Header/>

                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-10 ">
                            <form onSubmit={this.submitHandler}  className="form-horizontal">
                                <br/>
                                <br/>
                                <br/>
                                <fieldset>

                                    <legend className={"text-white font-weight-bold "}>Edit Profile</legend>

                                    <br/><br/>

                                    <div className="form-group">
                                        {/*<label className="col-md-4 control-label" htmlFor="Date Of Birth"> User Name</label>*/}
                                        <div className="form-group">

                                            {/*<div className="input-group">*/}
                                            {/*<input id="username"*/}
                                            {/*name="username"*/}
                                            {/*value={this.state.username}*/}
                                            {/*onChange={this.changeHandler}*/}
                                            {/*type="text"*/}
                                            {/*placeholder="User Name"*/}
                                            {/*className="form-control input-md"*/}
                                            {/*/>*/}
                                            {/*</div>*/}





                                            <div className="input-group mb-3 form-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text btn-secondary text-dark" id="inputGroup-sizing-default">User Name</span>
                                                </div>
                                                <input id="username"
                                                       name="username"
                                                       value={this.state.username}
                                                       onChange={this.changeHandler}
                                                       type="text"
                                                       placeholder="User Name"
                                                       className="form-control "
                                                />
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                    {/*//---------------------*/}

                                    <div className="form-group">

                                        {/*<label className="col-md-4 control-label" htmlFor="Name (Full name)">First Name </label>*/}
                                        <div className="form-group">
                                            {/*<div className="input-group">*/}
                                                {/*<input id="firstname" name="firstname" value={this.state.firstname} onChange={this.changeHandler} type="text"*/}
                                                       {/*placeholder="First Name"*/}
                                                       {/*className="form-control"/>*/}
                                            {/*</div>*/}

                                            <div className="input-group mb-3 form-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text btn-secondary text-dark" id="inputGroup-sizing-default">First Name</span>
                                                </div>
                                                <input id="firstname" name="firstname" value={this.state.firstname} onChange={this.changeHandler} type="text"
                                                       placeholder="Tyepe your First Name"
                                                       className="form-control"/>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>

                                    {/*//-------------------------*/}

                                    <div className="form-group">
                                        {/*<label className="col-md-4 control-label" htmlFor="Name (Full name)">Last Name</label>*/}
                                        <div className="form-group">
                                            {/*<div className="input-group">*/}
                                                {/*<input id="lastname"*/}
                                                       {/*name="lastname"*/}
                                                       {/*value={this.state.lastname}*/}
                                                       {/*onChange={this.changeHandler}*/}
                                                       {/*type="text"*/}
                                                       {/*placeholder="Last Name"*/}
                                                       {/*className="form-control"*/}
                                                {/*/>*/}
                                            {/*</div>*/}

                                            <div className="input-group mb-3 form-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text btn-secondary text-dark" id="inputGroup-sizing-default">Last Name</span>
                                                </div>
                                                <input id="lastname"
                                                       name="lastname"
                                                       value={this.state.lastname}
                                                       onChange={this.changeHandler}
                                                       type="text"
                                                       placeholder="Last Name"
                                                       className="form-control"
                                                />
                                            </div>
                                            <br/>
                                        </div>
                                    </div>

                                    {/*//---------------*/}

                                    <div className="form-group">
                                        {/*<label className="col-md-4 control-label" htmlFor="Mother">E-Mail</label>*/}
                                        <div className="form-group">
                                            {/*<div className="input-group">*/}
                                                {/*<input name="email"*/}
                                                       {/*id="email"*/}
                                                       {/*value={this.state.email}*/}
                                                       {/*onChange={this.changeHandler}*/}
                                                       {/*type="text"*/}
                                                       {/*placeholder="Email"*/}
                                                       {/*className="form-control input-md"*/}
                                                {/*/>*/}

                                            {/*</div>*/}




                                        <div className="input-group mb-3 form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text btn-secondary text-dark" id="inputGroup-sizing-default">E-Mail</span>
                                            </div>
                                            <input name="email"
                                                   id="email"
                                                   value={this.state.email}
                                                   onChange={this.changeHandler}
                                                   type="text"
                                                   placeholder="Email"
                                                   className="form-control "
                                            />
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                    {/*//----------------------*/}

                                    <div className="form-group">
                                        {/*<label className="col-md-4 control-label col-xs-12" htmlFor="Permanent Address">Password</label>*/}
                                        <div className="form-group">
                                            {/*<div className="input-group">*/}
                                                {/*<input id="password"*/}
                                                       {/*name="password"*/}
                                                       {/*value={this.state.password}*/}
                                                       {/*onChange={this.changeHandler}*/}
                                                       {/*type="password"*/}
                                                       {/*placeholder="Password"*/}
                                                       {/*className="form-control input-md "*/}
                                                {/*/>*/}
                                            {/*</div>*/}

                                            <div className="input-group-prepend">
                                                <div>
                                                    <span className="input-group-text btn-secondary text-dark" id="inputGroup-sizing-default">Password</span>
                                                </div>
                                                <input id="password"
                                                       name="password"
                                                       value={this.state.password}
                                                       onChange={this.changeHandler}
                                                       type="password"
                                                       placeholder="Password"
                                                       className="form-control "
                                                />
                                            </div>
                                            <br/>
                                        </div>
                                    </div>

                                    {/*//-------------------------------*/}



                                    <div className="form-group">
                                        {/*<label className="col-md-4 control-label col-xs-12" htmlFor="Permanent Address">Password</label>*/}
                                        {/*<div className="col-md-11">*/}
                                            {/*<div className="input-group">*/}
                                                {/*<input id="password_con"*/}
                                                       {/*name="password_con"*/}
                                                       {/*value={this.state.password_con}*/}
                                                       {/*onChange={this.changeHandler}*/}
                                                       {/*type="password"*/}
                                                       {/*placeholder="Password"*/}
                                                       {/*className="form-control input-md "*/}
                                                {/*/>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}


                                        <div className="form-group ">
                                            <div className="input-group-prepend">
                                                <div>
                                                    <span className="input-group-text btn-secondary text-dark" id="inputGroup-sizing-default">Password</span>
                                                </div>
                                                <input id="password_con"
                                                       name="password_con"
                                                       value={this.state.password_con}
                                                       onChange={this.changeHandler}
                                                       type="password"
                                                       placeholder="Password"
                                                       className="form-control input-md "
                                                />
                                            </div>
                                            <br/>
                                        </div>


                                    </div>


                                    <div className="form-group">

                                        <div className="form-group">

                                            <button type="submit" className="btn btn-primary btn-block">Update</button>
                                            <button type="button" onClick={this.deluser} className="btn btn-danger btn-block">delete</button>


                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>

                    </div>
                    {/*<label>{this.state.id}</label><br/>*/}
                    {/*<label>{this.state.firstname}</label><br/>*/}
                    {/*<label>{this.state.lastname}</label><br/>*/}
                    {/*<label>{this.state.username}</label><br/>*/}
                    {/*<label>{this.state.email}</label><br/>*/}
                    {/*<label>{this.state.password}</label><br/>*/}
                    {/*<label>{this.state.password_con}</label><br/>*/}
                </div>
            </div>

        );

    }

}

export default userprofile;