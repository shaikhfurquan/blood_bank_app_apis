import JWT from 'jsonwebtoken'


export const generateToken = (user) =>{
    try {
        const token = JWT.sign({id : user._id} , process.env.JWT_SECRET , {expiresIn : '7d'})
        return token
    } catch (error) {
        console.log('Error generating token' , error.message);
        
    }
}
