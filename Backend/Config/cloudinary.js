// import { v2 as cloudinary } from 'cloudinary';
// import fs from"fs"
// const uploadOnCloudinary=async(filepath)=>{
// cloudinary.config({ 
//         cloud_name:process.env.CLOUD_NAME, 
//         api_key:process.env.API_KEY, 
//         api_secret:process.env.API_SECRET 
//     });
//     try {
//      const uploadResult = await cloudinary.uploader
//        .upload(filepath);
//        fs.unlinkSync(filepath);
//        return uploadResult.secure_url  
//     } catch (error) {
//       fs.unlinkSync(filepath)
//       console.log(error)
//     }
// }
// export default uploadOnCloudinary;
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

const uploadOnCloudinary = async (fileBuffer) => {
    try {
        if (!fileBuffer) return null;

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto" },
                (error, result) => {
                    if (error) {
                        console.log("Cloudinary Stream Error:", error);
                        reject(null);
                    } else {
                        resolve(result.secure_url);
                    }
                }
            );
            // File ke buffer ko stream mein pass karna
            uploadStream.end(fileBuffer);
        });

    } catch (error) {
        console.log("Cloudinary Main Error:", error);
        return null;
    }
};

export default uploadOnCloudinary;
