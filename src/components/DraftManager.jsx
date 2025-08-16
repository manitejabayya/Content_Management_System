"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Eye, Calendar, User, Loader2 } from "lucide-react";

export default function DraftManager() {
  const { data: session } = useSession();
  const router = useRouter();
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (session) {
      fetchDrafts();
    }
  }, [session]);

  const fetchDrafts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/drafts');
      const data = await response.json();
      if (response.ok) {
        setDrafts(data.drafts || []);
      } else {
        console.error('Error fetching drafts:', data.error);
      }
    } catch (error) {
      console.error('Error fetching drafts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDraft = async (id) => {
    if (!confirm('Are you sure you want to delete this draft?')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/drafts/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setDrafts(drafts.filter(draft => draft.id !== id));
        alert('Draft deleted successfully');
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting draft:', error);
      alert('Error deleting draft');
    } finally {
      setDeletingId(null);
    }
  };

  const publishDraft = async (id) => {
    if (!confirm('Are you sure you want to publish this draft?')) {
      return;
    }

    try {
      const response = await fetch(`/api/drafts/${id}/publish`, {
        method: 'POST'
      });

      const data = await response.json();
      if (response.ok) {
        alert('Draft published successfully!');
        fetchDrafts(); // Refresh the list
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error publishing draft:', error);
      alert('Error publishing draft');
    }
  };

  const editDraft = (id) => {
    router.push(`/draft?id=${id}`);
  };

  if (!session) {
    return (
      <div className="p-8 text-center">
        <p className="text-zinc-400">Please sign in to view your drafts.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="animate-spin mr-2" size={20} />
        <span className="text-zinc-400">Loading drafts...</span>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">My Drafts</h1>
        <button
          onClick={() => router.push('/draft')}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          New Draft
        </button>
      </div>

      {drafts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-400 mb-4">No drafts found.</p>
          <button
            onClick={() => router.push('/draft')}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Create Your First Draft
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="bg-zinc-800 border border-zinc-700 rounded-lg p-6 hover:border-zinc-600 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {draft.title || 'Untitled Draft'}
                  </h3>
                  {draft.desc && (
                    <p className="text-zinc-400 mb-2 line-clamp-2">
                      {draft.desc}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>
                        {new Date(draft.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{draft.author.name || draft.author.username}</span>
                    </div>
                    {draft.category && (
                      <span className="bg-zinc-700 px-2 py-1 rounded text-xs">
                        {draft.category.name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => editDraft(draft.id)}
                    className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded text-white"
                    title="Edit Draft"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => publishDraft(draft.id)}
                    className="p-2 bg-green-700 hover:bg-green-600 rounded text-white"
                    title="Publish Draft"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => deleteDraft(draft.id)}
                    disabled={deletingId === draft.id}
                    className="p-2 bg-red-700 hover:bg-red-600 rounded text-white disabled:opacity-50"
                    title="Delete Draft"
                  >
                    {deletingId === draft.id ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
              
              {draft.keywords && (
                <div className="flex flex-wrap gap-2">
                  {draft.keywords.split(',').map((keyword, index) => (
                    <span
                      key={index}
                      className="bg-zinc-700 text-zinc-300 px-2 py-1 rounded text-xs"
                    >
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
