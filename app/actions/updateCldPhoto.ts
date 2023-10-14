import { UploadApiResponse } from "cloudinary";

import { updatePhoto } from "@/libs/cloudinary";
import { saveFile, removeFile } from "@/libs/fileActions";

export default async function updateCldPhoto(
  photo: File,
  public_id: string,
): Promise<UploadApiResponse> {
  try {
    const response = await saveFile(photo);

    const filePath = response.filePath as string;

    const result = await updatePhoto(filePath, public_id);

    await removeFile(filePath);

    return result;

  } catch (err: any) {
    throw new Error(err);
  }
}