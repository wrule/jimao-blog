import { NextResponse } from 'next/server';
 
export
async function POST(request: Request) {
  const formData = await request.formData();
  const buffers = await Promise.all(
    (formData.getAll('file') as File[])
      .map(async (file) => Buffer.from(await file.arrayBuffer()))
  );
  buffers.forEach((buffer) => {
    console.log(buffer.length);
  });
  return NextResponse.json({
    message: '你好，世界',
  });
}
