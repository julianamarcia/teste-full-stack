import styles from './page.module.css'
import Card from "../components/Card"
import Navbar from '../components/UI/Navbar'

const Home = async () => {
  const response = await fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=6`,
                                {next: { revalidate: 70 } });
  const beers = await response.json();

  return (<>
  <Navbar/>
    <div className={styles.container}>
        <h1 className={styles.heading}>Our beers</h1>
        <div className={styles['box-container']}>
            {beers.map( (beer: any, index: number) => {
                  return <Card 
                  key={index}
                  index={index}
                  title={beer.name}
                  imgScr={beer.image_url}
                  tagline={beer.tagline}
                  abv={`${beer.abv}% Alcohol`}
                  ibu={`${beer.ibu} IBU`}
                  foodpairing={beer.food_pairing}
                  />})
            }
        </div>
    </div>
</>);
}

export default Home;