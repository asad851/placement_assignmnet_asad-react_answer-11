import React, { useEffect, useReducer, useRef } from "react";
import { useState } from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const ACTIONS = {
  ADD_TODO: "add-todo",
  DELETE_TODO: "delete-todo",
  EDIT_TODO: "edit-todo",
  UPDATE_TODO: "update-todo"
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.inputText)];
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo)=>todo.id!=action.payload.id);
    case ACTIONS.EDIT_TODO:
     return todos.map((todo)=>{
        if(todo.id==action.payload.id){
            return{...todo,editMode:!todo.editMode}
        }
        return todo
     })
     case ACTIONS.UPDATE_TODO:
        return todos.map((todo)=>{
            if(todo.id==action.payload.id){
                return{...todo,inputText:action.payload.updatedText,editMode:false}
            }
            return todo
        })
      
            
      default:
        return todos;
  }
}
function newTodo(inputText) {
  return { id: Date.now(), inputText: inputText, completed: false ,editMode:false };
}
export default function Todo() {
  const [inputText, setInputText] = useState("");
  const [completed, setCompleted] = useState(false);
  const [updatedText, setUpdatedText] = useState("");
  const inputBar = useRef()
  const [todos, dispatch] = useReducer(reducer, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { inputText: inputText } });
    setInputText("");
  };
  const handleDelete=(id)=>{
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id} });
  }
  const handleComplete=()=>{
    setCompleted(completed===false?true:false)
    todos.completed=completed?false:true
  }
  const editbtn =(id)=>{
      
      
      dispatch({ type: ACTIONS.EDIT_TODO, payload: {id } });
    // console.log(boo)
  }
 const handleUpdate=(e,id)=>{
    e.preventDefault()
    dispatch({ type: ACTIONS.UPDATE_TODO, payload: {updatedText,id } });
    setUpdatedText("")
 }
  
  
  return (
    <div className="container">
      <div className="todoContainer">
        <div className="inputbox">
          <form className="form" action="" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputText}
              id=""
              onChange={(e) => {
                setInputText(e.target.value);
              }}
            />
            <input type="submit" value="Add" />
          </form>
        </div>
       
            
        {todos?.map((todo) => {
          
          return (
          <div key={todo.id} className="todosSection">
         <div className="textpart">
         <IoCheckmarkDoneCircleOutline onClick={handleComplete} className="completed" style={{color:completed?"rgb(91, 219, 91)":"black"}}/>
         {todo.editMode===false? <p>{todo.inputText} <span>{completed?"completed":"incomplete"}</span> </p>
         :<form onSubmit={(e)=>{handleUpdate(e,todo.id)}}><input ref={inputBar} onChange={(e)=>{setUpdatedText(e.target.value)}}  className="editTodo" type="text" /></form>}
         </div>
         <div className="buttons">
         <button onClick={()=>editbtn(todo.id)} >edit</button>
         <button onClick={()=>handleDelete(todo.id)}>delete</button>
         </div>
       </div>)
        })}
        
      </div>
    </div>
  );
}
