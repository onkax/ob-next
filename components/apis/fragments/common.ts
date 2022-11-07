export const assetFragment = `
fragment assetFragment on Asset {
    sys {
      id
    }
    title
    description
    fileName
    contentType
    url(transform: {format: JPG_PROGRESSIVE, quality: 90})
    thumb: url(transform: {format: WEBP, quality: 50, width: 250, height: 80, resizeStrategy: PAD})
    downloadUrl: url
    width
    height
  }
`;
