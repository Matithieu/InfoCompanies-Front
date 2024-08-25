import { Helmet } from 'react-helmet-async'

type SEOProps = {
  title: string
  description: string
  name?: string
  type?: string
}

export default function Seo({ title, description }: SEOProps) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta content={description} name="description" />
      {/* End standard metadata tags */}

      {/* Facebook tags */}
      {/* <meta content={type} property="og:type" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" /> */}
      {/* End Facebook tags */}

      {/* Twitter tags */}
      {/* <meta content={type} name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" /> */}
      {/* End Twitter tags */}
    </Helmet>
  )
}
