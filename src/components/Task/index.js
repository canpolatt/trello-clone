import {Draggable} from "react-beautiful-dnd";
import AddListButton from "../AddListButton";
import AddListInputButton from "../AddListInputButton";
import {useState} from "react";
import {addCard} from "../../store/cardSlice";
import {addTask} from "../../store/todoSlice";
import Card from "../Card";

const Task = ({data, sectionId, providedPlaceholder}) => {
    const [inputValues, setInputValues] = useState({taskTitle: "", editTitle: ""})
    const [showAddTaskButton, setShowAddTaskButton] = useState(true)


    const handleChange = (e, name) => {
        const obj = {...inputValues}
        obj[name] = e.target.value
        setInputValues(obj)
    }

    const handleShowAddTaskButton = () => {
        const obj = {...inputValues}
        obj["taskTitle"] = ""
        setInputValues(obj)
        setShowAddTaskButton(!showAddTaskButton)
    }

    const setInitialValue = (value) => {
        const obj = {...inputValues}
        obj["editTitle"] = value
        setInputValues(obj)
    }


    return (<div className="kanban__section__content">
        {
            data.map((task, index) => (
                <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                >
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                                ...provided.draggableProps.style,
                                opacity: snapshot.isDragging ? '0.5' : '1'
                            }}
                        >
                            <Card task={task} handleChange={handleChange} setInitialValue={setInitialValue}
                                  inputValues={inputValues} sectionId={sectionId}/>
                        </div>
                    )}
                </Draggable>
            ))
        }
        {providedPlaceholder}
        <div className="kanban__section__footer">
            {showAddTaskButton ?
                <AddListButton setShowButton={handleShowAddTaskButton}
                               text="Add another task"/> :
                <AddListInputButton addList={addCard}
                                    addCard={addTask}
                                    placeholder={"Enter Task Title"}
                                    inputValue={inputValues.taskTitle}
                                    text="Save" listId={sectionId}
                                    handleChange={(e) => handleChange(e, "taskTitle")}
                                    setShowButton={handleShowAddTaskButton}/>}
        </div>

    </div>)
}

export default Task
