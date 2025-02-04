import { UPLOAD_IMAGE_TEMP_DIR } from "~/constants/dir";
import { Request } from "express";
import { File } from "formidable";
import fs from "fs";
import { unlink } from "fs/promises";

export const handleUploadImage = async (req: Request, filename?: string) => {
    const formiable = (await import("formidable")).default;
    const form = formiable({
        maxFieldsSize: 300 * 1024,
        uploadDir: UPLOAD_IMAGE_TEMP_DIR,
        keepExtensions: true,
        filter: function ({ name, originalFilename, mimetype }) {
            console.log({ name, originalFilename, mimetype });
            const valid = name === "image" && Boolean(mimetype?.includes("image/"));
            if (!valid) {
                form.emit("error" as any, new Error("File type is not valid") as any);
            }
            return valid;
        },
    });

    return new Promise<File[]>((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }

            // eslint-disable-next-line no-extra-boolean-cast
            if (!Boolean(files.image)) {
                return reject(new Error("File is empty"));
            }

            resolve(files.image as File[]);
        });
    });
};

export const deleteFile = async (filepath: string) => {
    setTimeout(() => {
        fs.unlink(filepath, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(`Delete file successful: ${filepath}`);
            }
        });
    }, 5000);
};

export const getNameFromFullname = (fullname: string) => {
    const namearr = fullname.split(".");
    namearr.pop();
    return namearr.join("");
}