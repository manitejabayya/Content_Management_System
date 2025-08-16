"use client";
import { useSearchParams } from "next/navigation";
import Editor from "@/components/Editor";

export default function Draft() {
    const searchParams = useSearchParams();
    const draftId = searchParams.get('id');
    
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-white mb-6">
                {draftId ? 'Edit Draft' : 'Create New Draft'}
            </h1>
            <Editor draftId={draftId} />
        </div>
    );
}