import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (
      !Array.isArray(body) ||
      !body.every(
        (item) =>
          typeof item.name === "string" && typeof item.price === "number"
      )
    ) {
      return NextResponse.json(
        { error: "Invalid item list format" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "public", "itemList.json");
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to write file", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
