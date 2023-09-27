'use client'
import styles from './page.module.css'
import { signIn } from "next-auth/react"
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/UI/Navbar';

export default function Home() {
  const [error, setError] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassoword] = useState("");

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (res?.error) {
        setError(()=> {
          if(res.error) return res.error
          return ""
        });
        return;
      }
      router.replace("/");
      
  }

  return (
    <>
   
   <div className={styles.container}>
   <Navbar/>
      <div className={styles['container-login']}>
        <div className={styles['wrap-login']}>
          <form onSubmit={handleSubmit} className={styles['login-form']}>
            <span className={styles['login-form-title']}>Bem Vindo!</span>
             <div className={styles['wrap-input']}>
              <input
               className={email !== "" ? `${styles['has-val']} ${styles.input}` : styles.input}
               type="email"
               value={email}
               onChange={e => setEmail(e.target.value)}
                />
              <span className={styles['focus-input']} data-placeholder='Email'></span>
            </div>

            <div className={styles['wrap-input']}>
              <input 
               className={password !== "" ? `${styles['has-val']} ${styles.input}` : styles.input}
               type="password"
               value={password}
               onChange={e => setPassoword(e.target.value)}
               />
              <span className={styles['focus-input']} data-placeholder='Password'></span>
            </div>

          <div className={styles['container-login-form-btn']}>
                      
          <div className={styles.error}>{error}</div>
            <button className={styles["login-form-btn"]}>Login</button>
          </div>

          <div className={styles["text-center"]}>
            <a className={styles.txt2} href="/auth/sing-up">
              <span className={styles.txt1}>Não possui conta?</span>
            </a>
          </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
