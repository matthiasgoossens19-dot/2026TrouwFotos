import { NextResponse } from "next/server";
import { getWeddingPhotos } from "@/lib/cloudinary";

export const revalidate = 0;

export async function GET() {
  try {
    const photos = await getWeddingPhotos();
    return NextResponse.json(photos);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}
