import { Injectable } from "@nestjs/common";

@Injectable()
export class ManifestSignerService {
  rewriteVariantNames(masterManifest: string, trackId: string): string {
    return masterManifest
      .split("\n")
      .map((line) => {
        if (line.startsWith("#") || !line.endsWith(".m3u8")) {
          return line;
        }

        return `/tracks/${trackId}/variant/${line.replace(".m3u8", "")}`;
      })
      .join("\n");
  }
}
