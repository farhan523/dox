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
import {toast} from "sonner";

interface RemoveDialogProps {
	documentId: Id<"document">;
	children: React.ReactNode;
}

export const RemoveDialog = ({documentId, children}: RemoveDialogProps) => {
	const remove = useMutation(api.document.removeById);
	const [isDeleting, setIsDeleting] = useState(false);
	const handleRemove = () => {
		setIsDeleting(true);
		remove({id: documentId})
			.then(() => toast.success("Document deleted"))
			.catch(() => toast.error("Failed to delete document"))
			.finally(() => setIsDeleting(false));
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent onClick={(e) => e.stopPropagation()}>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction disabled={isDeleting} onClick={handleRemove}>
						Delete {isDeleting ? "..." : ""}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
