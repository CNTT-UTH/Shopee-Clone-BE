import { Request } from "express";
import { MediaDTO } from "~/models/dto/MediaDTO";
import { handleUploadImage } from "~/utils/file";
import cloudsService from "~/services/cloud.service";

class MediaService {
    async uploadImage(req: Request) {
        const files = await handleUploadImage(req);
        const result: MediaDTO[] = await Promise.all(
            files.map(async (file) => {
                console.log(file.filepath);
                const res = await cloudsService.uploadImage(file.filepath);
                return {
                    url: res.url,
                    type: "image",
                };
            }),
        );
        return result;
    }
}

export default new MediaService();
