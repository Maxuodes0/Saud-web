import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import type { NextRequest } from "next/server";

const VIDEO_PATH = path.join(process.cwd(), "Video", "Supercopa de España 2026.mp4");
const CONTENT_TYPE = "video/mp4";
const CACHE_CONTROL = "public, max-age=0, must-revalidate";
const CONTENT_DISPOSITION = 'inline; filename="supercopa-de-espana-2026.mp4"';

function createBaseHeaders(size: number) {
  return new Headers({
    "Accept-Ranges": "bytes",
    "Cache-Control": CACHE_CONTROL,
    "Content-Disposition": CONTENT_DISPOSITION,
    "Content-Length": String(size),
    "Content-Type": CONTENT_TYPE,
  });
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function HEAD() {
  const file = await stat(VIDEO_PATH);

  return new Response(null, {
    status: 200,
    headers: createBaseHeaders(file.size),
  });
}

export async function GET(request: NextRequest) {
  const file = await stat(VIDEO_PATH);
  const range = request.headers.get("range");

  if (!range) {
    const stream = createReadStream(VIDEO_PATH);

    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 200,
      headers: createBaseHeaders(file.size),
    });
  }

  const match = /bytes=(\d*)-(\d*)/.exec(range);

  if (!match) {
    return new Response("Invalid range request", {
      status: 416,
      headers: {
        "Content-Range": `bytes */${file.size}`,
      },
    });
  }

  const start = match[1] ? Number.parseInt(match[1], 10) : 0;
  const end = match[2] ? Number.parseInt(match[2], 10) : file.size - 1;

  if (
    Number.isNaN(start) ||
    Number.isNaN(end) ||
    start < 0 ||
    end < start ||
    end >= file.size
  ) {
    return new Response("Requested range not satisfiable", {
      status: 416,
      headers: {
        "Content-Range": `bytes */${file.size}`,
      },
    });
  }

  const chunkSize = end - start + 1;
  const stream = createReadStream(VIDEO_PATH, { start, end });
  const headers = createBaseHeaders(chunkSize);

  headers.set("Content-Range", `bytes ${start}-${end}/${file.size}`);

  return new Response(Readable.toWeb(stream) as ReadableStream, {
    status: 206,
    headers,
  });
}
