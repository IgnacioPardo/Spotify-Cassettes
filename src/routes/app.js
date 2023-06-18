import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/app', function (req, res, next) {
    // GET BROWSER METADATA 
    // IF BROWSER IS SAFARI, REDIRECT TO SAFARI PAGE
    var userAgent = req.headers['user-agent'];
    console.log(userAgent);
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        res.sendFile(path.resolve(__dirname, '../build', 'safari.html'));
    } else {
        var access_token = req.query.access_token;
        if (debug) {
            console.log(access_token);
        }
        res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
    }
});

export default router;
