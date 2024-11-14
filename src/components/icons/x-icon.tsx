import * as React from 'react'

function XIcon(props: React.SVGProps<SVGSVGElement> | undefined) {
  return (
    <svg
      className="fill-foreground"
      height="18px"
      viewBox="0 0 24 24"
      width="18px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z" />
    </svg>
  )
}

export default XIcon