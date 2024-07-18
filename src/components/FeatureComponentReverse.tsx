import Image from "next/image";

type PropsType = {
  title: string,
  paragraph: string,
  img_src: string,
}

export function FeatureComponentReverse({ title, paragraph, img_src }: PropsType) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center container mx-auto p-16 gap-12">
      <div className="">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-base max-w-[450px] text-gray-700 leading-8 mt-4">{paragraph}</p>
      </div>
      <div className=""><Image src={img_src} alt="feature-image-1" height={360} width={360} /></div>
    </div>
  )
}
