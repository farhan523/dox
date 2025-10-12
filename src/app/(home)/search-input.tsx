"use client";

import {Search} from "lucide-react";
import {useState} from "react";
import {X} from "lucide-react";
import useSearchParams from "@/hooks/use-search-params";

export default function SearchInput() {
	const [search, setSearch] = useSearchParams("search");
	const [value, setValue] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSearch(value);
	};

	return (
		<div className='flex-1 flex items-center justify-center space-x-2'>
			<form
				onSubmit={handleSubmit}
				className='flex-1 flex items-center  w-full max-w-[720px] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
			>
				<button
					type='button'
					// onClick={onSearch}
					className='pl-2 py-2  border-none outline-none'
				>
					<Search />
				</button>
				<input
					type='text'
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							// onSearch();
						}
					}}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder='Search documents...'
					className='w-full px-4 py-2 outline-none'
				/>
				{search && (
					<button
						className='border-none outline-none cursor-pointer px-2'
						type='button'
						onClick={() => {
							setValue("");
							setSearch(null);
						}}
					>
						<X />{" "}
					</button>
				)}
			</form>
		</div>
	);
}
