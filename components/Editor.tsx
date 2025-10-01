"use client";

import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useCallback, useEffect } from "react"; // Just add useEffect

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Highlighter,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
  editable?: boolean;
  initialValue?: string; // Just add this new prop
}

// ✅ Custom BackgroundColor extension (keep your existing extension)
const BackgroundColor = Extension.create({
  name: "backgroundColor",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          backgroundColor: {
            default: null,
            parseHTML: (element: HTMLElement) => element.style.backgroundColor,
            renderHTML: (attributes: Record<string, unknown>) => {
              if (!attributes.backgroundColor) return {};
              return {
                style: `background-color: ${attributes.backgroundColor}`,
              };
            },
          },
        },
      },
    ];
  },
});

interface MenuButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  onClick,
  isActive = false,
  children,
  disabled = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "p-2 rounded hover:bg-gray-100 transition-colors",
      isActive && "bg-gray-200",
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    {children}
  </button>
);

export function RichTextEditor({
  content = "",
  onChange,
  placeholder = "Start writing...",
  className,
  editable = true,
  initialValue = "", // Add this new prop
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      BackgroundColor,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true, allowBase64: true }),
    ],
    content: initialValue || content, // Use initialValue if provided
    editable,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  // Add this useEffect to handle initial value
  useEffect(() => {
    if (editor && initialValue && editor.isEmpty) {
      editor.commands.setContent(initialValue);
    }
  }, [editor, initialValue]);

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleContainerClick = useCallback(() => {
    editor?.chain().focus().run();
  }, [editor]);

  if (!editor) return null;

  if (!editable) {
    return (
      <div className={cn("prose max-w-none", className)}>
        <EditorContent editor={editor} />
      </div>
    );
  }

  return (
    <div
      className={cn("border rounded-md editor-container", className)}
      onClick={handleContainerClick}
      role="textbox"
      tabIndex={0}
      aria-label="Rich Text Editor"
      aria-multiline="true"
    >
      {/* Toolbar - KEEP ALL YOUR EXISTING DESIGN */}
      <div className="flex items-center flex-wrap gap-1 p-2 border-b bg-white sticky top-0 z-10">
        {/* Text Formatting */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          <Strikethrough className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
        >
          <Highlighter className="w-4 h-4" />
        </MenuButton>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* Text Alignment */}
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editor.isActive({ textAlign: "justify" })}
        >
          <AlignJustify className="w-4 h-4" />
        </MenuButton>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* Lists */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered className="w-4 h-4" />
        </MenuButton>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* Other */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          <Quote className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
        >
          <Code className="w-4 h-4" />
        </MenuButton>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* Links & Images */}
        <MenuButton onClick={addLink} isActive={editor.isActive("link")}>
          <LinkIcon className="w-4 h-4" />
        </MenuButton>
        <MenuButton onClick={addImage}>
          <ImageIcon className="w-4 h-4" />
        </MenuButton>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {/* Undo / Redo */}
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="w-4 h-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="w-4 h-4" />
        </MenuButton>
      </div>

      {/* Editor Content */}
      <div className="min-h-[200px] [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:outline-none [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:ml-4 [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:ml-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
