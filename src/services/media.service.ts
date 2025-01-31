import { Request } from "express";
import { MediaDTO } from "~/models/dtos/MediaDTO";
import { deleteFile, handleUploadImage } from "~/utils/file";
import cloudsService from "~/services/cloud.service";
import { UserRepository } from "~/repository/user.repository";

class MediaService {
    private readonly userRepository: UserRepository = new UserRepository();

    async uploadUserAvatar(req: Request) {
        const files = await handleUploadImage(req);
        const result: MediaDTO[] = await Promise.all(
            files.map(async (file) => {
                console.log(file.filepath);

                //Up ảnh lên cloud
                const res = await cloudsService.uploadImage(file.filepath);

                // Xóa ảnh trong folder tạm thời
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
