import React, { Fragment } from "react";
import ContactForm from "../../components/contact/contact-form";
import Head from "next/head";

export default function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Contact</title>
        <meta name="description" content="This is the contact page" />
      </Head>
      <ContactForm />;
    </Fragment>
  );
}
