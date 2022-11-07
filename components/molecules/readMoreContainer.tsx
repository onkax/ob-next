/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FunctionComponent,
  useState,
  useCallback,
  ReactNode,
} from "react";
import ReadMoreButton from "../atoms/readMoreButton";

type ReadMoreContainer = {
  text: string | ReactNode;
  lineClamp: number | undefined;
  readMoreText?: string;
};

export const ReadMoreContainer: FunctionComponent<ReadMoreContainer> = ({
  text,
  lineClamp,
  readMoreText = "Read More",
}) => {
  const [shouldTruncate, setShouldTruncate] = useState<boolean>(false);
  const [readMore, setReadMore] = useState<boolean>(false);

  const measuredRef = useCallback(
    (node: HTMLParagraphElement) => {
      if (node?.parentElement) {
        const elHeight = node.offsetHeight;
        const styles = window.getComputedStyle(node);
        const lineHeight = styles
          .getPropertyValue("line-height")
          .replace("px", "");
        const elLineCount = elHeight / parseInt(lineHeight, 10);

        setShouldTruncate(elLineCount > (lineClamp || 3));
      }
    },
    [text]
  );

  const shouldClamp = shouldTruncate && !readMore;

  return (
    <>
      <p
        ref={measuredRef}
        className={`${
          shouldClamp ? `line-clamp-${lineClamp}` : "line-clamp-none"
        }`}
      >
        {text}
      </p>
      {shouldTruncate && (
        <ReadMoreButton
          readMore={readMore}
          onClick={(): void => {
            setReadMore(!readMore);
          }}
        />
      )}
    </>
  );
};
