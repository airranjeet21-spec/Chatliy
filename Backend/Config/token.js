import jwt from"jsonwebtoken"
const genToken=async(id)=>{
  try {
      const token=await jwt.sign({userId:id},process.env.JWT_SECRET,{expiresIn:"7d"})
      return token
  } catch (error) {
     console.log("gen token error ");
     return null
  }
}
export default genToken