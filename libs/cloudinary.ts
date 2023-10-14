import {
  v2 as cloudinary,
  UploadApiResponse,
} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure: true,
});

export async function updatePhoto(
  path: string,
  public_id: string,
): Promise<UploadApiResponse> {
  try {
    await removePhoto(public_id);

    return uploadPhoto(path);
  } catch (err: any) {
    throw new Error('CloudinaryError updating photo: ', err);
  }
}

export async function uploadPhoto(
  path: string,
): Promise<UploadApiResponse> {
  try {
    const result = await cloudinary.uploader.upload(path, {
      folder: process.env.CLOUDINARY_FOLDER_NAME as string,
    });

    return result;
  } catch (err: any) {
    throw new Error('CloudinaryError uploading photo: ', err);
  }
}

export async function removePhoto(
  public_id: string,
) {
  try {
    const response = await cloudinary.uploader.destroy(`${process.env.CLOUDINARY_FOLDER_NAME}/${public_id}`);

    if (response?.result !== 'ok') {
      throw new Error('CloudinaryError removing photo');
    }

  } catch (err: any) {
    throw new Error('CloudinaryError removing photo: ', err);
  }
}