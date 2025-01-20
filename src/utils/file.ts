import { UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dir';

export const handleUploadImage = async (filename: string) => {
     const formiable = (await import('formidable')).default;
     const form = formiable({
          maxFieldsSize: 300 * 1024,
          uploadDir: UPLOAD_IMAGE_TEMP_DIR,
          keepExtensions: true,
          filter: function ({ name, originalFilename, mimetype }) {
               const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
               if (!valid) {
                    form.emit('error' as any, new Error('File type is not valid') as any)
               }
               return valid
          }
     })
}