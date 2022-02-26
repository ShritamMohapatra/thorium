const express = require('express');
const router = express.Router();
let players = [];


router.post('/players',function(req,res){
    let player = req.body;
    let playerName = player.name
    for(let i = 0;i<players.length;i++){
        if(players[i].name === playerName){
            return res.send('player already exsit')
        }
        
    }
    players.push(player);
    res.send({result : players, status : true});

});

router.post('/players/:playerName/bookings/:bookingId',function(req,res){
    let name = req.params.playerName
    let booking = req.body
    let bookingId = req.params.bookingId
    let isPlayerPresent = false

    for(let i = 0;i<players.length;i++){
        if(players[i].name === name){
            isPlayerPresent = true
            for(let j = 0;j<players[i].bookings.length;j++){
                if(players[i].bookings[j].bookingNumber === bookingId){
                    return res.send("booking is already present")
                }
            }
            players[i].bookings.push(booking)
            

        }
    }if(isPlayerPresent){
        res.send(players)
    }else{
        res.send("Player not present")
    }
})



module.exports = router;