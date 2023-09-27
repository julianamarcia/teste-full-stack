'use client'
import { useState } from "react";
import styles from "./navbar.module.css";
import { signOut, useSession } from "next-auth/react";

let signLink;

function Navbar() {
  const  { data, status } = useSession();
	const [show, setShow]= useState(false);
  // const [isAuth, setIsAuth] = useState(false);

  const isAuth = status === 'authenticated';

  const showNavbar = () => {
		setShow((oldState)=> !oldState);
	};

  if(isAuth)
    signLink = <a className={styles.aa} onClick={()=> signOut()}>Logout</a>
  else 
    signLink = <a className={styles.a} href={'/auth/login'}>Login</a>
  

	return (
		<header className={styles.header}>
			<h3>Beers</h3>
			<nav className={`${styles.nav} ${show && `${styles['responsive_nav']}`}`}>
				<a className={styles.a} href="/home">Home</a>
				<a className={styles.a} href="/">Beers</a>
				{ signLink }
				<button
					className={`${styles["nav-btn"]} ${styles["nav-close-btn"]}`}
					onClick={showNavbar}>X
				</button>
			</nav>
      <button
				className={styles["nav-btn"]}
				onClick={showNavbar}>X
			</button>
			
		</header>
	);
}

export default Navbar;