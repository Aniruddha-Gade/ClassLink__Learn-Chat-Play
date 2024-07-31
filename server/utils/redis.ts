import Redis from 'ioredis'
require('dotenv').config()

const REDIS_URL: string = process.env.REDIS_URL || ''

const redisClient = () => {
    if (REDIS_URL) {
        console.log("Redis Connected")
        return REDIS_URL
    }
    throw new Error("Redis connection failed")
}

export const redis = new Redis(redisClient())