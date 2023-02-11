/* eslint-disable no-unused-vars */
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;

const stub = {
  get: async key => {},
  set: async (key, value, secondsToken, seconds) => {},
};

const redis = redisUrl ? new Redis(redisUrl) : stub;
export default redis;
