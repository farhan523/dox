"use client";
import Image from "next/image";
import Link from "next/link";
import DocumentInput from "./Document-Input";

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
	MenubarSubTrigger,
	MenubarSubContent,
	MenubarSub,
} from "@/components/ui/menubar";

import {
	Bold,
	Code,
	FileIcon,
	FileJsonIcon,
	FilePenIcon,
	FilePlus2Icon,
	FileTextIcon,
	GlobeIcon,
	Italic,
	Printer,
	Redo2,
	RemoveFormattingIcon,
	Strikethrough,
	Table,
	Text,
	Trash,
	Underline,
	Undo2,
} from "lucide-react";
import {BsFilePdf} from "react-icons/bs";
import {useEditorStore} from "@/store/use-editor-store";

export default function Navbar() {
	const {editor} = useEditorStore();

	const insetTable = ({rows, cols}: {rows: Number; cols: Number}) => {
		editor
			?.chain()
			.focus()
			.insertTable({
				rows: Number(rows),
				cols: Number(cols),
				withHeaderRow: true,
			})
			.run();
	};

	const onDownload = (blob: Blob, filename: string) => {
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.style.display = "none";
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
	};

	const onSaveJson = () => {
		if (!editor) return;
		const json = editor.getJSON();
		const blob = new Blob([JSON.stringify(json, null, 2)], {
			type: "application/json",
		});
		onDownload(blob, "document.json");
	};

	const onSaveHtml = () => {
		if (!editor) return;
		const html = editor.getHTML();
		const blob = new Blob([html], {type: "text/html"});
		onDownload(blob, "document.html");
	};

	const onSaveText = () => {
		if (!editor) return;
		const content = editor.getText();
		const blob = new Blob([content], {type: "text/plain"});
		onDownload(blob, "document.txt");
	};

	return (
		<nav className='w-full h-16 bg-white text-white shadow flex items-center justify-between px-4'>
			<div className='flex items-center gap-2'>
				<Link href='/' className='text-white text-lg font-bold'>
					<Image
						src='/logo.svg'
						alt='Logo'
						width={32}
						height={32}
						className='mr-2'
					/>
				</Link>
				<div className='flex flex-col'>
					{/* document input */}
					<DocumentInput />
					{/* Menubar */}
					<div className='flex'>
						<Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
							<MenubarMenu>
								<MenubarTrigger className='text-black'>File</MenubarTrigger>

								<MenubarContent className='bg-white border border-gray-200 shadow-md print:hidden'>
									<MenubarSub>
										<MenubarSubTrigger className='flex items-center '>
											<FileIcon className='h-4 w-4 mr-2' />
											Save
										</MenubarSubTrigger>
										<MenubarSubContent className='bg-white border border-gray-200 shadow-md'>
											<MenubarItem onClick={onSaveJson}>
												<FileJsonIcon className='h-4 w-4 mr-2' />
												JSON
											</MenubarItem>
											<MenubarSeparator />
											<MenubarItem onClick={onSaveHtml}>
												<GlobeIcon className='h-4 w-4 mr-2' />
												HTML
											</MenubarItem>
											<MenubarSeparator />
											<MenubarItem onClick={() => window.print()}>
												<BsFilePdf className='h-4 w-4 mr-2' />
												PDF
											</MenubarItem>
											<MenubarSeparator />
											<MenubarItem onClick={onSaveText}>
												<FileTextIcon className='h-4 w-4 mr-2' />
												text
											</MenubarItem>
										</MenubarSubContent>
									</MenubarSub>
									<MenubarSeparator />
									<MenubarItem>
										<FilePlus2Icon />
										New Document
									</MenubarItem>
									<MenubarSeparator />
									<MenubarItem>
										<FilePenIcon />
										Rename Document
									</MenubarItem>
									<MenubarSeparator />
									<MenubarItem>
										<Trash />
										Delete
									</MenubarItem>
									<MenubarSeparator />
									<MenubarItem onClick={() => window.print()}>
										<Printer />
										Print
										<MenubarShortcut>Ctrl+P</MenubarShortcut>
									</MenubarItem>
								</MenubarContent>
							</MenubarMenu>

							<MenubarMenu>
								<MenubarTrigger className='text-black'>Edit</MenubarTrigger>

								<MenubarContent className='bg-white border border-gray-200 shadow-md'>
									<MenubarItem
										onClick={() => editor?.chain().focus().undo().run()}
									>
										<Undo2 />
										Undo
										<MenubarShortcut>Ctrl+z</MenubarShortcut>
									</MenubarItem>
									<MenubarSeparator />
									<MenubarItem
										onClick={() => editor?.chain().focus().redo().run()}
									>
										<Redo2 />
										Redo
										<MenubarShortcut>Ctrl+y</MenubarShortcut>
									</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
							<MenubarMenu>
								<MenubarTrigger className='text-black'>Insert</MenubarTrigger>

								<MenubarContent className='bg-white border border-gray-200 shadow-md'>
									<MenubarSub>
										<MenubarSubTrigger className='flex items-center '>
											<Table /> Table
										</MenubarSubTrigger>
										<MenubarSubContent className='bg-white border border-gray-200 shadow-md'>
											<MenubarItem
												onClick={() => insetTable({rows: 1, cols: 1})}
											>
												1 x 1
											</MenubarItem>
											<MenubarSeparator />
											<MenubarItem
												onClick={() => insetTable({rows: 2, cols: 2})}
											>
												2 x 2
											</MenubarItem>
											<MenubarSeparator />
											<MenubarItem
												onClick={() => insetTable({rows: 3, cols: 3})}
											>
												3 x 3
											</MenubarItem>
											<MenubarSeparator />
											<MenubarItem
												onClick={() => insetTable({rows: 4, cols: 4})}
											>
												4 x 4
											</MenubarItem>
											<MenubarSeparator />
											<MenubarItem
												onClick={() => insetTable({rows: 5, cols: 5})}
											>
												5 x 5
											</MenubarItem>
										</MenubarSubContent>
									</MenubarSub>
								</MenubarContent>
							</MenubarMenu>
							<MenubarMenu>
								<MenubarTrigger className='text-black'>Format</MenubarTrigger>

								<MenubarContent className='bg-white border border-gray-200 shadow-md'>
									<MenubarSub>
										<MenubarSubTrigger className='flex items-center gap-1'>
											<Text /> text
										</MenubarSubTrigger>
										<MenubarSubContent className='bg-white border border-gray-200 shadow-md'>
											<MenubarItem
												onClick={() =>
													editor?.chain().focus().toggleBold().run()
												}
											>
												<Bold /> Bold
											</MenubarItem>
											<MenubarSeparator />
											<MenubarItem
												onClick={() =>
													editor?.chain().focus().toggleItalic().run()
												}
											>
												<Italic /> Italic
											</MenubarItem>
											<MenubarSeparator />
											<MenubarItem
												onClick={() =>
													editor?.chain().focus().toggleUnderline().run()
												}
											>
												<Underline /> Underline
											</MenubarItem>
											<MenubarSeparator />
											<MenubarItem
												onClick={() =>
													editor?.chain().focus().toggleStrike().run()
												}
											>
												<Strikethrough /> Strikethrough
											</MenubarItem>
											<MenubarSeparator />
											<MenubarItem
												onClick={() =>
													editor?.chain().focus().toggleCode().run()
												}
											>
												<Code />
												Code
											</MenubarItem>
										</MenubarSubContent>
									</MenubarSub>
									<MenubarSeparator />
									<MenubarItem
										onClick={() =>
											editor?.chain().focus().unsetAllMarks().run()
										}
									>
										<RemoveFormattingIcon />
										Clear Formatting
									</MenubarItem>
								</MenubarContent>
							</MenubarMenu>
						</Menubar>
					</div>
				</div>
			</div>
		</nav>
	);
}
