import { createContext, useContext, useState } from "react";
import { IImage } from "../interfaces/contentful";

type IImageStore = {
  images: object;
  setImageList: (imageList: IImage[]) => void;
  getImages: (key: string) => IImage;
};

const ImageContext = createContext<IImageStore>({} as IImageStore);

export const useImageProvider = (): IImageStore => useContext(ImageContext);

export function ImageProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [images, setImages] = useState({});

  const setImageList = (images: IImage[]): void =>
    setImages(
      images.reduce((acc, item) => ({ ...acc, [item.title]: item }), images)
    );

  const getImages = (key: string): IImage =>
    images[key as keyof typeof images] ?? key;

  return (
    <ImageContext.Provider
      value={{
        images: images,
        setImageList: setImageList,
        getImages: getImages,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}
