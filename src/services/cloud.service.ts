import { v2 as cloudinary } from 'cloudinary';
import { envConfig } from '~/constants/env';
import HTTP_STATUS from '~/constants/httpStatus';
import { ApiError } from '~/utils/errors';

export class CloudService {
    constructor() {}
}

export class Cloudinary {
    cloud = cloudinary;

    constructor() {
        this.cloud.config({
            cloud_name: envConfig.CLOUD_NAME,
            api_key: envConfig.CLOUD_API_KEY,
            api_secret: envConfig.CLOUD_API_SECRET,
        });
    }

    /**
     * Upload Response: https://cloudinary.com/documentation/node_image_and_video_upload#upload_response
     */
    async uploadImage(filepath: string) {
        const result = await this.cloud.uploader.upload(filepath).then((result) => result);
        return result;
    }
}
