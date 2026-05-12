import { Helmet } from 'react-helmet-async'

interface SeoProps {
    title: string
    description?: string
    image?: string
    url?: string
}

export function SeoHelmet({ title, description, image, url }: SeoProps) {
    const siteTitle = "LUXEDIVE | Premium Car Rental Ahmedabad"
    const finalTitle = title === "Home" ? siteTitle : `${title} | LUXEDIVE`
    const desc = description || "Rent luxury cars in Ahmedabad. Self-drive and chauffeur services for weddings, corporate, and leisure."
    const img = image || "https://luxedive.com/og-image.jpg"
    const pageUrl = url || window.location.href

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={desc} />
            
            {/* Open Graph */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={desc} />
            <meta property="og:image" content={img} />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:type" content="website" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content={img} />
        </Helmet>
    )
}
