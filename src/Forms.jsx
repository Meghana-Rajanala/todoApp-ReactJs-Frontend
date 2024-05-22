import { useState } from "react";
import {API_URL} from './api';


export default function Forms() {
    const [title,setTitle] = useState("");
    const [description,setDescription]=useState("");
    const [showTitle,setShowTitle] = useState(false);

 
    const todoFormHandler = async (e)=>{
        e.preventDefault();
        const todo = {title,description};
        const response = await fetch(`${API_URL}/todo/add-todo`,{
            method: "POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(todo)
        });
        //const data = await response.json();
        if(response.ok){
            alert(`${title} is successfully added.`)
            setTitle("");
            setDescription("");
            setShowTitle(false);
            window.location.reload();
        }else{
            alert("Something went wrong")

        }
    }
  
  return (
            <form className="Notes_des"  onSubmit={todoFormHandler} >
                
                 {showTitle &&  
                   <input type="text"  placeholder="Title" value={title} onChange={(e)=>{
                       setTitle(e.target.value)
                   }}/>
                   }
                <textarea placeholder="Take a note..." value={description} aria-rowcount={20} aria-colcount={20} onChange={(e) => {
                                setDescription(e.target.value);
                                if (e.target.value.trim()) {
                                    setShowTitle(true);
                                } else {
                                    setShowTitle(false);
                                }
                            }}
                           
                            />
                {showTitle &&  <button type="submit" className="btn-notes">Add</button>}
                  
            </form>
        
  )
}
