import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { Layers, Pencil, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <main className="w-full ">
      <section className="flex justify-center h-[50vh] sm:h-[70vh] w-full">
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl" >Mange your content</h1>
          <p className="text-gray-400 max-w-[700px] mx-auto">
            Streamline your content workflow,public with condfidently
          </p>
          <div className="flex gap-3">
          <Link href="/sign-in" variant={"default"} className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-1 rounded transition all duration-200 delay-100">Try it Out!</Link>
          <Link href="/" variant={"outline"}>Learn More</Link>
          </div>
        </div>
      </section>
      <section className="min-h-screen sm:min-h-[80vh] bg-gray-600/10"> 
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 flex justify-center items-center w-full h-screen px-4">
      <span className="flex flex-col items-center gap-2">
        <Pencil className="w-16 h-16 text-white" />
        <h3>Intutive Editor</h3>
        <p className="text-gray-400">Create and edit content with user friendly interface</p>
      </span>
      <span className="flex flex-col items-center gap-2">
        <Layers size={50} />
        <h3>Flexiable Tools</h3>
        <p className="text-gray-400">Create and edit content with user friendly interface</p>
      </span>
      <span className="flex flex-col items-center gap-2">
        <Zap size={50} />
        <h3>Blazing fast</h3>
        <p className="text-gray-400">Create and edit content with user friendly interface</p>
      </span>
      </div>
      </section>
      <section className="h-{60vh} sm:h-[50vh] w-full flex flex-col justify-center items-start">
        <div className="max-w-[50%] mx-auto space-y-3">
          <h4 className="font-bold text-2xl">
          Ready to transform yout content Journey
        </h4>
        <p className="text-sm text-gray-400">
          Join thousands of content creators like you who chose ManiCMS
        </p>
        <div className="flex gap-2">
          <input className="bg-zinc-800 focus:outline-none rounded-md px-2 text-sm text-gray-400" type="text" placeholder="Enter your Email" />
          <Button variant="outline">Submit</Button>
        </div>
        </div>
      </section>
    </main>
  );
}
