import { notFound } from "next/navigation";

import Debate from "../../src/Debate";
import { DEBATES_LIST, DEBATES_BY_PATH } from "../../src/data";

export function generateStaticParams() {
  return DEBATES_LIST.map((debate) => ({ slug: debate.path.slice(1) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const debate = DEBATES_BY_PATH[`/${slug}`];

  if (!debate) {
    return {};
  }

  let ogImage = debate.listing ? debate.listing.imageSrc : "";
  if (!ogImage.startsWith("http")) {
    ogImage = `https://demagogtv.cz${ogImage}`;
  }

  return {
    title: `${debate.title} – DemagogTV`,
    openGraph: {
      images: [{ url: ogImage, alt: debate.title }],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const debate = DEBATES_BY_PATH[`/${slug}`];

  if (!debate) {
    notFound();
  }

  return <Debate slug={slug} />;
}
