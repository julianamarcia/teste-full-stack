'use client'
import styles from './page.module.css'
import { FormEventHandler, useState } from 'react';

import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/UI/Navbar';

export default function Home() {
  
  const [error, setError] = useState("");
  const[name, setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassoword] = useState("");

  const router = useRouter();

  const[busy, setBusy] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setBusy(true);

    try{
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({name: name, email: email, password: password}),
      });
      const res = await response.json();
      if (res?.user) {
        router.replace("/");
      }
      if (res?.error) {
        setError(()=> {
          setBusy(false)
          if(res.error) return res.error
          return ""
        });
      }
      return setBusy(false);
    } catch (errortry) {
      // setError("Error");
      return setBusy(false);
    };
  };

  return (
   <div className={styles.container}>
    <Navbar/>
      <div className={styles['container-login']}>
        <div className={styles['wrap-login']}>
          <form onSubmit={handleSubmit} className={styles['login-form']}>
            <span className={styles['login-form-title']}>Cadastro</span>  

            <div className={styles['wrap-input']}>
              <input
               className={name !== "" ? `${styles['has-val']} ${styles.input}` : styles.input}
               type="text"
               value={name}
               onChange={e => setName(e.target.value)}
                />
              <span className={styles['focus-input']} data-placeholder='Nome'></span>
            </div>        
            
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
            <button disabled={busy} style={{opacity: busy ? 0.5 : 1}} className={styles["login-form-btn"]}>Registrar Conta</button>
          </div>

          <div className={styles["text-center"]}>
            <a className={styles.txt2} href="/auth/login">
              <span className={styles.txt1}>Já possui conta?</span>
            </a>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};
