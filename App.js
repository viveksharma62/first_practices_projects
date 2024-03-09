import { useState } from 'react';
function App()
{
  const [location,setLocation]=useState('');
  const [weather,setWeather]=useState({});
  const [photo,setPhoto]=useState([]);
  const handleSubmit=()=>
  {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${'900bfc805aaa1c81c28ad6fb9cb70a89'}&units=metric`).
    then(res=>
      {
        if(res.ok)
        {
          return res.json();
        }
        else if(res.status===404)
        {
          return alert('opps!data not found');
        }
        else
        {
          return console.log('Server Error');
        }
      }).
    then(data=>
      {
        //console.log(data);
        setWeather(data);
      }).
    catch(error=>console.log(error));
    fetch(`https://api.unsplash.com/search/photos?query=${location}&client_id=${'fWyTRZpj4RxPfqh6luyJgj6VzI-hgM39VkLsRydC3tY'}`).
    then(res=>
      {
        return res.json();
      }).
    then(data=>
      {
        console.log(data);
        setPhoto(data?.results[0]?.urls?.small);
      }).
    catch(error=>console.log(error));
  }

  return(
    <div className='container'>
      <div className='row my-4'>
        <div className='col-2 offset-4'>
          <input type='text' className='form-control border border-danger' onChange={(e)=>setLocation(e.target.value)}/>
        </div>
        <div className='col-1'>
          <input type='button' onClick={handleSubmit} className="btn btn-warning" value="Search Location"></input>
        </div>
      </div>
      <div className='row'>
        <div className='offset-5 col-1'>
          <p>{weather?.main?.temp}</p>
        </div>
      </div>
      <img src={photo} className='d-block w-25 m-auto'/>
    </div>
  )
}
export default App;