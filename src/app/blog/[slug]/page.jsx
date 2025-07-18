import dateFromate from "@/utils/dateFormate";
import { Calendar } from "lucide-react";
import Image from "next/image";

export default function SingleBlog(){
    const tempTags="SpaceX,Nasa,Exploration"

    const tempHtml = `
        <p>hello there</p>
    `
    return(
        <section>
            <div className="flex flex-col items-center">
                <Image className="rounded border w-[90%] md:w-[700px]" src="/image1.jpg" width={500} height={250} alt="Demo Images" />
                <div className="meta-of-a-blog space-y-2">
                <div className="flex gap-2 items-center">
                <Calendar className="text-gray-400 w-4 h-4" />
                <p>Created On: {dateFromate(new Date())}</p>
                </div>
                <div className="text-x3 flex items-center gap-2">
                    <p>Categories:</p>
                    <p className="badge bg-gray-600/30 border border-gray-600 w-fit px-2 py-1 rounded">Space Exploration</p>
                </div>
                <div className="text-x3 flex items-center gap-2">
                    <p>Tags:</p>
                    {tempTags.split(",").map(tags => (
                        <p key={tags} className="badge bg-gray-600/30 border border-gray-600 w-fit px-2 py-1 rounded">{tags}</p>
                    ))}
                    
                </div>
                {/* <div className="content" dangerouslySetInnerHTML={{__html:tempHtml}}>
                </div> */}
                
                </div>
                <p className="text-sm w-[90%] md:w-2/3 text-gray-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat saepe repellendus quam eos. Et, quod quae! Architecto, voluptatibus optio temporibus, neque quia expedita odit quidem impedit harum ex perspiciatis minus?
                Quam harum corrupti, consequuntur illum doloremque, quas suscipit placeat culpa, reiciendis doloribus quod recusandae ipsam sit beatae sequi. Repudiandae voluptatem voluptatibus temporibus tempora necessitatibus dicta fugit non sint amet maiores?
                Qui ipsum vel ea ipsa? Quis, eveniet iste. Quos quaerat laudantium accusantium provident est odit fugiat sunt aliquid in odio harum voluptates unde mollitia, numquam autem sed consectetur, vel dolores?
                Facilis eius obcaecati perferendis at corrupti! Libero, architecto? Iusto, magnam. Itaque quo obcaecati quasi, repellat libero aliquam, maxime magnam corporis sunt recusandae impedit excepturi eos tempore harum optio? Voluptatem, laudantium?
                Debitis nemo ullam quo porro quia dolor quis beatae minus, eaque quidem. Quo porro sit distinctio earum illum nostrum, dolorum rem dolore! Sint neque assumenda odio optio vero quaerat provident.
                Reiciendis vero molestias obcaecati illo numquam. Non quibusdam eveniet perferendis commodi. Natus voluptates ullam porro obcaecati qui minus ad id laborum aut. Laboriosam ducimus quam voluptatum soluta esse aliquam at.
                Id possimus, aut doloremque nulla voluptates veniam repellendus voluptate hic optio amet, molestiae ut sit temporibus voluptas. Corporis nihil dignissimos, ipsam ullam fugit eum mollitia commodi repellendus hic ea. Numquam?
                Quisquam ut dolorem alias earum illum pariatur inventore, hic id repellendus atque eligendi aliquid commodi quae qui quis harum eveniet exercitationem officiis ducimus? Consectetur architecto eum, vitae atque exercitationem perferendis.
                Nihil, voluptates. Molestiae necessitatibus tenetur ut iste, voluptas sed obcaecati, veritatis dolor laboriosam modi qui unde! Laborum doloribus voluptatum explicabo magnam harum dignissimos labore nemo, quae adipisci vel nam illum.
                Iste nihil labore sit commodi! Eum est odio minus in recusandae saepe, animi laudantium soluta doloribus nemo voluptates ex neque tempore cum beatae maiores repudiandae quia harum rem consequuntur veritatis.
                Reprehenderit porro quidem alias blanditiis, dolorem, aliquid animi architecto autem fuga rerum fugiat doloribus tempora optio voluptatibus vero sint ipsum soluta? Veritatis nostrum a dignissimos ut, assumenda rem placeat sunt.
                Quam sint modi quae maxime iusto. Ducimus distinctio eos veritatis, magnam animi eaque omnis quis obcaecati quasi alias mollitia ipsum. Illo officiis doloribus quibusdam ducimus eius animi distinctio nostrum est.
                Ab quaerat excepturi cupiditate nam explicabo quidem deleniti dolor necessitatibus. Magni tempore laudantium quaerat iste consectetur cum architecto! Perferendis dolorem quibusdam nisi non dicta quae inventore obcaecati repellat facilis porro?
                Asperiores consectetur magni, a corporis labore molestias sint iste quia dicta laudantium enim laborum distinctio explicabo pariatur quam aut. Labore aut sit illum, ut quia non! Animi sint at a.
                Consectetur hic quos ducimus impedit commodi, laboriosam illo, voluptatibus ut dolorem a blanditiis nemo vel alias odit eum dignissimos necessitatibus quas cum magnam quidem debitis. Laboriosam, consequuntur qui! Provident, ut?
                Ipsum provident, minima quod itaque exercitationem reprehenderit quia libero dolor, suscipit consequuntur nobis, fugiat corrupti optio voluptatibus tenetur incidunt? Quo animi soluta nemo modi. Animi mollitia nesciunt id culpa ut?
                Consequuntur earum laboriosam quas aut sint optio mollitia magni, tempora hic, a cum eum ducimus eius blanditiis quaerat sequi commodi explicabo, omnis quasi soluta tenetur. Fuga iure mollitia quod soluta.
                Libero ducimus nobis hic nihil. Et itaque velit eius neque saepe similique minima laudantium, exercitationem adipisci ipsum deserunt voluptate omnis provident hic commodi inventore veritatis? Itaque est in dicta vel.
                Neque minus esse veniam placeat ullam vero nisi, autem distinctio eligendi nostrum veritatis accusantium dignissimos aliquid dicta adipisci officia vel dolore, totam culpa. Quasi repellat doloremque aliquid doloribus rem incidunt?
                Corrupti officia quod doloremque dolores incidunt ab nihil, ducimus vero necessitatibus illo reprehenderit consectetur officiis voluptatibus in aliquam repellendus facilis porro aut. Accusantium pariatur tempore et? Placeat fuga odit officia!</p>
            </div>

        </section>
    )
}