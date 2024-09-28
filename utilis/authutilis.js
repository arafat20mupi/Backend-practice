const jwt = require('jsonwebtoken');

const generateToken = (userId , secret , expiresIn = '2h' ) =>{
    try{
        const token = jwt.sign({ userId }, secret, { expiresIn });
        return token;
    }
    catch(error){
        console.error('Error generating token:', error);
        return null;
    }
}

const verifyToken = (token , secret) =>{
    try{
        const decoded = jwt.verify(token, secret);
        return decoded;
    }
    catch(error){
        console.error('Error verifying token:', error);
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
}