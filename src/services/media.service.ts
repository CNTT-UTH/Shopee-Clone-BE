import { Request } from "express";
import { MediaDTO } from "~/models/dtos/MediaDTO";
import { deleteFile, getNameFromFullname, handleUploadImage } from "~/utils/file";
import cloudsService from "~/services/cloud.service";
import { UserRepository } from "~/repository/user.repository";
import path from "path";
import { UPLOAD_IMAGE_DIR } from "~/constants/dir";
import sharp from "sharp";

class MediaService {
    private readonly userRepository: UserRepository = new UserRepository();

    async uploadUserAvatar(req: Request) {
        const files = await handleUploadImage(req);
        const result: MediaDTO[] = await Promise.all(
            files.map(async (file) => {
                
                // Xử lý ảnh với Sharp
                const newName = getNameFromFullname(file.newFilename) + ".jpg";
                const newPath = path.resolve(UPLOAD_IMAGE_DIR, newName);
                console.log(file.filepath);
                await sharp(file.filepath).resize(800, 800).jpeg().toFile(newPath);
                console.log(newPath);
                
                
                // Up ảnh lên cloud
                const res = await cloudsService.uploadImage(newPath);

                // Xóa ảnh trong folder tạm thời
                await deleteFile(newPath);
                await deleteFile(file.filepath);

                // Update DB
                await this.userRepository.updateUserAvatar(req?.decoded?._id as string, res.url);

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
