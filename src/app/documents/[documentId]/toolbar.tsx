/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
"use client";
// biome-ignore lint/style/useImportType: <explanation>
import {
	Bold,
	Italic,
	ListTodoIcon,
	LucideIcon,
	MessageSquarePlusIcon,
	Printer,
	Redo2Icon,
	RemoveFormattingIcon,
	SpellCheck2Icon,
	Underline,
	Undo2Icon,
} from "lucide-react";
import {cn} from "@/lib/utils";
import {useEditorStore} from "@/store/use-editor-store";
import {Separator} from "@/components/ui/separator";

interface ToolbarButtonProps {
	onClick: () => void;
	isActive?: boolean;
	icon: LucideIcon;
}

const ToolbarButton = ({onClick, isActive, icon: Icon}: ToolbarButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				"text-sm h−7 min-w-7 flex items-center justify-center rounded-sm p-2 hover:bg-neutral-200/80 cursor-pointer",
				isActive && " bg-neutral-200/80",
			)}
		>
			<Icon className='size-4' />
		</button>
	);
};

export function Toolbar() {
	const {editor} = useEditorStore();
	const sections: {
		label: string;
		icon: LucideIcon;
		onClick: () => void;
		isActive?: boolean;
	}[][] = [
		[
			{
				label: "Undo",
				icon: Undo2Icon,
				onClick: () => editor?.chain().focus().undo().run(),
			},
			{
				label: "Redo",
				icon: Redo2Icon,
				onClick: () => editor?.chain().focus().redo().run(),
			},
			{
				label: "Print",
				icon: Printer,
				onClick: () => window?.print(),
			},
			{
				label: "Spell check",
				icon: SpellCheck2Icon,
				onClick: () => {
					const current: string | null | undefined =
						editor?.view?.dom.getAttribute("spellcheck");
					editor?.view?.dom.setAttribute(
						"spellcheck",
						current === "false" ? "true" : "false",
					);
				},
			},
		],
		[
			{
				label: "Bold",
				isActive: editor?.isActive("bold"),
				icon: Bold,
				onClick: () => editor?.chain().focus().toggleBold().run(),
			},
			{
				label: "Italic",
				isActive: editor?.isActive("italic"),
				icon: Italic,
				onClick: () => editor?.chain().focus().toggleItalic().run(),
			},
			{
				label: "Underline",
				isActive: editor?.isActive("underline"),
				icon: Underline,
				onClick: () => editor?.chain().focus().toggleUnderline().run(),
			},
		],
		[
			{
				label: "Comment",
				isActive: false,
				icon: MessageSquarePlusIcon,
				onClick: () => console.log("Comment"), // TODO implement this function
			},
			{
				label: "List to do",
				isActive: editor?.isActive("taskList"),
				icon: ListTodoIcon,
				onClick: () => editor?.chain().focus().toggleTaskList().run(), // TODO implement this function
			},
			{
				label: "Remove formating",
				isActive: false,
				icon: RemoveFormattingIcon,
				onClick: () => editor?.chain().focus().unsetAllMarks().run(), // TODO implement this function
			},
		],
	];

	return (
		<div className='flex items-center'>
			{sections[0].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}

			<Separator
				orientation='vertical'
				className='!h-[20px] w-[2px] bg-neutral-300'
			/>

			{/* Todo : Font Family */}

			<Separator
				orientation='vertical'
				className='!h-[20px] w-[2px] bg-neutral-300'
			/>

			{/* Todo : Font Heading */}

			<Separator
				orientation='vertical'
				className='!h-[20px] w-[2px] bg-neutral-300'
			/>

			{/* Todo : Font Size */}

			<Separator
				orientation='vertical'
				className='!h-[20px] w-[2px] bg-neutral-300'
			/>

			{sections[1].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}

			<Separator
				orientation='vertical'
				className='!h-[20px] w-[2px] bg-neutral-300'
			/>
			{/* Todo : Text Color */}
			{/* Todo : Highlight Color */}

			<Separator
				orientation='vertical'
				className='!h-[20px] w-[2px] bg-neutral-300'
			/>

			{/* Todo : Link */}
			{/* Todo : Image */}
			{/* Todo : Align */}
			{/* Todo : Line Height */}
			{/* Todo : List */}
			{/* Todo : Highlight Color */}

			{sections[2].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
		</div>
	);
}
