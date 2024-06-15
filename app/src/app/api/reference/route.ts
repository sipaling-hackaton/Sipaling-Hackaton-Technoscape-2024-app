import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAllReference, createReference, deleteReference } from "@/services/database-query";

// To handle a GET request to /api
export async function GET(request: NextRequest) {
  try {
    const references = await getAllReference();
    return NextResponse.json(references, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const references = await createReference(body);
    return NextResponse.json(references, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const reference = await deleteReference(id as string);
    return NextResponse.json(reference, { status: 200 });
  } catch {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
