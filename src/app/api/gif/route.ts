import { NextResponse } from 'next/server';
import GIFEncoder from 'gifencoder';

export
async function POST(request: Request) {
  const formData = await request.formData();
  // const buffers = await Promise.all(
  //   (formData.getAll('file') as File[])
  //     .map(async (file) => Buffer.from(await file.arrayBuffer()))
  // );
  // buffers.forEach((buffer) => {
  //   console.log(buffer.length);
  // });
  const encoder = new GIFEncoder(854, 480);
  const gifStream = encoder.createWriteStream({
    repeat: -1, delay: 500, quality: 10,
  });
  return NextResponse.json({
    message: '你好，世界',
  });
}
