import Image from 'next/image'
import styles from './card.module.css';

type CardProps = {
    index: number
    title: string
    imgScr: string
    tagline: string
    abv: string
    ibu: string
    foodpairing: Array<string>
  }
 const Card = ({ index, title, imgScr, tagline, abv, ibu, foodpairing }: CardProps) => {
    return (<>
        <div className={styles.box}>
            <Image 
                src={imgScr}
                alt={`Logo of beer brand ${index}`}
                width={500}
                height={500}
                className={styles.img}
            />
            <h3>{title}</h3>
            <p>{tagline}</p>
            <p>{abv}</p>
            <p>{ibu}</p>
            <h1>Food pairing:</h1>
            {foodpairing.map( (food, index) => (
                <p key={index} className={styles.food}>{food}</p>
            ))}
            {/* <a href="#" className="btn">read more</a> */}
        </div>
        </>);
}

export default Card;