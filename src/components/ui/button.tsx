type PropsType = {
  text: string,
  color: string,
}

export function Button({ text, color }: PropsType) {

  return (
    <button className={`bg-${color}-500 px-6 py-2`}>{text}</button>
  )
}
