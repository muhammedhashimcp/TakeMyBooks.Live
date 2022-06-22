const bcrypt = require('bcrypt');
const securePassword = async(Password) => {
    try {
        const passwordHash = await bcrypt.hash(Password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    securePassword,
    
}