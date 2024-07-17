import Image from "next/image";

type PropsType = {
  title: string,
  paragraph: string,
  img_src: string,
}

export function FeatureComponentReverse({ title, paragraph, img_src }: PropsType) {
  return (
    <div className="flex items-start justify-center w-2/3 mx-auto p-16 gap-x-12">
      <div className="flex-1">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-base leading-8 mt-4">{paragraph}</p>
      </div>
      <div className="flex-1"><Image src={img_src} alt="feature-image-1" height={360} width={480} /></div>
    </div>
  )
}
