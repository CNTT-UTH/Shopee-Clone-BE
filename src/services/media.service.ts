import { Request } from 'express';
import { MediaDTO } from '~/models/dtos/MediaDTO';
import { checkIfDirectoryExist, deleteFile, getNameFromFullname, handleUploadImage } from '~/utils/file';
import { Cloudinary } from '~/services/cloud.service';
import { UserRepository } from '~/repository/user.repository';
import path from 'path';
import { UPLOAD_IMAGE_DIR, UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dir';
import sharp from 'sharp';
import { ShopRepository } from '~/repository/shop.repository';

const cloudsService = new Cloudinary();

export class MediaService {
    private readonly userRepository: UserRepository = new UserRepository();
    private readonly shopRepository: ShopRepository = new ShopRepository();

    constructor() {}

    async uploadUserAvatar(req: Request) {
        const files = await handleUploadImage(req);
        const result: MediaDTO[] = await Promise.all(
            files.map(async (file) => {
                // Kiểm tra đường dân

                // Xử lý ảnh với Sharp
                const newName = getNameFromFullname(file.newFilename) + '.jpg';
                const newPath = path.resolve(UPLOAD_IMAGE_DIR, newName);
                await sharp(file.filepath).resize(800, 800).jpeg().toFile(newPath);

                // Up ảnh lên cloud
                const res = await cloudsService.uploadImage(newPath);

                // Xóa ảnh trong folder tạm thời
                await deleteFile(newPath);
                await deleteFile(file.filepath);

                // Update DB
                await this.userRepository.updateUserAvatar(req?.decoded?._id as string, res.url);

                return {
                    url: res.url,
                    type: 'image',
                };
            }),
        );
        return result;
    }

    async uploadImagesProduct(req: Request) {
        const files = await handleUploadImage(req);
        const shop_id: string = req.decoded?._id as string;

        // Lưu ảnh tạm thời
        const result: MediaDTO[] = await Promise.all(
            files.map(async (file) => {
                // Xử lý ảnh với Sharp
                const newName = getNameFromFullname(file.newFilename) + '.jpg';
                const newPath = path.resolve(UPLOAD_IMAGE_DIR, newName);
                await sharp(file.filepath).resize(800, 800).jpeg().toFile(newPath);

                // Up ảnh lên cloud
                const res = await cloudsService.uploadImage(newPath);

                // Xóa ảnh trong folder tạm thời
                await deleteFile(newPath);
                await deleteFile(file.filepath);

                return {
                    url: res.url,
                    type: 'image',
                };
            }),
        );

        return result;
    }
}
