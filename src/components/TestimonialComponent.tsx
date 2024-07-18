import Image from "next/image"

type PropsType = {
  reviewerName: string,
  reviewer: string,
  review_text: string,
  imgSrc: string,
  imgAlt: string
}

export function TestimonialComponent({ reviewerName, reviewer, review_text, imgSrc, imgAlt }: PropsType) {
  return (
    <div className="flex flex-col items-start justify-start flex-1 min-w-60 rounded-md drop-shadow-lg border bg-white pb-4">
      <div className="flex items-center p-4">
        <div>
          <Image src={imgSrc} alt={imgAlt} height={64} width={64} />
        </div>
        <div className="flex flex-col">
          <p className="text-base font-bold">{reviewerName}</p>
          <p className="text-sm text-gray-600">{reviewer}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-base text-gray-800">{review_text}</p>
      </div>
    </div>
  )
}
