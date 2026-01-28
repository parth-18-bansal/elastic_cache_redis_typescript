import { Redis, RedisOptions } from 'ioredis';

const config: RedisOptions = {
  host: 'your-cache-name.abcde123.serverless.use1.cache.amazonaws.com',
  port: 6379,
  // Required: Serverless ElastiCache always requires TLS
  tls: {}, 
  // Optional: If you enabled RBAC/User Groups in AWS
  // username: 'your-username', 
  // password: 'your-password',
  
  // Best practice: retry strategy for serverless environments
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  connectTimeout: 10000,
};

// 2. Initialize the client
const redis = new Redis(config);

// 3. Simple usage example
async function runRedisApp() {
  try {
    console.log('Connecting to ElastiCache...');
    
    await redis.set('app_status', 'connected');
    const val = await redis.get('app_status');
    
    console.log('Successfully connected! Key value:', val);
  } catch (error) {
    console.error('Redis Error:', error);
  } finally {
    // Gracefully shut down
    redis.disconnect();
  }
}

runRedisApp();