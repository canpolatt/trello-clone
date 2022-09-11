import AddListButton from "../AddListButton";
import AddListInputButton from "../AddListInputButton";
import "./TodoBoard.scss"
import {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {addList, moveItem} from "../../store/todoSlice";
import Task from "../Task";
import Title from "../Title";


const TodoBoard = () => {
    const [showAddListButton, setShowAddListButton] = useState(true)
    const [inputValues, setInputValues] = useState({listTitle: ""})
    const todoList = useSelector((state) => state.todo)
    const taskList = useSelector((state) => state.card)
    const dispatch = useDispatch()

    const handleShowAddListButton = () => {
        const obj = {...inputValues}
        obj["listTitle"] = ""
        setInputValues(obj)
        setShowAddListButton(!showAddListButton)
    }


    const onDragEnd = result => {
        if (!result.destination) return
        const {source, destination} = result
        dispatch(moveItem({
            destination: destination,
            cardId: result.draggableId,
            source: source
        }))
    }

    const handleChange = (e, name) => {
        const obj = {...inputValues}
        obj[name] = e.target.value
        setInputValues(obj)
    }

    const setInitialValue = (value) => {
        const obj = {...inputValues}
        obj["listTitle"] = value
        setInputValues(obj)
    }

    return (<div className="kanban-wrapper">
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban">
                {
                    Object.keys(todoList).map(section => (
                        <Droppable
                            key={todoList[section].id}
                            droppableId={todoList[section].id}
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    className='kanban__section'
                                    ref={provided.innerRef}
                                >
                                    <Title inputValues={inputValues} handleChange={handleChange}
                                           id={todoList[section].id} title={todoList[section].title}
                                           setInitialValue={setInitialValue}/>
                                    <Task data={todoList[section].cards.map(cardID => taskList[cardID])}
                                          sectionId={todoList[section].id}
                                          providedPlaceholder={provided.placeholder}/>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </div>
        </DragDropContext>
        {showAddListButton ? <AddListButton setShowButton={handleShowAddListButton}/> :
            <AddListInputButton addList={addList} inputValue={inputValues.listTitle}
                                handleChange={(e) => handleChange(e, "listTitle")}
                                setShowButton={handleShowAddListButton}/>}

    </div>)
}

export default TodoBoard
