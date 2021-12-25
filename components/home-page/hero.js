import Image from "next/image";
import React from "react";
import classes from "./hero.module.css";


export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image} v>
        <Image src="/images/site/gabePic.png" alt="img showing Gabriel" width={300} height={300}/>
      </div>
      <h1>Hello, I am Gabriel :)</h1>
      <p>I am trying out Next.js and decided to make this.</p>
    </section>
  );
}
