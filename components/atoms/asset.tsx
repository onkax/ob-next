import Image from "next/image";
import { MouseEventHandler } from "react";
import { IImage } from "../interfaces/contentful";
import { useResourceProvider } from "../stores/resource";

declare const VALID_LAYOUT_VALUES: readonly [
  "fill",
  "fixed",
  "intrinsic",
  "responsive",
  undefined
];
declare type LayoutValue = typeof VALID_LAYOUT_VALUES[number];
declare type ImgElementStyle = NonNullable<
  JSX.IntrinsicElements["img"]["style"]
>;

export default function Asset({
  image,
  className = "",
  layout,
  objectFit,
  onClick,
  showThumb = false,
}: {
  image: IImage;
  className?: string;
  layout?: LayoutValue;
  objectFit?: ImgElementStyle["objectFit"];
  onClick?: MouseEventHandler<HTMLImageElement> | undefined;
  showThumb?: boolean;
}): JSX.Element {
  const { getResource } = useResourceProvider();
  return (
    image && (
      <Image
        src={showThumb ? image.thumb : image.url}
        alt={image.description || getResource("general.company.title")}
        width={layout === "fill" ? undefined : showThumb ? 125 : image.width}
        height={layout === "fill" ? undefined : showThumb ? 40 : image.height}
        className={className}
        layout={layout}
        objectFit={objectFit}
        onClick={onClick}
      />
    )
  );
}
