/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import {useEditorStore} from "@/store/use-editor-store";
import {TextStyle, FontFamily, Color} from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";

export const Editor = () => {
	const {setEditor} = useEditorStore();
	const editor = useEditor({
		onCreate: ({editor}) => {
			setEditor(editor);
		},

		onDestroy: () => {
			setEditor(null);
		},
		onUpdate({editor}) {
			setEditor(editor);
		},
		onSelectionUpdate({editor}) {
			setEditor(editor);
		},
		onTransaction({editor}) {
			setEditor(editor);
		},
		onFocus({editor}) {
			setEditor(editor);
		},
		onBlur({editor}) {
			setEditor(editor);
		},
		onContentError({editor}) {
			setEditor(editor);
		},
		editorProps: {
			attributes: {
				style: "padding-left:40px; padding-right:10px",
				class:
					"focus:outline-none print:border-0 bg-white border border-[#c7c7c7]  flex flex-col min-h-[1050px] w-[816px] pt-10 pb-10 cursor-text",
			},
		},
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3, 4, 5, 6],
				},
			}),
			TaskList,
			TaskItem,
			TextStyle,
			FontFamily,
			ImageResize,
			Color,
			Highlight.configure({multicolor: true}),
			TableKit.configure({
				table: {resizable: true},
			}),
		],
		content: ``,
		// Don't render immediately on the server to avoid SSR issues
		immediatelyRender: false,
	});

	 if (!editor) {
			return null;
		}

	return (
		<div className='min-h-screen bg-[#fafbfd]'>
			<div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:min-w-0'>
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};
