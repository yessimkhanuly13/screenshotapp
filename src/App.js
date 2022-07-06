import { useEffect, useState } from 'react';
import './App.css';
import { Alert } from '@mui/material';

const App = () => {
  const API_KEY ="23e152a3a8f644c59df5a242198146b8";
  const[search, setSearch] = useState("https://github.com/yessimkhanuly13");
  const[img, setImg] = useState("");
  const[eror, setEror] = useState(false);
  const[loading, setLoading] = useState(false);
  const URL = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${search}&width=1000&height=1000`
  
  const getScreenshots = async () => {
    setSearch("");
    setEror(false);
    setLoading(true);
    const response = await fetch(URL);
    if(response.ok){
      setImg(response);
      setLoading(false);
    }else{
      setEror(true);
    }
  }
  
  useEffect(()=>{
    setSearch("");
    getScreenshots();
  },[])

    const SearchScreenshots = e=>{
      e.preventDefault();
      getScreenshots();
    }

  return (
    <div className="App">
      <nav className='ko'>
          <form onSubmit={SearchScreenshots}>
          <input
          autoFocus
          type="text"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          />
          <button type='submit'>SUBMIT</button>
        </form>
      </nav>
    <div className='hero'>
      {!loading && !eror ? ( 
      <div className='klp'>
        {img && (
          <a href={img.url} target="_blank">
          <img src={img.url} alt="background"/>
          </a>
        )}
      </div>
      ) : !eror && loading ? (
        <div className='loading'></div>
      ) : eror ? (
        <div className='container'>
          <h2><Alert  severity="error">Please a valid url</Alert></h2>
        </div>
      ) : (
        ""
  )}
      </div>
    </div>
  );
}

export default App;
