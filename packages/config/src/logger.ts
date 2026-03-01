export type LogLevel = "info" | "warn" | "error";

export interface LogMessage {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

export function log({ level, message, context }: LogMessage): void {
  const payload = {
    ts: new Date().toISOString(),
    level,
    message,
    context
  };

  if (level === "error") {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(payload));
    return;
  }

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(payload));
}
