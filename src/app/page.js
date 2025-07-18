import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";

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
          <Button variant={"default"} className="bg-gray-200 mr-3">Try it Out!</Button>
          <Button variant={"outline"}>Try it Out!</Button>
          </div>
        </div>
      </section>
      <section className="min-h-screen sm:min-h-[80vh] bg-gray-600/10">
      <span className="max-w-1/3">
        <Pencil size={50} />
        <h3>Intutive Editor</h3>
        <p>Create and edit content with user friendly interface</p>
      </span>
      </section>
    </main>
  );
}
