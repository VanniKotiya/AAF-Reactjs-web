import React, { Component } from "react";
import axios from 'axios';

class Mainpage extends Component{
    constructor(props) {
        super(props);
        axios
            .get("http://localhost:8001/api/showposts")
            .then(posts => console.log(posts));
    }

    render() {

        return (
            <div>
                Posts:
            </div>

        )
    };

    
}

export default Mainpage;