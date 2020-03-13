import React, {useEffect,useState} from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {
  const[data,setData]=useState([]);
  const[values,setValues]=useState({name:"",description:""});

  useEffect(()=>{
    axios.get("http://localhost:5000/api/projects")
    .then(response =>{
      setData(response.data)
    })
    .catch(error=>{
      console.log(error);
    });
  },[])

  const newPost =(event)=>{
    event.preventDefault();
  }

  axios.post("http://localhost:5000/api/projects,formValues")
  .then(response =>{
    setData(...data,response.data.projectInfo)
    alert("Bravo, scroll down to the projects")
  })
  .catch(error =>{
    console.log(error);
  })

  const deletePost =(event)=>{
    event.preventDefault();
    const id =event.target.value
  }

  axios.delete("http://localhost:5000/api/projects${id}")
  .then(response=>{
    console.log(response.data);
  })
  .catch(error=>{
    console.log(error);
  })

  const handleChange =event =>{
    setFormValues({...formValues,[event.target.name]: event.target.values})
  }
  return (
    <div className="App">
      <h2>Keep and remove projects</h2>
      <form onSubmit={newPost}>
        <label>
          <input
          type="text"
          name="name"
          onChange={handleChange}
          values={formValues}
          placeholder={"The Project name"}
          />
        </label>
      </form>
    </div>

   
  );
}

export default App;
