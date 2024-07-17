import Link from "next/link";

type PropsType = {
  plan_name: string,
  price: string,
  period: string,
  access_list: string[]
}

export function PricingComponent({ plan_name, price, period, access_list }: PropsType) {
  return (
    <div className="flex-1 w-auto p-6 flex flex-col bg-white rounded-md drop-shadow-md">
      <div className="flex flex-col gap-y-3">
        <h3 className="text-xl font-bold">
          {plan_name}
        </h3>
        <h3 className="text-sm text-slate-700"><span className="text-3xl font-bold">$ {price}</span> /{period}</h3>
        <ul className="ml-6 leading-10">
          {
            access_list.map((item: string, index: number) => {
              return (
                <li key={index} className="list-disc text-base">{item}</li>
              )
            })
          }
        </ul>
      </div>
      <Link href={""} className="mt-12 py-2 px-4 bg-cyan-500 text-white text-center rounded-full">Start Free Trial</Link>
    </div>
  )
}
