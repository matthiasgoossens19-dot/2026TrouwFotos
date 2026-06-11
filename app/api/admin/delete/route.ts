import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req: NextRequest) {
  const { password, public_id } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!public_id) {
    return NextResponse.json({ error: "Missing public_id" }, { status: 400 });
  }

  await cloudinary.uploader.destroy(public_id);
  return NextResponse.json({ success: true });
}
