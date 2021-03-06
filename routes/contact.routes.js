const router = require("express").Router();
const mongoose = require('mongoose');


//required models
const User = require('../models/User.model.js');
const Contact = require('../models/Contact.model.js');
const Account = require('../models/Account.model.js');
const Deal = require('../models/Deal.model.js');
const { Router } = require("express");


// create an account route
router.post('/contact', (req, res, next) => {
    const { _id } = req.payload;
    const { firstName, email, telephone, location } = req.body;
  
    Contact.create({ firstName, email, telephone, location, user: _id})
      .then((newcontact) => {
          return User.findByIdAndUpdate(_id, {$push : {contacts: newcontact._id}}, {new: true});
      }).then((response) => res.json(response))
      .catch((err) => next(err));
      
});

  // get all accounts route
router.get('/contact', (req, res, next) =>{
    const { _id } = req.payload;
    Contact.find({user:_id}).then((response) => res.json(response))
    .catch((err) => res.json(err));
  
  });

//route to request a single account
router.get('/contact/:contactId', (req, res, next) => {
    const { contactId } = req.params;
    const { _id } = req.payload;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
  
    Contact.findById(contactId).populate('deals accounts').then((response) => {
        if(_id === response.user ) {res.json(response)} else {
      res.status(400).json({ message: 'Specified Id is not valid' })};
        
    })
      .catch((err) => res.json(err));
  });

//route to update a contact
router.put('/contact/:contactId', (req, res, next) => {
    const { contactId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
  
    Contact.findByIdAndUpdate(contactId, req.body, { new: true })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

//route to delete a contact
router.delete('/contact/:contactId', (req, res, next) => {
    const { contactId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
    Contact.findByIdAndRemove(contactId)
      .then(() => res.json({ message: `Contact with ${contactId} was removed successfully` }))
      .catch((err) => res.json(err));
  });


module.exports = router;