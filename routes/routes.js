const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Pusher = require('pusher');

//CREATE NEW PUHER SCHEMA

var pusher = new Pusher({
  appId: '475223',
  key: 'f756d847238c8314427d',
  secret: 'e2ca54fbf0cf6129e3b2',
  cluster: 'us2',
  encrypted: true
});
console.log(pusher)
console.log(Pusher)

   pusher.trigger('os-poll', 'os-vote', {
  "message": "hello world"
    },(res,err)=>{

      if(err){
        console.log("error")
        console.log(err);
      }else{
        console.log("RESPONSE")
        console.log(res.body);
      }
      
    });

router.get('/', (req, res) => {

    res.send('ROUTER');
    pusher.trigger('os-poll', 'os-vote', {
  points:1,
  os:req.body.os
    });

})

//TRIGGER PUSHER

router.post('/', (req, res) => {
  
console.log(req.body.os);
   pusher.trigger('os-poll', 'os-vote', {
  points:1,
  os:req.body.os
    });
/*
pusher.trigger('os-poll', 'os-vote', {
  points: 1,
  os: req.body.os
});
*/
return res.json({success: true, message:"Thank-You For Voting!",data:{points:1,os:req.body.os}});

})


module.exports = router;