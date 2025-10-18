import {ExternalLinkIcon, FilePenIcon, MoreVertical, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";

import {Id} from "../../../convex/_generated/dataModel";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {RemoveDialog} from "./remove-dialog";
import {RenameDialog} from "./rename-dialog";

interface DocumentMenuProps {
	documentId: Id<"document">;
	title: string;
	onNewTab: (id: Id<"document">) => void;
}

export default function DocumentMenu({
	documentId,
	title,
	onNewTab,
}: DocumentMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' size={"icon"} className='rounded-full'>
					<MoreVertical className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='cursor-pointer'
				align='start'
				onClick={(e) => e.preventDefault()}
			>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => onNewTab(documentId)}>
					<ExternalLinkIcon className=' h-4 w-4' /> Open in a new tab
				</DropdownMenuItem>
				<RemoveDialog documentId={documentId}>
					<DropdownMenuItem
						onSelect={(e) => e.preventDefault()}
						className='text-red-300 flex items-center gap-3'
					>
						<Trash className='mr-2 h-4 w-4 text-red-300' />
						Remove
					</DropdownMenuItem>
				</RemoveDialog>

				<RenameDialog documentId={documentId} initialTitle={title}>
					<DropdownMenuItem
						onSelect={(e) => e.preventDefault()}
						className=' flex items-center gap-3'
					>
						<FilePenIcon className='mr-2 h-4 w-4 ' />
						Rename
					</DropdownMenuItem>
				</RenameDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
