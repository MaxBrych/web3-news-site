import { useEffect, useState } from "react";
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import ArticleList from "../components/ArticleList";

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

const Home: NextPage = () => {
  const [category, setCategory] = useState("");
  const [headline, setHeadline] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [content, setContent] = useState("");

  const address = useAddress();
  const [listings, setListings] = useState<Article[]>([]);

  const { contract: articles, isLoading } = useContract(
    "0x719c7675FF523d9cF6Bc334e6D1D10C4233953F6"
  );

  const fetchListings = async () => {
    if (isLoading) return;
    const totalArticles = await articles?.call("getTotalArticles");

    const listings = [];

    for (let i = 1; i <= totalArticles; i++) {
      const rawListings = await articles?.call("articles", [i]);

      const article = {
        id: rawListings[0].toNumber(),
        creator: rawListings[1],
        timestamp: rawListings[2].toNumber(),
        category: rawListings[3],
        headline: rawListings[4],
        mainImage: rawListings[5],
        content: rawListings[6],
        voteCount: rawListings[7].toNumber(),
      };
      listings.push(article);
    }

    setListings(listings);
    console.log(listings);
  };

  useEffect(() => {
    fetchListings();
  }, [isLoading]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Submit an Article</h1>
        <form>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <br />
          <label>
            Headline:
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </label>
          <br />
          <label>
            Main Image URL:
            <input
              type="text"
              value={mainImage}
              onChange={(e) => setMainImage(e.target.value)}
            />
          </label>
          <br />
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <br />
        </form>
        <Web3Button
          contractAddress="0x719c7675FF523d9cF6Bc334e6D1D10C4233953F6"
          action={(contract) => {
            contract.call("submitArticle", [
              category,
              headline,
              mainImage,
              content,
            ]);
          }}
        >
          Submit Article
        </Web3Button>
        <h1>Articles</h1>
        {listings.map((article) => (
          <ArticleList key={article.id} article={article} />
        ))}
      </main>
    </div>
  );
};

export default Home;
