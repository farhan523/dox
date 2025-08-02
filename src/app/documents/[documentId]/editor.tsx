"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const Editor = () => {
	const editor = useEditor({
		editorProps: {
			attributes: {
				style: "padding-left:40px; padding-right:10px",
				class: "focus:outline-none print:border-0 bg-white border border-[#c7c7c7]  flex flex-col min-h-[1050px] w-[816px] pt-10 pb-10 cursor-text",
			},
		},
		extensions: [StarterKit],
		content: "<p>Hello World! 🌎️</p>",
		// Don't render immediately on the server to avoid SSR issues
		immediatelyRender: false,
	});

	return (
		<div className="min-h-screen bg-[#fafbfd]">
			<div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:min-w-0">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};
