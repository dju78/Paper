import { MetadataRoute } from 'next'
import { getAllPublications } from '../lib/publications'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://omoyelejd.co.uk'
  const publications = await getAllPublications()

  const publicationEntries = publications.map((pub) => ({
    url: `${baseUrl}/${pub.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...publicationEntries,
  ]
}
