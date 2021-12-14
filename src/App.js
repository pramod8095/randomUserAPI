import axios from 'axios';
import './App.css';
import React, {useEffect, useState} from 'react'




async function getResponce(){

  return axios.get('https://randomuser.me/api')
  .then(({data}) =>{
    // handle success
    console.log(data);
    return data
  })
  .catch((error) =>{
    // handle error
    console.log(error);
  })
}

function getFullUserName(userInfo){
  const { name:{title, first, last}} = userInfo;
  return `${title}. ${first} ${last}`  
}
function getFullLocation(userInfo){
  const {location:{city, state, country}} = userInfo;
  return <div>{`City: ${city}`} <br/>{`State: ${state}`} <br/>{`Country: ${country}`}</div>
}


function App() {

  // url: https://randomuser.me/api

  const [randomUserJSON, setRandomUserJSON ] = useState('')
  const [userData, setUserData] = useState([])
  
  useEffect(()=>{
    getResponce().then((randomData)=>{
      setRandomUserJSON(JSON.stringify(randomData,null, 2));
      setUserData(randomData.results)
    })

  },[])
  return (
    <div className="App">
     <div className='randomUsers'> {
          userData.map((randomUsers, index)=>{
           return <div key={index}>
            <img src={randomUsers.picture.large} />
            <p>{getFullUserName(randomUsers)}</p>
            <p>{getFullLocation(randomUsers)}</p>
            </div>
          })
        }

    </div>
      
      <p>you can also use the API for your ref </p> <a href='https://randomuser.me/api'> click here( to get link)</a>
      <h1>Below is the JSON data for ref</h1>
      <pre>
        {randomUserJSON}
      </pre>
      
    </div>
  );
}

export default App;

