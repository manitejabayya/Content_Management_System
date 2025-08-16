"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { List, Bold, Italic, Link as LinkIcon, Image as ImageIcon, Code, Heading1, Heading2, Heading3, Save, Eye, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Editor({ draftId = null }) {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { data: session } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState(draftId);
  const [lastSaved, setLastSaved] = useState(null);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: '<p class="placeholder-text">Start writing your post...</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none p-4 focus:outline-none min-h-[200px]',
      },
    },
  });

  // Load categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (response.ok) {
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Load existing draft if draftId is provided
  useEffect(() => {
    if (draftId) {
      loadDraft(draftId);
    }
  }, [draftId]);

  const loadDraft = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/drafts/${id}`);
      const data = await response.json();
      if (response.ok) {
        const draft = data.draft;
        setValue('title', draft.title);
        setValue('keywords', draft.keywords || '');
        setValue('catSlug', draft.catSlug || '');
        setValue('desc', draft.desc || '');
        setValue('thumbnail', draft.thumbnail || '');
        editor?.commands.setContent(draft.content || '<p>Start writing your post...</p>');
        setCurrentDraftId(id);
      } else {
        console.error('Error loading draft:', data.error);
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDraft = async (data, publish = false) => {
    if (!session) {
      alert('Please sign in to save drafts');
      return;
    }

    setIsSaving(true);
    try {
      const content = editor?.getHTML() || '';
      const payload = {
        ...data,
        content,
        status: publish ? 'PUBLISHED' : 'DRAFT'
      };

      let response;
      if (currentDraftId) {
        // Update existing draft
        if (publish) {
          response = await fetch(`/api/drafts/${currentDraftId}/publish`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          response = await fetch(`/api/drafts/${currentDraftId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }
      } else {
        // Create new draft
        response = await fetch('/api/drafts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const result = await response.json();
      if (response.ok) {
        if (publish) {
          alert('Post published successfully!');
          router.push('/dashboard');
        } else {
          if (!currentDraftId) {
            setCurrentDraftId(result.draft.id);
          }
          setLastSaved(new Date());
          alert('Draft saved successfully!');
        }
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft');
    } finally {
      setIsSaving(false);
    }
  };

  const handleForm = (data) => {
    saveDraft(data, false);
  };

  const handlePublish = (data) => {
    if (!data.title || !editor?.getHTML()) {
      alert('Title and content are required to publish');
      return;
    }
    saveDraft(data, true);
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleForm)}>
        <input
          {...register("title")}
          placeholder="Enter the post title"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />
        {/* Editor Toolbar */}
        <div className="border border-zinc-600 rounded-t-sm p-2 bg-zinc-700 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-zinc-500' : 'bg-zinc-600'} hover:bg-zinc-500`}
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-zinc-500' : 'bg-zinc-600'} hover:bg-zinc-500`}
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded ${editor?.isActive('heading', { level: 1 }) ? 'bg-zinc-500' : 'bg-zinc-600'} hover:bg-zinc-500`}
          >
            <Heading1 size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded ${editor?.isActive('heading', { level: 2 }) ? 'bg-zinc-500' : 'bg-zinc-600'} hover:bg-zinc-500`}
          >
            <Heading2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded ${editor?.isActive('heading', { level: 3 }) ? 'bg-zinc-500' : 'bg-zinc-600'} hover:bg-zinc-500`}
          >
            <Heading3 size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${editor?.isActive('bulletList') ? 'bg-zinc-500' : 'bg-zinc-600'} hover:bg-zinc-500`}
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded ${editor?.isActive('codeBlock') ? 'bg-zinc-500' : 'bg-zinc-600'} hover:bg-zinc-500`}
          >
            <Code size={16} />
          </button>
          <button
            type="button"
            onClick={addLink}
            className={`p-2 rounded ${editor?.isActive('link') ? 'bg-zinc-500' : 'bg-zinc-600'} hover:bg-zinc-500`}
          >
            <LinkIcon size={16} />
          </button>
          <button
            type="button"
            onClick={addImage}
            className="p-2 rounded bg-zinc-600 hover:bg-zinc-500"
          >
            <ImageIcon size={16} />
          </button>
        </div>
        
        {/* Editor Content */}
        <div className="border border-zinc-600 border-t-0 rounded-b-sm min-h-[200px] bg-zinc-800">
          <EditorContent 
            editor={editor} 
            className="editor-content"
          />
        </div>
        
        {/* Custom Editor Styles */}
        <style jsx>{`
          .editor-content {
            color: white;
          }
          
          .editor-content .ProseMirror {
            padding: 1rem;
            min-height: 200px;
            outline: none;
            color: white;
            background: transparent;
          }
          
          .editor-content .ProseMirror p {
            margin: 0.5rem 0;
            color: white;
          }
          
          .editor-content .ProseMirror p.placeholder-text {
            color: #9ca3af;
            font-style: italic;
          }
          
          .editor-content .ProseMirror h1 {
            font-size: 2rem;
            font-weight: bold;
            margin: 1rem 0 0.5rem 0;
            color: white;
            line-height: 1.2;
          }
          
          .editor-content .ProseMirror h2 {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0.8rem 0 0.4rem 0;
            color: white;
            line-height: 1.3;
          }
          
          .editor-content .ProseMirror h3 {
            font-size: 1.25rem;
            font-weight: bold;
            margin: 0.6rem 0 0.3rem 0;
            color: white;
            line-height: 1.4;
          }
          
          .editor-content .ProseMirror ul {
            padding-left: 1.5rem;
            margin: 0.5rem 0;
          }
          
          .editor-content .ProseMirror li {
            margin: 0.25rem 0;
            color: white;
          }
          
          .editor-content .ProseMirror pre {
            background: #374151;
            border-radius: 0.375rem;
            padding: 1rem;
            margin: 0.5rem 0;
            overflow-x: auto;
          }
          
          .editor-content .ProseMirror code {
            background: #374151;
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
            font-family: 'Courier New', monospace;
            color: #f3f4f6;
          }
          
          .editor-content .ProseMirror a {
            color: #60a5fa;
            text-decoration: underline;
          }
          
          .editor-content .ProseMirror img {
            max-width: 100%;
            height: auto;
            border-radius: 0.375rem;
            margin: 0.5rem 0;
          }
          
          .editor-content .ProseMirror strong {
            font-weight: bold;
            color: white;
          }
          
          .editor-content .ProseMirror em {
            font-style: italic;
            color: white;
          }
        `}</style>
        
        {/* Category Selection */}
        <select
          {...register("catSlug")}
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full text-white"
        >
          <option value="">Select a category (optional)</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Description */}
        <textarea
          {...register("desc")}
          placeholder="Enter post description (optional)"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full resize-none"
          rows={3}
        />

        {/* Thumbnail URL */}
        <input
          {...register("thumbnail")}
          placeholder="Enter thumbnail URL (optional)"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="url"
        />

        {/* Keywords */}
        <input
          {...register("keywords")}
          placeholder="Enter keywords (comma separated)"
          className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
          type="text"
        />

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={isSaving || isLoading}
            className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {isSaving ? 'Saving...' : 'Save Draft'}
          </button>
          
          <button
            type="button"
            onClick={handleSubmit((data) => handlePublish(data))}
            disabled={isSaving || isLoading}
            className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <Eye size={16} />
            Publish
          </button>
        </div>

        {/* Last Saved Indicator */}
        {lastSaved && (
          <p className="text-sm text-zinc-400 mt-2">
            Last saved: {lastSaved.toLocaleTimeString()}
          </p>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-zinc-400">
            <Loader2 className="animate-spin" size={16} />
            Loading draft...
          </div>
        )}
      </form>
    </section>
  );
}
