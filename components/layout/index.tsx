import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NavBar from "../library/navBar";
import Footer from "../library/footer";
import Hero from "../../public/assets/cooffee-hero.jpg";

const styles = require("./layout.module.scss");

type LayoutProps = {
  children: React.ReactElement;
  pageMeta?: {};
};

const Layout: React.FC<LayoutProps> = ({ children, pageMeta }) => {
  const router = useRouter();

  // Default meta tags if not otherwise set via the pageMeta prop
  const meta = {
    title: "COOFFEE SHOP",
    description: "coffee first, questions later",
    type: "website",
    image: Hero.src,
    twitterImage: "",
    imageAlt: "A coffee shop floating in space along with other coffee related debris",
    url: ``,
    ...pageMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="COOFFEE SHOP" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.url} />
        <meta name="twitter:image" content={meta.twitterImage} />
        <meta name="twitter:image:alt" content={meta.imageAlt} />
        <meta name="twitter:title" content={meta.title} />
        <meta property="twitter:description" content={meta.description} />
        <meta property="twitter:site" content="@augericke" />
        <meta property="twitter:creator" content="@augericke" />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.layoutContainer}>
        <NavBar />
        <main className={styles.contentContainer}>
          {React.cloneElement(children)}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
