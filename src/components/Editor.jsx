"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill so it only loads on client
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Editor() {
    const { register, handleSubmit } = useForm();
    const [content, setContent] = useState("");

    const handleForm = (data) => {
        console.log({
            ...data,
            content
        });
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
                <ReactQuill value={content} onChange={setContent} />
                <input
                    {...register("keywords")}
                    placeholder="Enter the KeyWords"
                    className="font-bold text-xl bg-zinc-600 px-3 py-2 rounded-sm outline-none w-full"
                    type="text"
                />
                <button
                    type="submit"
                    className="bg-zinc-800 px-3 py-2 rounded cursor-pointer"
                >
                    Save
                </button>
            </form>
        </section>
    );
}
