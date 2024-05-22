import {API_URL} from './api';
import { useEffect, useState } from 'react';

export default function TodoAllist() {
    const [todos, setTodos] = useState([]);
    const [editingTitle,setEditingTitle] = useState('')
    const [editingDescription,setEditingDescription] = useState('')
    const [editingTodo,setEditingTodo] = useState(false);

    const AllTodoListHandler = async ()=>{
        try {
            const response = await fetch(`${API_URL}/todo/all-list`,
                {
                    method:"GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            const data = await response.json();
            console.log(data);
            setTodos(data);
            
            
        } catch (error) {
            console.error("Failed to get data from Database");
        }
    }
    const deleteElement = async (id)=>{
        try {
            const response = await fetch(`${API_URL}/todo/${id}`, {
              method: 'DELETE',
            });
            if (response.ok) {
             setTodos(todos.filter(product => product._id !== id));
             
            } else {
              console.error('Failed to delete todo');
              alert('Failed to delete todo');
            }
          } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product');
          }
    }
    const EditElement = async(id)=>{
        try {
            const res = await fetch(`${API_URL}/todo/update-todo/${id}`,{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title:editingTitle,
                    description:editingDescription
            })
        });
        if(res.ok){
             // Update the todo in the state with the edited values
             setTodos(todos.map(todo => {
                if (todo._id === editingTodo._id) {
                    return {
                        ...todos,
                        title: editingTitle,
                        description: editingDescription
                    };
                }
                return todo;
            }));
            // Reset editing state
            setEditingTodo(null);
            setEditingTitle('');
            setEditingDescription('');
        
        } 
    }catch (error) {
            console.error('Failed to edit todo:', error);
        }
    }
    useEffect(()=>{AllTodoListHandler()},[])
  return (
    <div className="todoListSection">
    {todos.map(todo => (
        <div className="todoListSectionItem" key={todo._id}>
            {editingTodo && editingTodo._id === todo._id ? (
                <div>
                    <input
                        type="text"
                        value={editingTitle || todo.title}
                        onChange={(e) => setEditingTitle(e.target.value)}
                    />
                    <input
                        type="text" 
                        value={editingDescription || todo.description}
                        onChange={(e) => setEditingDescription(e.target.value)}
                    />
                    <button onClick={()=>{EditElement(todo._id)}} className='todoButton btn btn-primary'>Save</button>
                    <button onClick={() => setEditingTodo(null)} className='todoButton btn btn-secondary'>Cancel</button>
                </div>
            ) : (
                <div>
                    <h3>{todo.title}</h3>
                    <h5>{todo.description}</h5>
                    
                        <button onClick={() => setEditingTodo(todo)} className='todoButton btn btn-primary'>Edit</button>
                        <button  onClick={() => {deleteElement(todo._id); console.log(todo._id)}} className='todoButton btn btn-danger'>Delete</button>
                    </div>
                
            )}
        </div>
    ))}
</div>
);
}