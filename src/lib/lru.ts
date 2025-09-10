export class Lru {
	capacity: number;
	ttl: number;
	cache: Map<string, { value: any; timestamp: number }>;

	constructor(capacity = 5, ttl = 300000) {
		this.capacity = capacity;
		this.ttl = ttl;
		this.cache = new Map();
	}

	get(key: string): any {
		const value = this.cache.get(key);

		if (!value) {
			return undefined;
		}

		if (Date.now() - value?.timestamp > this.ttl) {
			this.cache.delete(key);
			return undefined;
		}

		this.cache.delete(key);
		this.cache.set(key, { value, timestamp: Date.now() });
	}

	has(key: string): boolean {
		const value = this.cache.get(key);
		if (!value) {
			return false;
		}
		if (Date.now() - value?.timestamp > this.ttl) {
			this.cache.delete(key);
			return false;
		}

		return true;
	}

	set(key: string, value: any): void {
		if (this.cache.has(key)) {
			this.cache.delete(key);
		}
		this.cache.set(key, { value, timestamp: Date.now() });

		if (this.cache.size > this.capacity) {
			const oldestKey = this.cache.keys().next().value as string;
			this.cache.delete(oldestKey);
		}
	}
}
