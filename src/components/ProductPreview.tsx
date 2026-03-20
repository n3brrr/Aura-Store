import React from "react";

interface ProductPreviewProps {
  image: string;
  name: string;
  price: string;
  category: string;
  tag?: string;
}

export default function ProductPreview({
  image,
  name,
  price,
  category,
  tag,
}: ProductPreviewProps) {
  return <></>;
}
