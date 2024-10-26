import { NextResponse } from 'next/server';
import sharp from 'sharp';

export
async function POST(request: Request) {
  const formData = await request.formData();
  const buffers = await Promise.all(
    (formData.getAll('file') as File[])
      .map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return await sharp(buffer).resize(300, 150).toBuffer();
      })
  );
  const gifBuffer = await sharp(buffers[0], { animated: true }).gif({ loop: 0, delay: 250 }).composite(
    buffers.slice(1).map((buffer) => ({
      input: buffer,
      top: 0,
      left: 0,
      gravity: 'center',
    }))
  ).toBuffer();
  return new Response(gifBuffer, {
    headers: {
      'Content-Type': 'image/gif',
      'Content-Length': gifBuffer.length.toString(),
    },
  });
  return NextResponse.json({
    message: '你好，世界',
  });
}
