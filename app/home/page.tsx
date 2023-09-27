import styles from "./page.module.css"
import React from 'react'
import Image from 'next/image'
import img from './garrafas-de-vidro-de-cerveja-com-vidro-e-gelo-no-fundo-escuro.jpeg';
import Navbar from "../components/UI/Navbar";


function page() {
  return (
    <>
    <div className={styles.container}>
      <Navbar></Navbar>
      <Image
      src={img}
      alt="beer"
      objectFit="cover"
      layout="responsive"
      className={styles["imagem-background"]}
      />
      </div>

    </>
  );
};



export default page