import React, { useState, useEffect } from 'react';
import './style.css'

//get the local storage data
const getLocalStorageData = () => {
  const lists = localStorage.getItem('mytodolist');
  if (lists) {
    return JSON.parse(lists); // convert string to array
  } else {
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState('');
  // const [items, setItems] = useState([]); 
  const [items, setItems] = useState(getLocalStorageData());
  const [isEditItem, setIsEditItem] = useState('')
  const [toggleButton, setToggleButton] = useState(false)

  //add the item function
  const addItem = () => {
    if (!inputData) {
      alert('Pls fill the data')
    }
    else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData }
          }
          return curElem
        })
      )
      setInputData('')
      setIsEditItem(null)
      setToggleButton(false)
    }
    else {
      const myNewinputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }
      setItems([...items, myNewinputData])
      setInputData('')
    }
  }

  //how to delete items section
  const deleteItem = (curItemId) => {
    const updatedItems = items.filter((curElem,) => {
      return curElem.id !== curItemId;
    })
    setItems(updatedItems)
  }

  //how to edit the item
  const editItem = (curItemId) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === curItemId;
    });
    setInputData(item_todo_edited.name)
    setIsEditItem(curItemId)
    setToggleButton(true)
  }

  //Adding localStorage
  useEffect(() => {
    localStorage.setItem('mytodolist', JSON.stringify(items))
  }, [items])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input type="text" placeholder='✍ Add Item' className='from-content' value={inputData} onChange={(e) => setInputData(e.target.value)} />
            {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>}
          </div>
          {/* show our items*/}
          <div className="showItems">
            {
              items.map((curElem) => {
                return (
                  <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="todo-btn">
                      <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                      <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                    </div>
                  </div>

                );
              })
            }
          </div>
          {/* remove all button */}
          <div className="showItems">
            <button className='btn effect04' data-sm-link-text='Remove All' onClick={() => { setItems([]) }}><span>CHECK LIST</span></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
