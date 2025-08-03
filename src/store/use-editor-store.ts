import {create} from 'zustand';
import { type Editor } from '@tiptap/react';


interface EditorStore {
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
    clearEditor: () => void;
}

const useEditorStore = create<EditorStore>((set) => ({
    editor: null,
    setEditor: (editor) => set({ editor }),
    clearEditor: () => set({ editor: null }),
  }));

export { useEditorStore };