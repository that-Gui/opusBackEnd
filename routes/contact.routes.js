//required routes
const router = require("express").Router();
const mongoose = require('mongoose');


//required models
const User = require('../models/User.model.js');
const Contact = require('../models/Contact.model.js');
const Account = require('../models/Account.model.js');
const Deal = require('../models/Deal.model.js');


//routes for contacts
router.post('/contact', (req, res, next) => {
    
    const {
        firstName,
        lastName,
        timezone,
        location,
        avatar,
        email,
        telephone,
        jobTitle,
        accounts,
        deals,
        products,
        user,
      } = req.body;
  
    Contact.create({ title, description, tasks: [] })
      .then((response) => res.json(response))
      .catch((err) => next(err));
  });


module.exports = router;
