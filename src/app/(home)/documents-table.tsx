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
	return <></>;
};
