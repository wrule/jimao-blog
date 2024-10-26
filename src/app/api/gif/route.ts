import { NextResponse } from 'next/server';
import GIFEncoder from 'gifencoder';
import { Readable } from 'stream';

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
  (formData.getAll('file') as File[]).forEach((file) => {
    Readable.fromWeb(file.stream() as any).pipe(gifStream);
  });
  return NextResponse.json({
    message: '你好，世界',
  });
}
