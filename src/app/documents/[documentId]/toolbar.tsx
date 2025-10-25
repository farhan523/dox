/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
"use client";
import {use, useCallback, useState} from "react";
// biome-ignore lint/style/useImportType: <explanation>
import {
	AlignCenterIcon,
	AlignJustify,
	AlignLeftIcon,
	AlignRightIcon,
	Ban,
	Bold,
	HighlighterIcon,
	ImageIcon,
	Italic,
	Link,
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
	Unlink,
	Unlink2,
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
	disabled?: boolean;
}

const ToolbarButton = ({
	onClick,
	isActive,
	icon: Icon,
	disabled,
}: ToolbarButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				"text-sm h−7 min-w-7 flex items-center justify-center rounded-sm p-2 hover:bg-neutral-200/80 cursor-pointer",
				isActive && " bg-neutral-200/80",
			)}
			disabled={disabled || false}
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
				isActive: editor?.isActive("liveBlocksCommentMark"),
				icon: MessageSquarePlusIcon,
				onClick: () => editor?.chain().focus().addPendingComment().run(), // TODO implement this function
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
			<FontSizeSelectorButton />

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
			<LinkButton />
			<ToolbarButton
				key={"unlink"}
				icon={Unlink}
				onClick={() => editor?.chain().focus().unsetLink().run()}
				isActive={false}
				disabled={!editor?.isActive("link")}
			/>
			{/* Todo : Image */}
			<ImageButton />
			{/* Todo : Align */}
			<AlignButton />
			{/* Todo : Line Height */}
			<LineHeightSelectorButton />
			{/* Todo : List */}
			{/* Todo : Highlight Color */}

			{sections[2].map((item) => (
				<ToolbarButton key={item.label} {...item} />
			))}
		</div>
	);
}

