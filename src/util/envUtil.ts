type ServerEnvironment = 'production' | 'vercel' | 'localhost';

export function getBaseUrl(): string {
    const env = getEnv();
    if (env === 'production')
        return 'https://spotifyrater.leoata.com';
    else if (env === 'vercel')
        return "https://" + process.env.VERCEL_URL as string;
    else
        return 'http://localhost:3000';
}

export function getEnv(): ServerEnvironment {
    if (process.env.NODE_ENV === 'production')
        return 'production';
    if (process.env.VERCEL_URL)
        return 'vercel';
    return 'localhost';
}
