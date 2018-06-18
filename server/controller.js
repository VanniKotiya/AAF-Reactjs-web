const bodyparser = require("body-parser");
var { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");

const User =require('./models/User');
const Post = require ('./models/Post');
const Project = require ('./models/Project');


module.exports = function(app){

    const regValidation = [
        check("email")
            .not()
            .isEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email should be an email address"),
        check("firstname")
            .not()
            .isEmpty()
            .withMessage("First name is required")
            .isLength({ min: 2 })
            .withMessage("Name should be at least 2 letters")
            .matches(/^([A-z]|\s)+$/)
            .withMessage("Name cannot have numbers"),
        check("lastname")
            .not()
            .isEmpty()
            .withMessage("Last name is required")
            .isLength({ min: 2 })
            .withMessage("Last name should be at least 2 letters"),
        check("username")
            .not()
            .isEmpty()
            .withMessage("Username is required")
            .isLength({ min: 2 })
            .withMessage("Username should be at least 2 letters"),
        check("password")
            .not()
            .isEmpty()
            .withMessage("Password is required")
            .isLength({ min: 6 })
            .withMessage("Password should be at least 6 characters"),
        check(
            "password_con",
            "Password confirmation  is required or should be the same as password"
        ).custom(function(value, { req }) {
            if (value !== req.body.password) {
                throw new Error("Password don't match");
            }
            return value;
        }),
        check("email").custom(value => {
            return User.findOne({ email: value }).then(function(user) {
                if (user) {
                    throw new Error("This email is already in use");
                }
            });
        })
    ];
    function register(req, res) {
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({ errors: errors.mapped() });
        }
        var user = new User(req.body);
        user.password = user.hashPassword(user.password);
        user
            .save()
            .then(user => {
                return res.json(user);
            })
            .catch(err => res.send(err));
    }

    app.post("/api/register", regValidation, register);
    app.get("/", (req, res) => res.json("sdasdsa"));


    ////login////////////
    const logValidation = [
        check("email")
            .not()
            .isEmpty()
            .withMessage("Email is required"),
        check("password")
            .not()
            .isEmpty()
            .withMessage("Password is required")
    ];

    function loginUser(req, res) {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ errors: errors.mapped() });
        }
        User.findOne({
            email: req.body.email
        })
            .then(function(user) {
                if (!user) {
                    return res.send({ error: true, message: "User does not exist!" });
                }
                if (!user.comparePassword(req.body.password, user.password)) {
                    return res.send({ error: true, message: "Wrong password!" });
                }
                req.session.user = user;
                req.session.isLoggedIn = true;
                return res.send({ message: "You are signed in", id:user._id });
                res.send(user);
            })
            .catch(function(error) {
                console.log(error);
            });

    }
    app.post("/api/login",logValidation,loginUser);
///////is logged///
    function isLoggedin (req,res){
        if (req.session.isLoggedIn){
            res.send(true);
        } else{
            res.send(false);
        }
    }
    app.get("/api/isloggedin",isLoggedin);

