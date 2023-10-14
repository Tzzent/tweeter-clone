import { v4 as uuidv4 } from "uuid";
import { join } from "path";
import { writeFile, unlink } from "fs/promises";

export async function saveFile(
  file: File
): Promise<{ filePath: String, fileName: String }> {
  try {
    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);

    const name = uuidv4();
    const extention = file.type.split('/')[1];

    const tempDir = join(process.cwd(), 'temp');
    const filePath = join(tempDir, `${name}.${extention}`);

    await writeFile(filePath, buffer);

    return {
      filePath,
      fileName: file.name,
    }
  } catch (err) {
    throw new Error('Error saving file to local /temp');
  }
}

export async function removeFile(filePath: string) {
  try {
    await unlink(filePath);
  } catch (error) {
    throw new Error('Error removing file from local /temp');
  }
}