import {PaginationStatus} from "convex/react";
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
import {LoaderIcon} from "lucide-react";
import {DocumentsRow} from "./document-row";
import {Button} from "@/components/ui/button";

interface DocumentsTableProps {
	documents: Doc<"document">[] | undefined;
	loadMore: (numItems: number) => void;
	status: PaginationStatus;
}

export const DocumentsTable = ({
	documents,
	loadMore,
	status,
}: DocumentsTableProps) => {
	return (
		<div className='w-full max-w-5xl mx-auto px-16 py-6 flex flex-col gap-5 '>
			{documents === undefined ? (
				<div className='flex justify-center items-center h-24'>
					<LoaderIcon className='animate-spin text-muted-foreground size-5 ' />
				</div>
			) : (
				<Table>
					<TableHeader>
						<TableRow className='hover:bg-transparent border-none '>
							<TableHead className=''>Name</TableHead>
							<TableHead>&nbsp;</TableHead>
							<TableHead className='hidden md:table-cell'>Shared</TableHead>
							<TableHead className='text-right'>Created at</TableHead>
						</TableRow>
					</TableHeader>
					{documents.length === 0 ? (
						<TableHeader>
							<TableRow className='hover:bg-transparent border-none '>
								<TableCell
									colSpan={4}
									className='h-24 text-center text-muted-foreground'
								>
									No Documents Found
								</TableCell>
							</TableRow>
						</TableHeader>
					) : (
						<TableBody>
							{documents.map((document) => (
								<DocumentsRow document={document} key={document._id} />
							))}
						</TableBody>
					)}
				</Table>
			)}
			<Button
				variant={"ghost"}
				size={"sm"}
				onClick={() => loadMore(5)}
				disabled={status !== "CanLoadMore"}
			>
				{status === "CanLoadMore" ? "Load more" : "No more documents"}
			</Button>
		</div>
	);
};
