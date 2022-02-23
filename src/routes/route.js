const express = require('express');
const router = express.Router();

router.get('/sol1', function (req, res) {
    let arr = [1,2,3,4,5,7,8,9]
    let arrSum = 0;
    let sum = 0;
    
    for(let i =0;i<arr.length;i++){
        sum = arr[i]*(arr[i]+1)/2
    }

    for(let i = 0;i<arr.length;i++){
        arrSum += arr[i]
    }
    let missingNumber = sum - arrSum;
    res.send({data:missingNumber});
});

module.exports = router;