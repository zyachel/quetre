/* eslint-disable no-unused-vars */
import Redis from 'ioredis';
import env from './env.js';

const redisUrl = env.REDIS_URL;
export const ttl = env.REDIS_TTL;

/** @type {InstanceType<typeof Redis>} */
const stub = {
  get: async () => { },
  set: async () => { },
  expire: async () => { },
};

const redis = redisUrl ? new Redis(redisUrl) : stub;
export default redis;
