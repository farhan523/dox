"use client";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";
import TemplateGallery from "./template-gallery";
import {usePaginatedQuery} from "convex/react";
import { api } from "../../../convex/_generated/api";

import {DocumentsTable} from "./documents-table";
import {useSearchParams} from "next/navigation";

export default function Home() {
	const search = useSearchParams();
	const {results, status, loadMore, isLoading} = usePaginatedQuery(
		api.document.listDocuments,
		{search: search.get("search") ?? undefined},
		{initialNumItems: 5},
	);

	

	return (
		<div className='flex flex-col  min-h-screen '>
			<div className='fixed pl-2 h-[50px] top-0 left-0 right-0 z-10 bg-white shadow'>
				<Navbar />
			</div>
			<div className='mt-16 p-4'>
				<TemplateGallery />
			</div>
			<DocumentsTable documents={results} loadMore={loadMore} status={status} />
		</div>
	);
}
