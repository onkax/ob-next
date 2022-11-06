export const assetFragment = `
fragment assetFragment on Asset {
    sys {
      id
    }
    title
    description
    fileName
    contentType
    url(transform: {format: WEBP, quality: 90})
    thumb: url(transform: {format: WEBP, quality: 90, width: 260, height: 195, resizeStrategy: PAD})
    downloadUrl: url
    width
    height
  }
`;
