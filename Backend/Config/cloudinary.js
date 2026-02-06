import { v2 as cloudinary } from 'cloudinary';
import fs from"fs"
const uploadOnCloudinary=async(filepath)=>{
cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key:process.env.API_KEY, 
        api_secret:process.env.API_SECRET 
    });
    try {
     const uploadResult = await cloudinary.uploader
       .upload(filepath)
       fs.unlinkSync(filepath)
       return uploadResult.secure_url  
    } catch (error) {
      fs.unlinkSync(filepath)
      console.log(error)
    }
}
export default uploadOnCloudinary;
// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs";
// import dotenv from "dotenv";
// dotenv.config();

// cloudinary.config({ 
//     cloud_name: process.env.CLOUD_NAME, 
//     api_key: process.env.API_KEY, 
//     api_secret: process.env.API_SECRET,
//     secure: true 
// });

// // YEH DEBUGGING KE LIYE HAI: Server start hote hi terminal check karna
// console.log("Cloudinary Cloud Name:", process.env.CLOUD_NAME); 

// const uploadOnCloudinary = async (filepath) => {
//     try {
//         if (!filepath) return null;
//         const uploadResult = await cloudinary.uploader.upload(filepath, {
//             resource_type: "auto",
//         });
//         if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
//         return uploadResult; 
//     } catch (error) {
//         // Agar ab error aaye toh poora error print hoga
//         console.log("CLOUDINARY FULL ERROR:", error);
//         if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
//         return null;
//     }
// }
// export default uploadOnCloudinary;