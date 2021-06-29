const fs = require('fs');
const path = require('path');
const mokatabt = require('../models/sadrMokatabat');

const { validationResult } = require('express-validator');


exports.getMokatabat = (req, res, next) => {
    const currentPage = req.query.page|| 1;
    const perPage = 10;
    let totalItems;
    mokatabt.find()
      .countDocuments()
      .then(count => {
        totalItems = count;
        return Post.find()
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
      })
      .then(mokatbat => {
        res.status(200).json({
          message: 'Fetched mokatabt successfully.',
          mokatabt: mokatbat,
          totalItems: totalItems
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};
  

exports.getMokatba = (req, res, next) => {
    const mokatbaId = req.params.MokatbaId;
    mokatabt.findById(mokatbaId)
    .then(mokatba => {
      if (!mokatba) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Mokatba fetched.', mokatba: mokatba });
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};





exports.deleteMokatba = (req, res, next) => {
  const MokatbaId = req.params.MokatbaId;
  Post.findById(MokatbaId)
    .then(mokatba => {
      if (!mokatba) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      return Post.findByIdAndRemove(MokatbaId);
    })
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      user.mokatabat.pull(MokatbaId);
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'Deleted post.' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


