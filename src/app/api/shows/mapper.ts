import { showData } from "./route"

export interface MappedShowData {
  img: string,
  name: string
  id: number
}

export function mapper(data: showData[]): MappedShowData[] {
	return data
		.filter(show => !!show.show.image?.medium)
		.map(show => {
			const { image, name, id } = show.show
			return {
				img: image.medium!,
				name,
				id,
			}
		})
}