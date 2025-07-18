import Image from "next/image";
import Link from "next/link";

const blogConfig=[
    {
        "title":"React vs Next js", 
        "excerpt":"Nextjs is the ultimate development",
        "image":"/image1.jpg",
        "url":"/demo-slug"
    },
    {
        "title":"Dreams to be a Remote Developer", 
        "excerpt":"Nextjs is the ultimate development",
        "image":"/image2.jpg",
        "url":"/demo-slug"
    },
    {
        "title":"Become a Backend dev in no time", 
        "excerpt":"Nextjs is the ultimate development",
        "image":"/image1.jpg",
        "url":"/demo-slug"
    }
    
    
]

export default function Blogs(){
    return(
        <section className="grid grid-cols-3 gap-4">
            {
                blogConfig.map((blog,index)=>{
                    return <BlogCard title={blog.title} excerpt={blog.excerpt} image={blog.image} url={blog.url} key={index} />
                })
            }
        </section>
    )

}

const BlogCard = ({ title, excerpt, image,url}) => (
    <div className="blog-card bg-gray-600/20 rounded-lg border flex flex-col p-2 gap-1 hover:scale-[1.03] transition-all delay-100 duration-300">
        {image && <Image className="w-full rounded-md" src={image} alt={title} width={300} height={200} />}
        <h2 className="text-3xl font-bold text-gray-200">{title}</h2>
        <p>{excerpt}</p>
        <Link className="bg-zinc-600/70 py-2 px-2 rounded w-fit text-xs" href={`blogs/${url}`}>Read More</Link>
    </div>
);