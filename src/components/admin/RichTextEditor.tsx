import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Link as LinkIcon,
  AlertCircle,
  X
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  onImageUpload?: (file: File) => Promise<string>;
  onUploadError?: (error: string) => void;
}

// Toolbar button component - defined outside to prevent recreation on each render
function ToolbarButton({
  onClick,
  isActive = false,
  children,
  title
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
        isActive ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
  onImageUpload,
  onUploadError
}: RichTextEditorProps) {
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Helper to set error and call callback
  const handleError = (error: string) => {
    setUploadError(error);
    onUploadError?.(error);
    // Auto-clear error after 10 seconds
    setTimeout(() => setUploadError(null), 10000);
  };

  // Validate file before upload
  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const dangerousMimeTypes = ['application/x-php', 'application/x-sh', 'application/x-executable', 'text/plain', 'image/svg+xml'];
    const dangerousExtensions = ['.php', '.sh', '.exe', '.bat', '.cmd', '.svg', '.js'];

    const fileName = file.name.toLowerCase();

    // Check for dangerous MIME types
    if (dangerousMimeTypes.includes(file.type)) {
      return 'Invalid file type. This file type is not allowed for security reasons.';
    }

    // Check allowed MIME type
    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.';
    }

    // Check for dangerous extensions
    const hasDangerousExtension = dangerousExtensions.some(ext => fileName.includes(ext));
    if (hasDangerousExtension) {
      return 'Invalid file. File name contains a dangerous extension.';
    }

    // Check for multiple extensions (double extension attack)
    const parts = fileName.split('.');
    if (parts.length > 2) {
      return 'Invalid file name. Multiple extensions are not allowed.';
    }

    // Check file size
    if (file.size > maxSize) {
      return 'File too large. Maximum size is 10MB.';
    }

    return null;
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        }
      }),
      Placeholder.configure({
        placeholder
      }),
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-purple-600 underline'
        }
      })
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] px-4 py-3'
      }
    }
  });

  if (!editor) {
    return null;
  }

  const handleLinkAdd = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      {/* Upload Error Alert */}
      {uploadError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1 text-sm">{uploadError}</span>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/40 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-5 h-5" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-5 h-5" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="w-5 h-5" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="w-5 h-5" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List className="w-5 h-5" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <ListOrdered className="w-5 h-5" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Quote"
        >
          <Quote className="w-5 h-5" />
        </ToolbarButton>

        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        <label className="relative p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 cursor-pointer" title="Insert Image">
          <ImageIcon className="w-5 h-5" />
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-[0.01] cursor-pointer"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file && onImageUpload) {
                // Validate file first
                const validationError = validateFile(file);
                if (validationError) {
                  handleError(validationError);
                  e.target.value = '';
                  return;
                }

                try {
                  const url = await onImageUpload(file);
                  editor.chain().focus().setImage({ src: url }).run();
                  setUploadError(null);
                } catch (error) {
                  const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
                  handleError(errorMessage);
                }
              }
              e.target.value = '';
            }}
          />
        </label>

        <ToolbarButton onClick={handleLinkAdd} title="Insert Link">
          <LinkIcon className="w-5 h-5" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
