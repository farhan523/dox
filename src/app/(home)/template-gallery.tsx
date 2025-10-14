"use client";
import {useState} from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {cn} from "@/lib/utils";

import {templates} from "@/constant/template";
import {useRouter} from "next/navigation";
import {api} from "../../../convex/_generated/api";
import {useMutation} from "convex/react";

export default function TemplateGallery() {
	const [isCreating, setIsCreating] = useState(false);
	const router = useRouter();
	const createDocument = useMutation(api.document.createDocument);

	const onTemplateClick = (title: string, initialContent: string) => {
		setIsCreating(true);
		createDocument({title, initialContent})
			.then((documentId) => {
				setIsCreating(false);
				router.push(`/documents/${documentId}`);
			})
			.finally(() => setIsCreating(false));
	};

	return (
		<div className='bg-[#F1F3F4]'>
			<div className='max-w-5xl mx-auto px-16 py-6 flex flex-col gap-y-4'>
				<h3> Start a New Document</h3>
				<Carousel>
					<CarouselContent>
						{templates.map((template) => (
							<CarouselItem
								className='basis-1/1 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 pl-4'
								key={template.id}
							>
								<div
									className={cn(
										"aspect-[3/4] flex flex-col gap-y-2.5",
										isCreating ? "pointer-events-none opacity-50" : "",
									)}
								>
									<button
										type='button'
										disabled={isCreating}
										onClick={() => {
											onTemplateClick(template.label, "");
										}}
										style={{
											backgroundImage: `url(${template.imageUrl})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
											backgroundRepeat: "no-repeat",
										}}
										className='size-full hover:border-blue-500 rounded-sm border hover:bg-blue-500 transition-all flex flex-col items-center justify-center gap-y-4 bg-white cursor-pointer'
									></button>
									<p className='text-sm font-medium truncate'>
										{template.label}
									</p>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	);
}
