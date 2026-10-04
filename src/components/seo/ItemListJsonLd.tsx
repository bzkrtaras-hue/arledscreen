import { absoluteUrl } from "@/lib/site";

export interface ItemListEntry {
  name: string;
  url: string;
  image?: string;
}

export function ItemListJsonLd({
  name,
  description,
  items,
}: {
  name: string;
  description?: string;
  items: ItemListEntry[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      ...(item.image
        ? { image: absoluteUrl(item.image.startsWith("/") ? item.image : `/${item.image}`) }
        : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
