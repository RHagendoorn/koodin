import { showData } from "./route"

export interface MappedShowData {
  score: number
  img: string
  name: string
  id: number
}

function insertShow(genre: MappedShowData[] = [], insert: MappedShowData) {
  const index = genre.findIndex(show => show.score < insert.score);
  const insertAt = index === -1 ? genre.length : index;

  return [
    ...genre.slice(0, insertAt),
    insert,
    ...genre.slice(insertAt)
  ]
}

export function mapper(data: showData[]): Record<string, MappedShowData[]> {
  return data
    .filter(show => !!show.show.image?.medium)
    .reduce((total, show) => {
      const { image, name, id } = show.show
      const showData = {
        score: show.score,
        img: image.medium!,
        name,
        id,
      }
      show.show.genres.forEach(genre => {
        total[genre] = insertShow(total[genre], showData)
      })
      return total
    }, {} as Record<string, MappedShowData[]>)
}