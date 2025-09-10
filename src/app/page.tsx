import Link from 'next/link';

const routes = ['typehead'];

const Page = async () => {
	return (
		<div className="grid grid-cols-4 p-4 max-w-2xl mx-auto">
			{routes.map((route) => {
				return (
					<Link
						className="col-span-1 bg-orange-600 p-4 flex justify-center items-center rounded-lg"
						href={`/${route}`}
						key={route}
					>
						<span className="text-white font-semibold">
							{route[0].toUpperCase() + route.slice(1)}
						</span>
					</Link>
				);
			})}
		</div>
	);
};

export default Page;
