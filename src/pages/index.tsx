import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import { previewClient } from "@src/lib/client";

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const page = useContentfulLiveUpdates(props.page);

  return <>{JSON.stringify(page, null, 2)}</>;
};

export const getStaticProps: GetStaticProps = async ({
  locale,
  draftMode: preview,
}) => {
  try {
    const gqlClient = previewClient;

    const landingPageData = await gqlClient.pageLanding({ locale, preview });
    const page = landingPageData.pageLandingCollection?.items[0];

    console.log("page", page);
    if (!page) {
      return {
        revalidate: 10000,
        notFound: true,
      };
    }

    return {
      revalidate: 10000,
      props: {
        page,
      },
    };
  } catch {
    return {
      revalidate: 10000,
      notFound: true,
    };
  }
};

export default Page;
