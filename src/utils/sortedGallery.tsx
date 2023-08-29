import _ from 'lodash'

export const sortedGallery = (gallery: IGallery) => {
  const sortedGallery = _.sortBy(gallery?.thumbnails, ['position'])

  return {
    ...gallery,
    thumbnails: sortedGallery,
  }
}