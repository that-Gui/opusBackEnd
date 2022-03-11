const router = require("express").Router();
const mongoose = require('mongoose');


//required models
const User = require('../models/User.model.js');
const Contact = require('../models/Contact.model.js');
const Account = require('../models/Account.model.js');
const Deal = require('../models/Deal.model.js');
const { Router } = require("express");


// create an account route
router.post('/account', (req, res, next) => {
    const { _id } = req.payload;
    const { name, industryType, email, telephone } = req.body;
  
    Account.create({name, industryType, email, telephone, user: _id})
      .then((newacc) => {
          return User.findByIdAndUpdate(_id, {$push : {accounts: newacc._id}}, {new: true});
      }).then((response) => res.json(response))
      .catch((err) => next(err));
      
});

  // get all accounts route
router.get('/account', (req, res, next) =>{
    const { _id } = req.payload;
    Account.find({user:_id}).then((response) => res.json(response))
    .catch((err) => res.json(err));
  
  });

//route to request a single account
router.get('/account/:accountId', (req, res, next) => {
    const { accountId } = req.params;
    const { _id } = req.payload;
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
  
    Account.findById(accountId).populate('contacts deals').then((response) => {
        if(_id === response.user ) {res.json(response)} else {
      res.status(400).json({ message: 'Specified Id is not valid' })};
        
    })
      .catch((err) => res.json(err));
  });

//route to update a contact
router.put('/account/:accountId', (req, res, next) => {
    const { accountId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
  
    Account.findByIdAndUpdate(accountId, req.body, { new: true })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

//route to delete a contact
router.delete('/account/:accountId', (req, res, next) => {
    const { accountId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(accountId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
    Account.findByIdAndRemove(accountId)
      .then(() => res.json({ message: `Account with ${accountId} was removed successfully` }))
      .catch((err) => res.json(err));
  });


module.exports = router;