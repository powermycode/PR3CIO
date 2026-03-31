export interface ParsedTrackMetadata {
  artistName: string;
  title: string;
}

export async function extractTrackMetadata(file: File): Promise<ParsedTrackMetadata> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const embedded = parseId3Metadata(bytes);
  const fileNameParsed = parseFileName(file.name);

  return {
    artistName: embedded.artistName || fileNameParsed.artistName,
    title: embedded.title || fileNameParsed.title
  };
}

export function parseFileName(fileName: string): ParsedTrackMetadata {
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");
  const stripped = withoutExtension
    .replace(/\[(.*?)\]/g, "")
    .replace(/\((.*?)\)/g, "")
    .replace(/[_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const separators = [" - ", " – ", " — ", " | ", " ~ "];

  for (const separator of separators) {
    const parts = stripped.split(separator).map((part) => part.trim()).filter(Boolean);
    if (parts.length >= 2) {
      const [artistName, ...rest] = parts;
      return {
        artistName: titleCase(artistName ?? "New Artist"),
        title: titleCase(rest.join(" "))
      };
    }
  }

  return {
    artistName: "New Artist",
    title: titleCase(stripped)
  };
}

function parseId3Metadata(bytes: Uint8Array): Partial<ParsedTrackMetadata> {
  if (bytes.length < 10 || bytes[0] !== 0x49 || bytes[1] !== 0x44 || bytes[2] !== 0x33) {
    return {};
  }

  const version = bytes[3] ?? 3;
  const tagSize = syncSafeToInt(bytes.slice(6, 10));
  let cursor = 10;

  let artistName = "";
  let title = "";

  while (cursor + 10 <= Math.min(bytes.length, tagSize + 10)) {
    const frameId = decodeAscii(bytes.slice(cursor, cursor + 4));
    const frameSizeBytes = bytes.slice(cursor + 4, cursor + 8);
    const frameSize = version === 4 ? syncSafeToInt(frameSizeBytes) : bigEndianToInt(frameSizeBytes);

    if (!frameId.trim() || frameSize <= 0) {
      break;
    }

    const frameStart = cursor + 10;
    const frameEnd = frameStart + frameSize;
    if (frameEnd > bytes.length) {
      break;
    }

    const frameData = bytes.slice(frameStart, frameEnd);
    if (frameId === "TPE1") {
      artistName = decodeTextFrame(frameData) || artistName;
    }
    if (frameId === "TIT2") {
      title = decodeTextFrame(frameData) || title;
    }

    if (artistName && title) {
      break;
    }

    cursor = frameEnd;
  }

  return {
    artistName: titleCase(artistName.trim()),
    title: titleCase(title.trim())
  };
}

function decodeAscii(bytes: Uint8Array): string {
  return new TextDecoder("ascii").decode(bytes);
}

function decodeTextFrame(frame: Uint8Array): string {
  if (frame.length === 0) {
    return "";
  }

  const encoding = frame[0];
  const content = frame.slice(1);

  if (encoding === 0) {
    return new TextDecoder("iso-8859-1").decode(content).replace(/\u0000/g, "").trim();
  }

  if (encoding === 1 || encoding === 2) {
    return new TextDecoder("utf-16").decode(content).replace(/\u0000/g, "").trim();
  }

  return new TextDecoder("utf-8").decode(content).replace(/\u0000/g, "").trim();
}

function syncSafeToInt(bytes: Uint8Array): number {
  return ((bytes[0] ?? 0) << 21) | ((bytes[1] ?? 0) << 14) | ((bytes[2] ?? 0) << 7) | (bytes[3] ?? 0);
}

function bigEndianToInt(bytes: Uint8Array): number {
  return ((bytes[0] ?? 0) << 24) | ((bytes[1] ?? 0) << 16) | ((bytes[2] ?? 0) << 8) | (bytes[3] ?? 0);
}

function titleCase(value: string): string {
  return value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}
