import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic } from "lucide-react";
import { useEffect } from "react";
import { GrOrderedList } from "react-icons/gr";
import { MdFormatListBulleted } from "react-icons/md";

interface TipTapProps {
  value: string;
  onChange: (val: string) => void;
}

const Tiptap = ({ onChange, value }: TipTapProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div className="rounded-xl border p-2">
      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          size={"xs"}
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-3" />
        </Button>
        <Button
          type="button"
          size={"xs"}
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-3" />
        </Button>
        <Button
          type="button"
          size={"xs"}
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <GrOrderedList className="size-4" />
        </Button>
        <Button
          type="button"
          size={"xs"}
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <MdFormatListBulleted className="size-4" />
        </Button>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm *: prose-invert mt-0.5 max-w-none dark:text-white/80 [&_li]:my-0 [&_li]:ml-2 [&_ol]:my-0 [&_ol]:list-decimal [&_ol]:pl-3 [&_ol]:text-sm [&_p]:my-0 [&_p]:text-sm [&_ul]:list-disc [&_ul]:pl-3"
      />
    </div>
  );
};

export default Tiptap;
