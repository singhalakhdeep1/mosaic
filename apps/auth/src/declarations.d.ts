declare module 'ioredis' {
    interface RedisOptions {
        host?: string
        port?: number
    }
    class Redis {
        constructor(options?: RedisOptions)
        get(key: string): Promise<string | null>
        setex(key: string, ttl: number, value: string): Promise<string>
        del(...keys: string[]): Promise<number>
        keys(pattern: string): Promise<string[]>
    }
    export { Redis }
    export default Redis
}

declare module 'uuid' {
    export function v4(): string
}
