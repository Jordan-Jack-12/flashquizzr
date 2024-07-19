type PropsType = {
  ques: string,
  ans: string,
}


export function FaqComponent({ ques, ans }: PropsType) {
  return (
    <details className="container duration-300 select-none">
      <summary className="list-none cursor-pointer text-2xl font-semibold hover:bg-gray-200 rounded-md px-5 py-3">
        {ques}
      </summary>
      <div className="px-5 py-3 max-w-[850px]">
        <p className="">
          {ans}
        </p>
      </div>
    </details>
  )
}
