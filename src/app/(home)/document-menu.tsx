import {ExternalLinkIcon, MoreVertical} from "lucide-react";
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
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => onNewTab(documentId)}>
					Open in a new tab <ExternalLinkIcon className='ml-2 h-4 w-4' />
				</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuItem>Subscription</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
