import {
  CopyObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  type GetObjectCommandInput
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";
import { getEnv } from "../config/app.config";

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

  async getUploadUrl(params: { bucket: string; key: string; contentType: string; expiresIn?: number }) {
    const command = new PutObjectCommand({
      Bucket: params.bucket,
      Key: params.key,
      ContentType: params.contentType
    });

    return getSignedUrl(this.client, command, {
      expiresIn: params.expiresIn ?? 300
    });
  }

  async getDownloadUrl(params: { bucket: string; key: string; expiresIn?: number }) {
    const command = new GetObjectCommand({
      Bucket: params.bucket,
      Key: params.key
    });

    return getSignedUrl(this.client, command, {
      expiresIn: params.expiresIn ?? 120
    });
  }

  async getObjectText(input: GetObjectCommandInput): Promise<string> {
    const output = await this.client.send(new GetObjectCommand(input));
    if (!output.Body) {
      return "";
    }

    const chunks: Uint8Array[] = [];
    for await (const chunk of output.Body as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks).toString("utf8");
  }

  async copyObject(params: {
    sourceBucket: string;
    sourceKey: string;
    destinationBucket: string;
    destinationKey: string;
  }) {
    await this.client.send(
      new CopyObjectCommand({
        CopySource: `/${params.sourceBucket}/${params.sourceKey}`,
        Bucket: params.destinationBucket,
        Key: params.destinationKey
      })
    );
  }
}
