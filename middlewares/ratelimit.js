const ratelimit = require('express-rate-limit');

module.exports = ratelimit({
    windowMs: 15 * 60 * 1000,
    max:100, 
    message:'Too many request',
});