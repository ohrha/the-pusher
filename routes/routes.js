const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Pusher = require('pusher');

//CREATE NEW PUHER SCHEMA

var pusher = new Pusher({

    appId: '475223',
    key: 'aab3c05cf0b2d470a486',
    secret: '0f6a54cae9cb9a87fd1d',
    cluster: 'us2',
    encrypted: true

})

router.get('/', (req, res) => {

    res.send('ROUTER');

})

//TRIGGER PUSHER

router.post('/', (req, res) => {

pusher.trigger('OS-POLL', 'OS-VOTE', {
  points: 1,
  os: req.body.os
});
res.json({success: true, message:"Thank-You For Voting!"});

})


module.exports = router;