import { Request } from "express";
import { MediaDTO } from "~/models/dto/MediaDTO";
import { handleUploadImage } from "~/utils/file";

class MediaService {
    async uploadImage(req: Request) {
        const files = await handleUploadImage(req);
        const result: MediaDTO[] = await Promise.all(
            files.map(async (file) => {
                return {
                    url: "",
                    type: "image",
                };
            }),
        );
        return result;
    }
}
