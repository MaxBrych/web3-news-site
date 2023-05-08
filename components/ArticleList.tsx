import { useState, useEffect } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";

interface Article {
  id: number;
  creator: string;
  timestamp: number;
  category: string;
  headline: string;
  mainImage: string;
  content: string;
  voteCount: number;
}

export default function Article({ article }: { article: Article }) {
  return (
    <div>
      <h3>{article.headline}</h3>
      <img src={article.mainImage} alt={article.headline} width="200" />
      <p>Category: {article.category}</p>
      <p>Content: {article.content}</p>
      <p>Vote Count: {article.voteCount}</p>
      <p>Creator: {article.creator}</p>
    </div>
  );
}
