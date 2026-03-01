import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  type GetObjectCommandInput,
  type PutObjectCommandInput
} from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { getEnv } from "../config/env.schema";

@Injectable()
export class S3Service {
  private readonly env = getEnv();

  private readonly client = new S3Client({
    region: this.env.S3_REGION,
    credentials: {
      accessKeyId: this.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: this.env.AWS_SECRET_ACCESS_KEY
    }
  });

  async upload(input: PutObjectCommandInput) {
    await this.client.send(new PutObjectCommand(input));
  }

  async download(input: GetObjectCommandInput): Promise<Buffer> {
    const output = await this.client.send(new GetObjectCommand(input));
    if (!output.Body) {
      return Buffer.alloc(0);
    }

    const chunks: Uint8Array[] = [];
    for await (const chunk of output.Body as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  }
}
