'use client';

import { useEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

const COLUMN_COUNT = 3;
const ITEM_HEIGHT = 300;

export default function Page() {
	const [data, setData] = useState<string[]>([]);

	useEffect(() => {
		const temp = new Array(21000).fill('').map((_, i) => {
			const pad = String(i + 1).padStart(4, '0');
			return `/dump/chellame/frame_${pad}.jpg`;
		});
		setData(temp);
	}, []);

	const parentRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: Math.ceil(data.length / COLUMN_COUNT),
		getScrollElement: () => parentRef.current,
		estimateSize: () => ITEM_HEIGHT,
		overscan: 5,
	});

	return (
		<div ref={parentRef} className="h-screen overflow-auto bg-neutral-950">
			<div
				className="relative w-full"
				style={{ height: rowVirtualizer.getTotalSize() }}
			>
				{rowVirtualizer.getVirtualItems().map((virtualRow) => {
					const rowIndex = virtualRow.index;
					const items = data.slice(
						rowIndex * COLUMN_COUNT,
						(rowIndex + 1) * COLUMN_COUNT
					);

					return (
						<div
							key={virtualRow.key}
							className="absolute left-0 w-full px-4"
							style={{
								transform: `translateY(${virtualRow.start}px)`,
							}}
						>
							<div className="grid grid-cols-2">
								{items.map((src) => (
									<LazyImage key={src} path={src} />
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

function LazyImage({ path }: { path: string }) {
	const loader = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setVisible(true);
				observer.disconnect();
			}
		});

		if (loader.current) {
			observer.observe(loader.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={loader}
			className="w-full bg-neutral-800 flex items-center justify-center"
		>
			{visible ? (
				<img src={path} alt="" className="w-full h-full object-cover" />
			) : (
				<div className="text-white text-sm">Loading...</div>
			)}
		</div>
	);
}
