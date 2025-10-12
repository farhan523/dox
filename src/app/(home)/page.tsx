"use client";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";
import TemplateGallery from "./template-gallery";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Home() {
	const documents = useQuery(api.document.listDocuments);

	if (!documents) return <div>Loading...</div>;

	return (
		<div className='flex flex-col  min-h-screen '>
			<div className='fixed pl-2 h-[50px] top-0 left-0 right-0 z-10 bg-white shadow'>
				<Navbar />
			</div>
			<div className='mt-16 p-4'>
				<TemplateGallery />
			</div>
			{
				documents.map((document) => (
					<div key={document._id}>
						<Link href={`/documents/${document._id}`}>{document.title}</Link>
					</div>
				))
			}
		</div>
	);
}
