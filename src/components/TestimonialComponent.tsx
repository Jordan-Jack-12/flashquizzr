
type PropsType = {
  reviewer: string,
  review_text: string,
}

export function TestimonialComponent({ reviewer, review_text }: PropsType) {
  return (
    <div className="flex flex-col items-start justify-center">
      <p>{reviewer}</p>
      <p>{review_text}</p>
    </div>
  )
}
