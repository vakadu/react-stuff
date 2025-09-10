'use client';

import { useEffect, useRef, useState } from 'react';

import { useDebounce } from '@/hooks/use-debounce';
import { Lru } from '@/lib/lru';
import { cn } from '@/lib/utils';

const DUMMY_WORDS = [
	'apple',
	'applet',
	'application',
	'banana',
	'band',
	'bandana',
	'cat',
	'catalog',
	'cater',
	'dog',
	'dough',
	'dove',
	'elephant',
	'fig',
	'grape',
	'grapefruit',
	'graph',
	'grasp',
];

const fakeApi = (query: string) => {
	console.log('fetching from api');

	return new Promise((resolve, reject) => {
		const filteredData = DUMMY_WORDS.filter((word) =>
			word.includes(query.toLowerCase())
		);
		setTimeout(() => {
			resolve(filteredData);
		}, 200);
	});
};

export default function Page() {
	const [input, setInput] = useState('');
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const debounceVal = useDebounce(input);
	const [active, setActive] = useState(-1);
	const [showDropdown, setShowDropdown] = useState(true);
	const cacheRef = useRef(new Lru(50, 300000));

	useEffect(() => {
		if (debounceVal && debounceVal.length > 2) {
			const cached = cacheRef.current.cache.get(debounceVal)?.value;
			if (cached) {
				setSuggestions(cached);
			} else {
				fetchData(debounceVal);
			}
		}
	}, [debounceVal, setSuggestions]);

	const fetchData = async (value: string) => {
		const res = (await fakeApi(value)) as string[];
		cacheRef.current.set(value, res);
		setSuggestions(res);
	};

	const handleChange = (value: string) => {
		setInput(value);
		setShowDropdown(true);
	};

	const onMouseEnter = (i: number) => {
		setActive(i);
	};

	const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'ArrowUp') {
			if (active > 0) {
				setActive((prev) => prev - 1);
			}
		}

		if (e.code === 'ArrowDown') {
			if (active < suggestions.length - 1) {
				setActive((prev) => prev + 1);
			}
		}

		if (e.code === 'Enter') {
			setActive((prev) => prev);
			setShowDropdown(false);
			setInput(suggestions[active]);
		}

		if (e.code === 'Escape') {
			setActive(-1);
			setShowDropdown(false);
		}
	};

	return (
		<div className="p-4">
			<input
				value={input}
				onChange={(e) => handleChange(e.target.value)}
				className="border"
				onKeyDown={(e) => onInputKeyDown(e)}
			/>
			<div className="border max-h-[100px]">
				{showDropdown &&
					suggestions?.map((suggestion, i) => {
						return (
							<div
								className={cn(active === i && 'bg-neutral-300')}
								onMouseEnter={() => onMouseEnter(i)}
								onClick={() => {
									setActive(i);
									setInput(suggestion);
									setShowDropdown(false);
								}}
								key={suggestion}
							>
								{suggestion}
							</div>
						);
					})}
			</div>
		</div>
	);
}
