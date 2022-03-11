const router = require("express").Router();
const mongoose = require('mongoose');


//required models
const User = require('../models/User.model.js');
const Contact = require('../models/Contact.model.js');
const Account = require('../models/Account.model.js');
const Deal = require('../models/Deal.model.js');
const { Router } = require("express");


// create an account route
router.post('/deal', (req, res, next) => {
    const { _id } = req.payload;
    const {name, closeDate, sum, stages, products } = req.body;
  
    Deal.create({name, closeDate, sum, stages, products, user: _id})
      .then((newdeal) => {
          return User.findByIdAndUpdate(_id, {$push : {deals: newdeal._id}}, {new: true});
      }).then((response) => res.json(response))
      .catch((err) => next(err));
      
});

  // get all accounts route
router.get('/deal', (req, res, next) =>{
    const { _id } = req.payload;
    Deal.find({user:_id}).then((response) => res.json(response))
    .catch((err) => res.json(err));
  
  });

//route to request a single account
router.get('/deal/:dealId', (req, res, next) => {
    const { dealId } = req.params;
    const { _id } = req.payload;
    if (!mongoose.Types.ObjectId.isValid(dealId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
  
    Deal.findById(dealId).populate('contacts accounts products').then((response) => {
        if(_id === response.user ) {res.json(response)} else {
      res.status(400).json({ message: 'Specified Id is not valid' })};
        
    })
      .catch((err) => res.json(err));
  });

//route to update a contact
router.put('/deal/:dealId', (req, res, next) => {
    const { dealId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(dealId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
  
    Deal.findByIdAndUpdate(dealId, req.body, { new: true })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  });

//route to delete a contact
router.delete('/deal/:dealId', (req, res, next) => {
    const { dealId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(dealId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
    Deal.findByIdAndRemove(dealId)
      .then(() => res.json({ message: `Deal with ${dealId} was removed successfully` }))
      .catch((err) => res.json(err));
  });


module.exports = router;