import Link from "next/link";

type PropsType = {
  plan_name: string,
  price: string,
  period: string,
  access_list: string[]
}

export function PricingComponent({ plan_name, price, period, access_list }: PropsType) {
  return (
    <div>
      <div>
        <h3>
          {plan_name}
        </h3>
        <h3>{price}/{period}</h3>
        <ul>
          {
            access_list.map((item: string, index: number) => {
              return (
                <li key={index}>{item}</li>
              )
            })
          }
        </ul>
      </div>
      <Link href={""}><button>Start Free Trial</button></Link>
    </div>
  )
}
