import process from 'node:process';

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  USER_AGENT:
    process.env.USER_AGENT ||
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
  ACCEPT: process.env.ACCEPT || 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  ACCEPT_ENCODING: process.env.ACCEPT_ENCODING || 'gzip, deflate, br, zstd',
  NO_UPGRADE: process.env.NO_UPGRADE || false,
  CACHE_PERIOD: process.env.CACHE_PERIOD || '1y',
  REDIS_URL: process.env.REDIS_URL,
  REDIS_TTL: process.env.REDIS_TTL || 3600,
  RATE_LIMIT_COOLDOWN: Number.isNaN(+process.env.RATE_LIMIT_COOLDOWN)
    ? 7_200_000
    : Number(process.env.RATE_LIMIT_COOLDOWN),
};

export default env;
