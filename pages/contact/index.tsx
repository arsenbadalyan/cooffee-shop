import type { NextPage } from "next";
import Layout from "../../components/layout";
import ContactView from "../../components/pages/contact";

const ContactPage: NextPage = () => {
  return (
    <Layout
      pageMeta={{
        title: "COOFFEE | Contact",
      }}
    >
      <ContactView />
    </Layout>
  );
};

export default ContactPage;
