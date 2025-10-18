"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {useState} from "react";

import {Id} from "../../../convex/_generated/dataModel";
import {api} from "../../../convex/_generated/api";
import {useMutation} from "convex/react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface RenameDialogProps {
	documentId: Id<"document">;
	children: React.ReactNode;
	initialTitle: string;
}

export const RenameDialog = ({
	documentId,
	children,
	initialTitle,
}: RenameDialogProps) => {
	const update = useMutation(api.document.updateById);
	const [isUpdating, setIsUpdating] = useState(false);
	const [title, setTitle] = useState(initialTitle);
	const handleRename = () => {
		setIsUpdating(true);
		update({id: documentId, title: title.trim()}).then(() =>
			setIsUpdating(false),
		);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent onClick={(e) => e.stopPropagation()}>
				<AlertDialogHeader>
					<AlertDialogTitle>Rename Document</AlertDialogTitle>
					<AlertDialogDescription>
						Edit the name of the document
					</AlertDialogDescription>
				</AlertDialogHeader>
				<form>
					<div className='my-4'>
						<Input
							placeholder='Document Name'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
				</form>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Button type='button' variant='ghost' disabled={isUpdating}>
							Cancel
						</Button>
					</AlertDialogCancel>
					<AlertDialogAction disabled={isUpdating} onClick={handleRename}>
						Save {isUpdating ? "..." : ""}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
