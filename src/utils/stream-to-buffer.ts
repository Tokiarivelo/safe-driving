// src/common/stream-to-buffer.ts
import { Readable } from 'stream';

export async function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream
      .on('data', (chunk) => chunks.push(Buffer.from(chunk)))
      .on('error', reject)
      .on('end', () => resolve(Buffer.concat(chunks)));
  });
}
