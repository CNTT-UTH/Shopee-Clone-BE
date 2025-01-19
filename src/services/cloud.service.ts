import { v2 as cloudinary } from "cloudinary";
import { envConfig } from "~/constants/env";

class CloudService {
    constructor() {}
}

class Cloudinary {
    cloud = cloudinary;

    constructor() {
        this.cloud.config({
            cloud_name: envConfig.CLOUD_NAME,
            api_key: envConfig.CLOUD_API_KEY,
            api_secret: envConfig.CLOUD_API_SECRET,
        });
    }

    uploadImage(fileURL: string, name: string){
        
    }
}
