import {Doc} from "../../../convex/_generated/dataModel";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Building,
	Building2Icon,
	CircleUserIcon,
	MoreVertical,
} from "lucide-react";
import {SiGoogledocs} from "react-icons/si";
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import DocumentMenu from "./document-menu";
import {useRouter} from "next/navigation";

interface DocumentsRowProps {
	document: Doc<"document">;
}

export const DocumentsRow = ({document}: DocumentsRowProps) => {
	const router = useRouter();
	const onNewTabHandler = (id: string) => {
		window.open(`/documents/${id}`, "_blank");
	};

	const onRowClickHandler = (id: string) => {
		router.push(`/documents/${id}`);
	};
	return (
		<TableRow
			onClick={() => onRowClickHandler(document._id)}
			key={document._id}
			className='hover:bg-muted border-none cursor-pointer '
		>
			<TableCell className='font-medium w-[50px]'>
				<SiGoogledocs className='h-6 w-6 fill-blue-500' />
			</TableCell>
			<TableCell>{document.title} </TableCell>

			<TableCell className='text-muted-foreground hidden md:flex items-center gap-2'>
				{document.organizationId ? (
					<Building2Icon className='size-4' />
				) : (
					<CircleUserIcon className='size-4' />
				)}
				{document.organizationId ? "Organization" : "Personal"}
			</TableCell>
			<TableCell className='text-muted-foreground hidden md:table-cell text-right'>
				{format(new Date(document._creationTime), "dd/MM/yyyy")}
			</TableCell>
			<TableCell
				onClick={(e) => e.stopPropagation()}
				className='flex ml-auto justify-end cursor-pointer'
			>
				<DocumentMenu
					documentId={document._id}
					title={document.title}
					onNewTab={onNewTabHandler}
				/>
			</TableCell>
		</TableRow>
	);
};
