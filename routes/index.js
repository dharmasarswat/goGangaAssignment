const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User')

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// post data to /dashboard
router.post('/dashboard', ensureAuthenticated , (req,res)=>{
  const { name, education, about_me, work_position, work_employer, location, relationship_status, looking_for, intrest } = req.body;
  let errors = [];

  if (errors.length > 0) {
    res.render('dashboard', {
      errors,
      user:{ name, education, about_me, work_position, work_employer, location, relationship_status, looking_for, intrest }
    });
  } else {
    User. findByIdAndUpdate({ _id : req.user._id } , { name, education, about_me, work_position, work_employer, location, relationship_status, looking_for, intrest } , {new: true}).then(user => {
      req.flash('success_msg', 'Information Updated Successfully!!');
      res.redirect('/dashboard');
    }).catch(err=> console.log(err));
  }
});

// Edit User Information
router.get('/editInfo', ensureAuthenticated, (req, res) =>
  res.render('editInfo', {
    user: req.user
  })
);

// post data to /editInfo
router.post('/editInfo', ensureAuthenticated , (req,res)=>{
  const { name, education, about_me, work_position, work_employer, location, relationship_status, looking_for, intrest } = req.body;
  let errors = [];

  if (errors.length > 0) {
    res.render('editInfo', {
      errors,
      user:{ name, education, about_me, work_position, work_employer, location, relationship_status, looking_for, intrest }
    });
  } else {
    User. findByIdAndUpdate({ _id : req.user._id } , { name, education, about_me, work_position, work_employer, location, relationship_status, looking_for, intrest } , {new: true}).then(user => {
      req.flash('success_msg', 'Information Updated Successfully!!');
      res.redirect('/editInfo');
    }).catch(err=> console.log(err));
  }
});

router.get('/search' ,  (req,res)=>{
  var response= undefined
  res.render("search",{
    response
  })
});

router.post('/search' ,  (req,res)=>{
  const {username, location} = req.body;
  let errors = [];

  if(!username && !location){
    errors.push({ msg: 'Please enter username or location to search...' });
  }

  if (errors.length > 0) {
    res.render('search', {
      errors
    });
  } else{
    if(!location){ 
      User
        .find({name: { $regex:  username , $options: 'i'}})
        .then(response => {
          res.render('search', {
            response
          })
        })
        .catch(err => {
          errors.push({msg: "Error! Please Try again"})
          res.render('search' , {
            errors
          })
        })
    }
    else if(!username){
      User
        .find({location: { $regex:  location , $options: 'i'}})
        .then(response => {
          res.render('search', {
            response
          })
        })
        .catch(err => {
          errors.push({msg: "Error! Please Try again"})
          res.render('search' , {
            errors
          })
        })
    }
    else{
      User
        .find({name: { $regex:  username , $options: 'i'}, location: { $regex:  location , $options: 'i'}})
        .then(response => {
          res.render('search', {
            response
          })
        })
        .catch(err => {
          errors.push({msg: "Error! Please Try again"})
          res.render('search' , {
            errors
          })
        })
    }
  }
})

module.exports = router;
