import { sortedGallery } from "./sortedGallery"

export const getOneImage = (gallery: IGallery):IThumbnail => {
  return sortedGallery(gallery).thumbnails[0]
}