function LineHeightSelectorButton() {
	const {editor} = useEditorStore();
	const LineHeightList = [
		{
			label: "1.5",
			value: "1.5",
			isActive: editor?.isActive("textStyle", {lineHeight: "1.5"}),
			onclick: () =>
				editor?.chain().focus().toggleTextStyle({lineHeight: "1.5"}).run(),
		},
		{
			label: "2.0",
			value: "2.0",
			isActive: editor?.isActive("textStyle", {lineHeight: "2.0"}),
			onclick: () =>
				editor?.chain().focus().toggleTextStyle({lineHeight: "2.0"}).run(),
		},
		{
			label: "4.0",
			value: "4.0",
			isActive: editor?.isActive("textStyle", {lineHeight: "4.0"}),
			onclick: () =>
				editor?.chain().focus().toggleTextStyle({lineHeight: "4.0"}).run(),
		},
	];

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<button className='px-2 cursor-pointer hover:bg-neutral-200/80'>
					{editor?.getAttributes("textStyle").lineHeight || 1.5}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{LineHeightList.map((item) => (
					<DropdownMenuItem
						key={item.label}
						className={cn(
							"flex items-center gap-2",
							item.isActive && "bg-neutral-100",
						)}
						onClick={item.onclick}
					>
						{item.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function FontSizeSelectorButton() {
	const {editor} = useEditorStore();
	const FontSizeList = [
		{
			label: "12",
			value: "12px",
			isActive: editor?.isActive("textStyle", {fontSize: "12px"}),
			onclick: () => editor?.chain().focus().setFontSize("12px").run(),
		},
		{
			label: "20",
			value: "20px",
			isActive: editor?.isActive("textStyle", {fontSize: "20px"}),
			onclick: () => editor?.chain().focus().setFontSize("20px").run(),
		},
		{
			label: "24",
			value: "24px",
			isActive: editor?.isActive("textStyle", {fontSize: "24px"}),
			onclick: () => editor?.chain().focus().setFontSize("24px").run(),
		},
		{
			label: "28",
			value: "28px",
			isActive: editor?.isActive("textStyle", {fontSize: "28px"}),
			onclick: () => editor?.chain().focus().setFontSize("28px").run(),
		},
		{
			label: "32",
			value: "32px",
			isActive: editor?.isActive("textStyle", {fontSize: "32px"}),
			onclick: () => editor?.chain().focus().setFontSize("32px").run(),
		},
	];

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<button className='px-2 cursor-pointer hover:bg-neutral-200/80'>
					{editor?.getAttributes("textStyle").fontSize || "16px"}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{FontSizeList.map((item) => (
					<DropdownMenuItem
						key={item.label}
						className={cn(
							"flex items-center gap-2",
							item.isActive && "bg-neutral-100",
						)}
						onClick={item.onclick}
					>
						{item.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function AlignButton() {
	const {editor} = useEditorStore();

	const AlignOptions = [
		{
			label: "Align Left",
			icon: AlignLeftIcon,
			onClick: () => editor?.chain().focus().setTextAlign("left").run(),
			isActive: editor?.isActive({textAlign: "left"}),
		},
		{
			label: "Align Center",
			icon: AlignCenterIcon,
			onClick: () => editor?.chain().focus().setTextAlign("center").run(),
			isActive: editor?.isActive({textAlign: "center"}),
		},
		{
			label: "Align Right",
			icon: AlignRightIcon,
			onClick: () => editor?.chain().focus().setTextAlign("right").run(),
			isActive: editor?.isActive({textAlign: "right"}),
		},
		{
			label: "Align Justify",
			icon: AlignJustify,
			onClick: () => editor?.chain().focus().setTextAlign("justify").run(),
			isActive: editor?.isActive({textAlign: "justify"}),
		},
	];

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						"cursor-pointer hover:bg-neutral-200/80 p-2 rounded-[10px]",
						editor?.getAttributes("textAlign") !== null && "bg-neutral-200/80",
					)}
				>
					<AlignLeftIcon size={15} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='overflow-hidden'>
				{AlignOptions.map((item) => (
					<DropdownMenuItem
						className={cn(item.isActive ? "bg-neutral-200/80" : "")}
						key={item.label}
						onClick={item.onClick}
					>
						<item.icon size={15} />
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function ImageButton() {
	const {editor} = useEditorStore();
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const addImage = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e?.target?.files?.[0]; // Get the selected file

			if (file) {
				const objectUrl = URL.createObjectURL(file); // Create a local URL

				// Insert the image into the editor
				editor?.chain().focus().setImage({src: objectUrl}).run();
			}
		},
		[editor],
	);

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<button className='cursor-pointer hover:bg-neutral-200/80 p-2 rounded-[10px]'>
					<ImageIcon size={15} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='overflow-hidden'>
				<label
					htmlFor='upload-image'
					className='cursor-pointer w-full pb-2 text-center hover:bg-neutral-200/80 h-full flex items-center justify-center rounded-[5px]'
				>
					Upload Image
					<input
						id='upload-image'
						className='hidden'
						multiple={false}
						onChange={addImage}
						type='file'
						accept='image/*'
					/>
				</label>
				<Separator className='w-[200px]' />
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (!imageUrl) return;
						editor?.chain().focus().setImage({src: imageUrl}).run();
						setImageUrl(null);
					}}
					className='w-[200px]'
				>
					<input
						value={imageUrl || ""}
						onChange={(e) => setImageUrl(e.target.value)}
						type='text'
						placeholder='Enter Image URL'
						className='w-full p-2 rounded-[5px] hover:bg-neutral-200/80'
					/>
					<button
						type='submit'
						className='w-full p-2 rounded-[5px] hover:bg-neutral-800 cursor-pointer bg-black text-white'
					>
						Submit
					</button>
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}


function LinkButton() {
	const {editor} = useEditorStore();
	const [open, setOpen] = useState(false);

	const [url, setUrl] = useState("");

	const setLink = useCallback(() => {
		// cancelled
		if (url === null) {
			return;
		}
		// empty
		if (url === "") {
			editor?.chain().focus().extendMarkRange("link").unsetLink().run();

			return;
		}
		// update link
		try {
			editor
				?.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({href: url})
				.run();
		} catch (error: any) {
			alert(error.message);
		}
		setOpen(false);
	}, [editor, url]);

	return (
		<DropdownMenu
			modal={false}
			open={open}
			onOpenChange={(open) => {
				if (open) setUrl(editor?.getAttributes("link").href || "");
				else setUrl("");
				setOpen(open);
			}}
		>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						"p-2 rounded-[10px]  cursor-pointer",
						editor?.isActive("link") && "bg-neutral-200/80",
					)}
				>
					<Link size={15} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<input
					type='url'
					value={url}
					className='outline-none h-full px-1'
					onChange={(e) => {
						setUrl(e.currentTarget.value);
					}}
				/>
				<button
					onClick={setLink}
					className='text-white bg-black px-4 py-2 click:bg-neutral-800 hover:bg-neutral-800 cursor-pointer rounded-[10px]'
				>
					add
				</button>
			</DropdownMenuContent>
		</DropdownMenu>
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
