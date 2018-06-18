import React, {Component} from 'react';
import axios from "axios";

import "../css/bootstrap-grid.css";

import Header from "./Header";

// import Addproject from "./Addproject";

class findPublicPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publicPostArray: []

        };
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        axios
            .get('http://localhost:8001/api/showPublicPost')
            .then(result => {
                if (result.data) {
                    //for (let datas of result.data){
                    this.state.publicPostArray.push(result.data);
                    // }

                    this.setState({publicPostArray: this.state.publicPostArray});
                    //alert("fses");

                } else {
                    alert("use not found");
                }
                //return this.setState({userdata:result.data,errors:null,sucess:true });
            });


    }

    getcoloborator = (colloborators) => {
        const coloarray = [];

        for (let colloborator of colloborators) {

            coloarray.push(<div className={"form-group"}>
                <div>

                    <div>{colloborator.username}</div>

                </div>
            </div>);


        }

        return coloarray;
    };


    getProjectList = () => {
        const HTMLarray = [];

        for (let projects of this.state.publicPostArray) {
            for (let project of projects) {
                HTMLarray.push(<div className={"form-group align-middle"}>
                    <div className="container mt-4  ">

                        <div className="row">
                            <div className="col-6 col-sm-6 ">
                                <div className="card  ">
                                    <div className="card-header bg-primary mb-3">
                                        <h3 className="card-title text-white ">
                                            <div className={"form-group"}>{project.projectName}</div>
                                        </h3>
                                    </div>
                                    <div className="card-block text-center text-dark">
                                        <div className={"form-group"}>
                                            <h5>Project Description</h5>

                                            <div className={"form-group"}>

                                                    {project.postdescription}

                                            </div>
                                            <h5>coloborators</h5>
                                            <div className={"form-group"}>{this.getcoloborator(project.coloborators)}</div>

                                            <h5>Tags</h5>
                                            <div className={"form-group"}>
                                                {
                                                    (typeof (project.tags) === 'object') ?
                                                        <div className={"form-group"}>
                                                            {
                                                                project.tags.map((tg) =>
                                                                    <div key={tg} className={"form-group"}>
                                                                        {tg}

                                                                    </div>
                                                                )

                                                            }

                                                        </div>
                                                        : null


                                                }


                                            </div>


                                            {/*<button type="button"  className="btn btn-success btn-sm">Remove</button>*/}
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>


                    </div>
                </div>);


            }


        }

        return HTMLarray;
    }


    render() {
        return (
            <div className={"form-group  "}>
                <div>

                    <Header/>
                    <br/><br/>

                </div>

                {/* <button type="button" className="btn btn-primary"    >ADD Field</button>*/}

                <div className={"form-group"}>
                    {this.getProjectList()}


                </div>
            </div>

        )
    };
}


export default findPublicPost;