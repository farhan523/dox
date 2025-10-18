import {ExternalLinkIcon, MoreVertical, Trash} from "lucide-react";
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
			<DropdownMenuContent onClick={(e) => e.preventDefault()}>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => onNewTab(documentId)}>
					Open in a new tab <ExternalLinkIcon className='ml-2 h-4 w-4' />
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

				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuItem>Subscription</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
