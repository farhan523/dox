/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
"use client";
// biome-ignore lint/style/useImportType: <explanation>
import {
	Ban,
	Bold,
	HighlighterIcon,
	Italic,
	ListTodoIcon,
	LucideIcon,
	MessageSquarePlusIcon,
	Paintbrush2,
	PaintBucket,
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
import {type Level} from "@tiptap/extension-heading";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
			<FontFamilyButton />

			<Separator
				orientation='vertical'
				className='!h-[20px] w-[2px] bg-neutral-300'
			/>

			{/* Todo : Font Heading */}
			<HeadingSelectorButton />

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
			<TextColorSelectorButton />

			<Separator
				orientation='vertical'
				className='!h-[20px] w-[2px] bg-neutral-300'
			/>
			{/* Todo : Highlight Color */}
			<HighlightSelectorButton />

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


function TextColorSelectorButton() {
	const {editor} = useEditorStore();
	const Colors = [
		{
			label: "Orange",
			value: "#ffc078",
		},
		{
			label: "Green",
			value: "#8ce99a",
		},
		{
			label: "Blue",
			value: "#74c0fc",
		},
		{
			label: "Purple",
			value: "#b197fc",
		},
		{
			label: "Red ",
			value: "#ffa8a8",
		},
	];

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<button className='px-2 cursor-pointer'>
					A
					<div
						style={{
							backgroundColor:
								editor?.getAttributes("textStyle").color || "#000000",
						}}
						className='h-[1px] w-full rounded-full'
					></div>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='grid grid-cols-3 '>
				{Colors.map((color) => (
					<DropdownMenuItem key={color.label} className='flex items-center '>
						<button
							onClick={() => {
								editor?.chain().focus().setColor(color.value).run();
							}}
							style={{backgroundColor: color.value}}
							className='w-4 h-4 rounded-[4px]'
						/>
					</DropdownMenuItem>
				))}
				<DropdownMenuItem className='flex items-center '>
					<button
						onClick={() => {
							editor?.chain().focus().unsetColor().run();
						}}
						data-testid='unsetColor'
						className='w-4 h-4 rounded-[4px]'
					>
						<Ban />
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function HighlightSelectorButton() {
	const {editor} = useEditorStore();
	const Colors = [
		{
			label: "Orange",
			value: "#ffc078",
		},
		{
			label: "Green",
			value: "#8ce99a",
		},
		{
			label: "Blue",
			value: "#74c0fc",
		},
		{
			label: "Purple",
			value: "#b197fc",
		},
		{
			label: "Red ",
			value: "#ffa8a8",
		},
	];

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<button className='cursor-pointer px-2 flex items-center'>
					<HighlighterIcon size={20} />
					<div
						style={{
							backgroundColor: editor?.getAttributes("highlight").color,
						}}
						className='size-1 rounded-full'
					></div>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='grid grid-cols-3 '>
				{Colors.map((color) => (
					<DropdownMenuItem key={color.label} className='flex items-center '>
						<button
							onClick={() => {
								editor
									?.chain()
									.focus()
									.toggleHighlight({color: color.value})
									.run();
							}}
							style={{backgroundColor: color.value}}
							className='w-4 h-4 rounded-[4px]'
						/>
					</DropdownMenuItem>
				))}
				<DropdownMenuItem className='flex items-center '>
					<button
						onClick={() => {
							editor?.chain().focus().unsetHighlight().run();
						}}
						disabled={!editor?.isActive("highlight")}
						className='w-4 h-4 rounded-[4px]'
					>
						<Ban />
					</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function HeadingSelectorButton() {
	const {editor} = useEditorStore();
	const Headings = [
		{
			label: "P",
			value: "0",
			fontSize: "16px",
		},
		{
			label: "H1",
			value: "1",
			fontSize: "32px",
		},
		{
			label: "H2",
			value: "2",
			fontSize: "24px",
		},
		{
			label: "H3",
			value: "3",
			fontSize: "20px",
		},
		{
			label: "H4",
			value: "4",
			fontSize: "18px",
		},
		{
			label: "H5",
			value: "5",
			fontSize: "16px",
		},
	];

	const getCurrentHeading = () => {
		for (const heading of Headings) {
			if (editor?.isActive("heading", {level: parseInt(heading.value)})) {
				return heading.label;
			}
		}

		return Headings[0].label;
	};

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						"h-7 w-[120] shrink-0 flex item-center justify-between rounded-sm hover:bg-neutral-200/80 cursor-pointer px-1.5 overflow-hidden",
					)}
				>
					<span className='truncate'>{getCurrentHeading()}</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{Headings.map(({label, value, fontSize}) => (
					<DropdownMenuItem
						key={label}
						style={{fontSize}}
						onClick={() => {
							if (label === "P") {
								editor?.chain().focus().setParagraph().run();
							} else {
								editor
									?.chain()
									.focus()
									.toggleHeading({level: parseInt(value) as Level})
									.run();
							}
						}}
					>
						{label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function FontFamilyButton() {
	const {editor} = useEditorStore();

	const fonts = [
		{label: "Arial", value: "Arial"},
		{label: "Times New Roman", value: "Times New Roman"},
		{label: "Courier New", value: "Courier New"},
		{label: "Georgia", value: "Georgia"},
		{label: "Verdana", value: "Verdana"},
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						"h-7 w-[120] shrink-0 flex item-center justify-between rounded-sm hover:bg-neutral-200/80 cursor-pointer px-1.5 overflow-hidden",
					)}
				>
					<span className='truncate'>
						{editor?.getAttributes("textStyle").fontFamily || "Arial"}
					</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{fonts.map((font) => (
					<DropdownMenuItem
						className={cn(
							"h-7 text-sm flex items-center justify-between rounded-sm hover:bg-neutral-200/80 cursor-pointer px-1.5",
							editor?.getAttributes("textStyle").fontFamily === font.value &&
								"bg-neutral-200/80",
						)}
						key={font.value}
						style={{fontFamily: font.value}}
						onClick={() =>
							editor?.getAttributes("textStyle").fontFamily === font.value
								? editor?.chain()?.focus().unsetFontFamily().run()
								: editor?.chain()?.focus().setFontFamily(font.value).run()
						}
					>
						{font.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
