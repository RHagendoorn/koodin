import { showDetails } from "./route"

export interface MappedShowDetails {
  img: string,
  genres: string[]
  language: string
  name: string
  id: number
  summary: string
}

export function mapper(data: showDetails): MappedShowDetails {
  const { genres, image, name, id, url, summary, language } = data
  return {
    genres,
    img: image.medium!,
    name,
    id,
    summary,
    language
  }
}