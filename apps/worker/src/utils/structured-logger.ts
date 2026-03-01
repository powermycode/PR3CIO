export function logInfo(message: string, context?: Record<string, unknown>): void {
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify({
      ts: new Date().toISOString(),
      level: "info",
      message,
      context
    })
  );
}

export function logError(message: string, context?: Record<string, unknown>): void {
  // eslint-disable-next-line no-console
  console.error(
    JSON.stringify({
      ts: new Date().toISOString(),
      level: "error",
      message,
      context
    })
  );
}