//-----post validation--//
    const postValidation = [
        check("Post")
            .not()
            .isEmpty()
            .withMessage("Please write something.")
    ];

    function addPost(req,res) {
        var errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send({errors:errors.mapped()});
        }
       var post = new Post(req.body);
        if (req.session.user){
            post.user = req.session.user._id;
            post
                .save()
                .then(user => {
                    res.json(post);
                })
                .catch(error => {
                    res.json(error);
                });
        }else {
            return res.send({error: "you are not logged in!"});
        }


    }

    function addProjects(req,res) {
        var errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send({errors:errors.mapped()});
        }
        var project = new Project(req.body);
        // if (req.session.user) {
            // project.user = req.session.user._id;
            project
                .save()
                .then(user => {
                    console.log(user);
                    return res.json("posted");
                })
                .catch(error => {
                    res.json(error);
                });
        // }else {
           // return res.send({error: "you are not logged in!"});
        //}



    }



    app.post("/api/addpost",postValidation,addPost);
    app.post("/api/addProjects",addProjects);



    //-----------------
    app.post("/api/postupvote/:id",isLoggedin,(req,res) => {
        Post.findById(req.params.id).then(function(post) {
            post.vote = post.vote + 1;
            post.save().then(function(post) {
                res.send(post);
            });
        });
    });

    app.get("/api/addusers/:id",(req,res) => {
        var use= req.params.id;
        console.log(use);
        User.findOne ({ $or: [ {username:use}, {email:use} ] })
            .then(function(post) {

                res.send(post);
            });
        });

    app.get("/api/addusersprofile/:id",(req,res) => {
        var use= req.params.id;
        console.log(use);
        User.findOne ({ $or: [ {_id:use} ] })
            .then(function(post) {

                res.send(post);
            });
    });


    //---------------
    function showPosts(req, res) {
        Post.find()
            .populate("user", ["username", "email"])
            .sort({ vote: "desc" })
            .then(post => {
                res.json(post);
            })
            .catch(error => {
                res.json(error);
            });
    }
    app.get("/api/showposts",showPosts);

    function showPublicPost(req, res) {
        Project.find({privacy:true})
            //.populate("user", ["username", "email"])
            //.sort({ vote: "desc" })

            .then(post => {
                res.json(post);
            })
            .catch(error => {
                res.json(error);
            });
    }
    app.get("/api/showPublicPost",showPublicPost);

    ////---LOG out---///////
    app.get("/api/logout",(req,res) => {
        req.session.destroy();

        res.send({message: "Logged out"});
    });

    function updateUser (req, res){
        const id = req.param('id');
        var data = req.body;
        console.log(id);
        console.log(data);
        var user = new User({
            "_id":id,
            "firstname":data.firstname,
            "username":data.username,
            "lastname":data.lastname,
            "password":data.password,
            "email":data.email,
        });
        user.password = user.hashPassword(user.password);

        User.update({
            _id:id}, user)
            .then(data => {
                res.status(200).send({success:true, message: "Successfully updated"});
                console.log(data);
            }).catch(err => {
            console.log(err);
            res.status(500).send({success:false,message:"Error:- " + err});
        })
    }
    app.put('/api/updateuser', updateUser);

    function delproject (req, res){
        var id = req.param('id');

        console.log(id);

        Project.remove({
            _id:id})
            .then(data => {
                res.status(200).send({success:true, message: "project removed"});
            }).catch(err => {
            res.status(500).send({success:false,  message:"Error:- " + err});
        })
    }

    app.delete('/app/delproject', delproject);


    //--------show my projects---------------------

    // this.getAllUserProjects = (Uid) => {
    //     return new Promise((resolve, reject) => {
    //         Project.find({$or :
    //                 [{ projectOwner: Uid},
    //                     {Collaborators:{$elemMatch:{_id:Uid}}}]}
    //         )
    //             .then(function (project) {
    //                 if (!project) {
    //                     reject({status: 500, "success":false , errors:"Project not found"});
    //                 }
    //                 else {
    //                     if (project.length>0){
    //                         resolve({status:200,  "success":true , message: "Project found", name:project});
    //                     }
    //                     reject({status: 500, "success":false , errors:"Project not found"});
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 reject({status: 500, "success":false , errors:"Project not found"});
    //             })
    //     })
    // }

    function showMyProjects(req, res) {
        const id = req.param('id');
        console.log(req.param("id"));
        Project.find({$or :
                    [{ user: id}, {coloborators:{$elemMatch:{_id:id}}}]}
        )
            .then(post => {
                res.json(post);
            })
            .catch(error => {
                res.json(error);
            });
    }
    app.get("/api/showMyProjects",showMyProjects);


    function updateProjects(req,res) {
        const id =req.param('id');
        var data = req.body;
        console.log(id);
        console.log(data);
        var project = new Project({
            "_id":id,
            "projectName":data.projectName,
            "privacy":data.privacy,
            "tags":data.tags,
            "postdescription":data.postdescription,
            "coloborators":data.coloborators,
            "user":data.user

        });
        project
            .update({_id:id}, project)
            .then(data =>{
                res.status(200).send({success:true, message: "Successfully updated"});
                console.log(data);
            }).catch(err =>{
            console.log(err);
            res.status(500).send({success:false,message:"Error:- " + err});
        })
    }
        app.put("/api/updateProjects",updateProjects);





};