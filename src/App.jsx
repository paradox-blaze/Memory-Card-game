import { useState } from 'react'
import './App.css' 
import Cards from './Cards'
import Scorecard from './Scorecard'




const App = ()=>{
    const [score,setScore] = useState(0);
    const [highscore,setHighscore] = useState(0);
    return(
        <>
        <div className="mainHeading">
        <h1>Welcome to the memory game</h1>
        </div>
       <Scorecard/>
       <Cards/>

        </>
    )
}


export default App