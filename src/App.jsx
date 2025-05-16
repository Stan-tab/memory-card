import { useState, useEffect } from 'react'
import './styles/App.css'
import cards from "./script/poke.js"
// const pokemons = new cards();

const oke = [
    {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    },
    {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon/2/",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
    },
    {
        "name": "venusaur",
        "url": "https://pokeapi.co/api/v2/pokemon/3/",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
    },
    {
        "name": "charmander",
        "url": "https://pokeapi.co/api/v2/pokemon/4/",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
    },
    {
        "name": "charmeleon",
        "url": "https://pokeapi.co/api/v2/pokemon/5/",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
    },
    {
        "name": "charizard",
        "url": "https://pokeapi.co/api/v2/pokemon/6/",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
    },
    {
        "name": "squirtle",
        "url": "https://pokeapi.co/api/v2/pokemon/7/",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
    },
    {
        "name": "wartortle",
        "url": "https://pokeapi.co/api/v2/pokemon/8/",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png"
    },
    {
        "name": "blastoise",
        "url": "https://pokeapi.co/api/v2/pokemon/9/",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png"
    },
    {
        "name": "caterpie",
        "url": "https://pokeapi.co/api/v2/pokemon/10/",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png"
    }
]

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
  if(!poke) return (<p>Please wait...</p>)
  const reArranged = reArrange(poke, Math.round((Math.random() * 1000) % 10));
  return reArranged.map(e => {
          return (<div className='card' key={e.name}>
            <img src={e.img} alt={e.name} onClick={inpHandler} />
            <p>{e.name}</p>
          </div>)
        })
}

function App() {
  // const [poke, setPoke] = useState(oke);
  const [choosen, setChoose] = useState([]);

  // useEffect(() => {
  //   (async function fetcher() {
  //     await pokemons.getData();
  //     statePoke(pokemons.data);
  //   })()
  // }, [pokemons.url])

  function chooseHandle(e) {
    console.log(choosen)
    choosen.push(e.target.alt);
    setChoose([...choosen]);
  }

  return (
    <>
      <div className='score'></div>
      <div className='cards'>
        <RandomPlacer poke={oke} inpHandler={chooseHandle} />
      </div>
    </>
  )
}

export default App
