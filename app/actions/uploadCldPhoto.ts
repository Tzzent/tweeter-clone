import { UploadApiResponse } from "cloudinary";

import { uploadPhoto } from "@/libs/cloudinary";
import { saveFile, removeFile } from "@/libs/fileActions";

export default async function uploadCldphoto(
  photo: File,
): Promise<UploadApiResponse> {
  try {
    const response = await saveFile(photo);

    const filePath = response.filePath as string;

    const result = await uploadPhoto(filePath);

    await removeFile(filePath);

    return result;

  } catch (err: any) {
    throw new Error(err);
  }
}