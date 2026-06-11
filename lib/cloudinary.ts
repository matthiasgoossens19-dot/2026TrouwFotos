import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export interface WeddingPhoto {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  created_at: string;
  context?: { custom?: { uploader_name?: string } };
}

export async function getWeddingPhotos(): Promise<WeddingPhoto[]> {
  const result = await cloudinary.search
    .expression("folder:wedding-photos")
    .with_field("context")
    .sort_by("created_at", "desc")
    .max_results(200)
    .execute();

  return result.resources as WeddingPhoto[];
}
