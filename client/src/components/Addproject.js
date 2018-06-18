import React, {Component} from 'react';
import axios from "axios";

 // import "../css/bootstrap.css";
import Header from "./Header";


class Addproject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            postdescription: "",

            privacy: false,

            user: '',
            coloborators: [],
            tags: []

        };
        this.state2 = {
            users: "",
            field: ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.changeHandler2 = this.changeHandler2.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    componentDidMount() {
       this.setState({
           user:localStorage.getItem('useids')
       })
    };
    changeHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    changeHandler2(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitHandler(e) {
        console.log("dadawdfafa");

        e.preventDefault();
        axios
            .post('http://localhost:8001/api/addProjects', this.state)
            .then(result => {
                if (result.data) {
                    //     //this.setState(result.message);
                    alert("The project posted");
                    return (window.location = "/MyProjects");

                } else {
                    alert("did not post");
                }
                // return this.setState({userdata:result.data,errors:null,sucess:true });

            });

    }

    toggleChange = () => {
        this.setState({
            privacy: !this.state.privacy,
        });
    }

    getUser = () => {
        axios
            .get('http://localhost:8001/api/addusers/' + this.state.users)
            .then(result => {
                if (result.data) {
                    this.state.coloborators.push(result.data);
                    this.setState(this.state);
                    this.setState({users: ''});
                    alert("user found");
                } else {
                    alert("use not found");
                }
                //return this.setState({userdata:result.data,errors:null,sucess:true });
            });
    }
    getField = () => {
        this.state.tags.push(this.state.field);
        this.setState(this.state);
        this.setState({field: ''});
    };

    removeField = (field) => {
        for(var count= 0; count< this.state.tags.length; count++){
            if(this.state.tags[count] == field){
                this.state.tags.splice(count,1);
            }
        }
        this.setState({
            tags: this.state.tags
        });
        console.log(this.state.tags);
    };

    removeCollaborators = (field) => {
        for(var i = 0; i < this.state.coloborators.length; i++){
            if(this.state.coloborators[i] == field){
                this.state.coloborators.splice(i,1);
            }
        }
        this.setState({
            coloborators: this.state.coloborators
        });
        console.log(this.state.coloborators);
    };

    render() {
        return (
            <div>
                <div>
                    <Header/>

                </div>

                <div>



                    <form onSubmit={this.submitHandler} className={"container"}>
                        <div className={"form-group"}>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>

                        <legend className={"text-white font-weight-bold "}>Add Project</legend>

                        <br/><br/>

                        {/*//------------------------------------------------------------*/}
                        <div className="input-group mb-3 form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text btn-secondary text-dark" id="inputGroup-sizing-default">Project Name</span>
                            </div>
                            <input type="text" className="form-control" onChange={this.changeHandler} name="projectName"
                                   id="projectName" placeholder={"Type your Project name"} required autoComplete="off"/>
                        </div>
                        <br/>
                    {/*//------------------------------------------------------------*/}

                        <div className=" form-group input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text btn-secondary text-dark" id="inputGroup-sizing-default">Type Project Description</span>
                            </div>
                            <input type="text" className="form-control" onChange={this.changeHandler}
                                   name="postdescription" id="postdescription" placeholder={"Project description"}
                                   required autoComplete="off"/>
                        </div>
                        <br/>
                    {/*//------------------------------------------------------------*/}
                        <div className={"form-group"}>

                            {/*<label className={"text-light"}>Users</label>*/}
                            {/*<input type="text" className="form-control" onChange={this.changeHandler2}*/}
                                   {/*value={this.state.users} name="users" id="users" placeholder={"Users"}/>*/}
                            {/*<br/>*/}
                            {/*<button type="button" className="btn btn-primary" onClick={this.getUser}>ADD</button>*/}

                            {/*<div className={"form-group"}>*/}
                                {/*{*/}
                                    {/*this.state.coloborators.map(userData => {*/}
                                        {/*return (*/}
                                            {/*<div className={"form-group"} key={userData._id}>*/}
                                                {/*<dt>*/}
                                                    {/*<br/>*/}
                                                    {/*{userData.username}*/}
                                                    {/*<button type="button" className="btn btn-primary btn-sm">Remove*/}
                                                    {/*</button>*/}

                                                {/*</dt>*/}

                                            {/*</div>*/}
                                        {/*)*/}
                                    {/*})*/}
                                {/*}*/}
                            {/*</div>*/}

                            <div className=" form-group input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text btn-secondary text-dark" id="inputGroup-sizing-default">Add Users</span>
                                </div>
                                <input type="text" className="form-control" onChange={this.changeHandler2}
                                       value={this.state.users} name="users" id="users" placeholder={"Please add Collaborators"}/>
                                <br/>
                                <button type="button" className="btn btn-primary" onClick={this.getUser}>ADD</button>
                            </div>


                            <div className={"form-group"}>
                                {
                                    this.state.coloborators.map(userData => {
                                        return (
                                            <div className={"form-group"} key={userData._id}>
                                                {/*<dt>*/}
                                                    {/*<br/>*/}
                                                    {/*{userData.username}*/}
                                                    {/*<button type="button" onClick={()=>{this.removeCollaborators(userData)}}   className="btn btn-primary btn-sm">Remove*/}
                                                    {/*</button>*/}

                                                {/*</dt>*/}

                                                <div className=" form-group input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <input value={userData.username} className="input-group-text btn-secondary text-dark" id="inputGroup-sizing-default"/>
                                                    </div>
                                                    <br/>
                                                    <button type="button" onClick={()=>{this.removeCollaborators(userData)}}   className="btn btn-primary btn-sm">Remove
                                                    </button>
                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <br/>
                            {/*//-------------------------------------------------*/}

                            <div className={"form-group"}>

                                {/*<label className={"text-light"}>Project tags</label>*/}
                                {/*<input type="text" className="form-control" onChange={this.changeHandler2}*/}
                                       {/*value={this.state.field} name="field" id="field" placeholder={"field"}/>*/}
                                {/*<br/>*/}
                                {/*<button type="button" className="btn btn-primary" onClick={this.getField}>ADD Field</button>*/}

                                <div className=" form-group input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text btn-secondary text-dark" id="inputGroup-sizing-default">Project tags</span>
                                    </div>
                                    <input type="text" className="form-control" onChange={this.changeHandler2}
                                           value={this.state.field} name="field" id="field" placeholder={"field"}/>
                                    <br/>
                                    <button type="button" className="btn btn-primary" onClick={this.getField}>ADD</button>
                                </div>


                                <div className={"form-group"}>
                                    {
                                        this.state.tags.map(fieldData => {
                                            return (
                                                <div key={fieldData} className={"form-group"}>
                                                    <dt>
                                                        <div className={"form-group"}>
                                                            {/*<br/>*/}
                                                            {/*<input type="text" className="form-control" onChange={this.changeHandler2}*/}
                                                                   {/*value={fieldData} name="field" id="field" placeholder={"field"}/>*/}
                                                            {/*/!*{fieldData}*!/*/}

                                                            {/*<button type="button"*/}
                                                                    {/*className="btn btn-primary btn-sm">Remove*/}
                                                            {/*</button>*/}


                                                            <div className=" form-group input-group mb-3">
                                                                <div className="input-group-prepend">
                                                                    <input value={fieldData} className="input-group-text btn-secondary text-dark" id="inputGroup-sizing-default"/>
                                                                </div>
                                                                <br/>
                                                                <button type="button" onClick={()=>{this.removeField(fieldData)}} className="btn btn-primary btn-sm">Remove</button>
                                                            </div>



                                                        </div>
                                                    </dt>

                                                </div>
                                            )
                                        })
                                    }


                                </div>
                            </div>

                        {/*//--------------------------------------*/}

                        </div>

                        <div className={"form-group form-check "}>
                            <label className={"text-light"}>
                            <input type='checkbox' checked={this.state.privacy} onChange={this.toggleChange}/> Private
                            </label>

                        </div>

                        <div className={"form-group  "}>
                            <input type="submit" className="btn btn-primary btn-block"/>
                        </div>
                        <div>
                            <label>{this.state2.field}</label>
                            <label>{this.state2.users}</label>
                        </div>

                    </form>
                </div>
            </div>

        );

    }

}

export default Addproject;

