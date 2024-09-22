const WINDOW_SIZE_IN_HOURS = 24;
const MAX_REQUESTS_PER_WINDOW = 5;

interface RequestLog {
  count: number;
  lastReset: number;
}

const ipRequestMap = new Map<string, RequestLog>();

export function rateLimiter(ip: string): boolean {
  const now = Date.now();
  const windowSize = WINDOW_SIZE_IN_HOURS * 60 * 60 * 1000;

  let requestLog = ipRequestMap.get(ip);

  if (!requestLog) {
    requestLog = { count: 0, lastReset: now };
    ipRequestMap.set(ip, requestLog);
  }

  if (now - requestLog.lastReset > windowSize) {
    requestLog.count = 0;
    requestLog.lastReset = now;
  }

  if (requestLog.count < MAX_REQUESTS_PER_WINDOW) {
    requestLog.count++;
    return true;
  }

  return false;
}