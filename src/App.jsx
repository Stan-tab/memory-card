import { useState, useEffect } from 'react'
import './styles/App.css'
import cards from "./script/poke.js"
const pokemons = new cards();

function reArrange(arr, n) {
    const newArr = [];
    for (let i = 1; i <= arr.length; i++) {
        if(i % 2 === 0) {
            newArr.push(arr[(n + i/2)%arr.length])
            continue;
        }
        let num = n - i/2 + 0.5;
        if (num<0) num = arr.length + num;
        newArr.push(arr[num]);
    }
    return newArr;
}

function RandomPlacer({poke, inpHandler}) {
  if(!poke) return (<p>Please wait...</p>);
  const reArranged = reArrange(poke, Math.round((Math.random() * 547) % 9));
  return reArranged.map(e => {
          return (<div className='card' key={e.name}>
            <img src={e.img} alt={e.name} onClick={inpHandler} />
            <p>{e.name}</p>
          </div>)
        })
}

function App() {
  const [poke, setPoke] = useState(null);
  const [choosen, setChoose] = useState([]);
  const [isWin, setWin] = useState(false);
  const [isLost, setLost] = useState(false);

  function Dialog({str}) {
    return (
      <div className='end'>
      <p>{str}</p>
      <button onClick={() => {
          pokemons.offsetChange();
          setWin(false); 
          setLost(false);
          setChoose([]);
          setPoke(null);
        }}>Restart</button>
      </div>
    )
  }

  useEffect(() => {
    (async function fetcher() {
      await pokemons.getData();
      setPoke(pokemons.data);
    })()
  }, [pokemons.url])

  function chooseHandle(e) {
    setTimeout(() => {
      e.target.parentNode.classList = "card"
      if(choosen.includes(e.target.alt)) setLost(true);
      if (choosen.length === 9) setWin(true);
      choosen.push(e.target.alt);
      setChoose([...choosen]);
    },500)

    const cards = [...document.querySelectorAll(".cards > *")];
    cards.forEach(el => {
      if(el.classList != e.target.parentNode.classList){
        el.classList = "card hide";
        setTimeout(() => {
          el.classList = "card";
        },500)
      }
    })
    e.target.parentNode.classList = "card choosen"
  }

  if (isLost) {
    return <Dialog str={"Game over!"} />
  } else if(isWin) {
    return <Dialog str={"You win!"} />
  }

  return (
    <>
      <div className='score'>score: {choosen.length}</div>
      <div className='cards'>
        <RandomPlacer poke={poke} inpHandler={chooseHandle} />
      </div>
    </>
  )
}

export default App
