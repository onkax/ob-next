import {
  Block,
  BLOCKS,
  Inline,
  INLINES,
  MARKS,
} from "@contentful/rich-text-types";
import { Options } from "@contentful/rich-text-react-renderer";
import { ReactNode } from "react";
import { IComponentArticle } from "../../interfaces/components";
import { ReadMoreContainer } from "../../molecules/readMoreContainer";
// import { ReadMoreContainer } from '@atoms/readMoreContainer';

export default class RichTextFormatter {
  static Options(removeP: boolean, lineClamp: number | undefined): Options {
    const options: Options = {};
    options.renderNode = {
      [BLOCKS.PARAGRAPH.toString()]: (
        node: Block | Inline,
        children: ReactNode
      ): ReactNode => {
        if (removeP)
          return (
            <ReadMoreContainer
              text={children as string}
              lineClamp={lineClamp}
            />
          );
        else return <p>{children}</p>;
      },
      [BLOCKS.UL_LIST.toString()]: (
        node: Block | Inline,
        children: ReactNode
      ): ReactNode => <ul className="pin">{children}</ul>,
    };
    options.renderText = (text: ReactNode): ReactNode => text;

    return options;
  }
}
