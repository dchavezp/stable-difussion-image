import cloudinari from "cloudinary"
const cloudinaryApi = cloudinari.v2;
cloudinaryApi.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
export default cloudinaryApi;