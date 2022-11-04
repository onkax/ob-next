import { NextSeo } from "next-seo";
import { IPageSeo } from "../interfaces/contentful";
import { useResourceProvider } from "../stores/resource";

const Meta = (props: IPageSeo): JSX.Element => {
  const { getResource } = useResourceProvider();
  return (
    <NextSeo
      noindex={props.noIndex}
      nofollow={props.noFollow}
      title={props.title || getResource("general.company.title")}
      description={props.description}
      canonical={props.canonicalUrl}
      openGraph={{
        title: props.ogTitle,
        type: props.ogType,
        url: props.ogUrl,
      }}
      additionalMetaTags={[
        {
          property: "keywords",
          content: props.keywords,
        },
      ]}
      additionalLinkTags={[
        {
          rel: "icon",
          href: "/favicon.ico",
        },
      ]}
    />
  );
};

Meta.defaultProps = {
  title: "Basic-Fit",
  keywords: "Basic-Fit",
  description: "Basic-Fit",
};

export default Meta;
