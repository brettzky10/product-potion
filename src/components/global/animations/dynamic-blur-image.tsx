//Blur Image from remote source(like supabase)
/* 
import Image from "next/image"
import { getPlaiceholder } from "plaiceholder"



const DynamicBlurImage: React.FC<{ src: string }> = async ({ src }) => {
    
    const buffer =await fetch(src).then(async (res)=>{
        return Buffer.from(await res.arrayBuffer())
    })

    const {base64} =await getPlaiceholder(buffer)

    return(
        <div className="relative h-56 w-full">
            <Image
                src={`${src}` || '/icons/placeholder.svg' }
                alt="thumbnail"
                placeholder="blur"
                sizes="30vw"
                blurDataURL={base64}
            />
        </div>
    )
}

export default DynamicBlurImage */