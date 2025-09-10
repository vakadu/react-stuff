import { useEffect, useState } from 'react';

export function useDebounce(value: string) {
	const [query, setQuery] = useState(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setQuery(value);
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [value]);

	return query;
}
