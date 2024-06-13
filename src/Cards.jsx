import { useEffect, useState } from "react"
import './App.css'

const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const Cards = () => {
    const defaultStyle = {
        "marginLeft": "1.2rem"
    }

    const [data, setData] = useState([])
    const [clicked, setClicked] = useState({});
    const [score, setScore] = useState(0);
    const [highscore, setHighscore] = useState(0);
    console.log(score);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
            const jsonData = await response.json();
            const pokemonList = await Promise.all(
                jsonData.results.map(async (pokemon) => {
                    const pokemonResponse = await fetch(pokemon.url)
                    const pokemonJson = await pokemonResponse.json();
                    return pokemonJson;
                })
            )
            setData(pokemonList);
            const initalClicked = {}
            for (const i of pokemonList) {
                initalClicked[i.name] = false;
            }
            setClicked(initalClicked)
        }
        fetchData();

    }, [])

    const handleClick = (pokemon) => () => {
        setClicked(prevState => {
            if (prevState[pokemon]) {
                setScore(0);
                console.log("game over");
                const initalClicked = {}
                for (const i in prevState) {
                    initalClicked[i] = false;
                }
                return initalClicked;
            }
            else {
                setScore(prevNumber => prevNumber + 1)
                if (score >= highscore) {
                    setHighscore(prevhighscore => prevhighscore + 1);
                }

                return { ...prevState, [pokemon]: true };
            }
        })
        setData(prevdata => shuffleArray(prevdata));
    }

    return (
        <>
            <div className="scores">
                <p>Current Score: {score}</p>
                <p>Highest Score: {highscore}</p>
            </div>
            <div className="pokemonCards" >

                {
                    data
                        .map((item, key) => (
                            <div className="card" key={key}>
                                <img src={item.sprites.front_default} alt={item.name} onClick={handleClick(item.name)} />
                                <div className="names">
                                    <p style={defaultStyle}>{item.name}</p>
                                </div>
                            </div>
                        ))
                }
            </div></>
    )
}

export default Cards