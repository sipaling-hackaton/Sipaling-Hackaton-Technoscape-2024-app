import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SignedPostPolicyV4Output } from "@google-cloud/storage";
import { Storage } from "@google-cloud/storage";
import { createReference, createSingleReference } from "@/services/database-query";

const uploadFileToBucket = async (formData: FormData, fileName: string) => {
  try {
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      credentials: {
        client_email: process.env.GCP_CLIENT_EMAIL,
        private_key: process.env.GCP_PRIVATE_KEY,
      },
    });

    const bucket = storage.bucket(process.env.GCP_BUCKET_NAME as string);

    const file = formData.get("file") as File;

    const fileBuffer = await file.arrayBuffer();
    const fileBufferUint8Array = new Uint8Array(fileBuffer);

    const fileUpload = bucket.file(fileName);
    const fileUploadStream = fileUpload.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.type,
      },
    });

    fileUploadStream.end(fileBufferUint8Array);
  } catch {
    throw new Error("An error occurred");
  }
};

const generateUniqueFileName = (fileName: string) => {
  const alpanum = "abcdefghijklmnopqrstuvwxyz0123456789";
  const timestamp = new Date().getTime();
  const randomString = Array.from({ length: 5 }, () => alpanum[Math.floor(Math.random() * alpanum.length)]).join("");
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const newFileName = `${sanitizedFileName}-${timestamp}-${randomString}`;
  return newFileName;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fileName = generateUniqueFileName(file.name);

    uploadFileToBucket(formData, fileName);
    const reference = await createSingleReference({
      url: fileName,
      datatype: "pdf",
    });

    return NextResponse.json({ message: "File uploaded", data: reference }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
