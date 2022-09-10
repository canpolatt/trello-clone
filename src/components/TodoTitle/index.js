import {deleteList, editListTitle} from "../../store/todoSlice";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Delete from "../../assets/delete.svg";


const TodoTitle = ({handleChange, inputValues, id, title, setInitialValue}) => {
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const [showEditListTitle, setShowEditListTitle] = useState(false)

    return (

        <div className="kanban__section__title">
            {showEditListTitle ?
                <div className="kanban__section__content__card">
                    <div><input className={`hipporello-input ${error && "error"}`} value={inputValues.listTitle}
                                onChange={(e) => handleChange(e, "listTitle")}/></div>
                    <div>
                        <button className="hipporello-btn" onClick={() => {

                            if (inputValues.listTitle.length > 0) {
                                dispatch(editListTitle({
                                    id: id,
                                    title: inputValues.listTitle
                                }))
                                setShowEditListTitle(false)
                                setError(false)
                            } else {
                                setError(true)
                            }

                        }
                        }>Save
                        </button>
                        <button className="hipporello-btn" onClick={() => {
                            setError(false)
                            setShowEditListTitle(!showEditListTitle)
                        }
                        }>Close
                        </button>
                    </div>
                </div> : <div  onClick={() => {
                    setInitialValue(title)
                    setShowEditListTitle(!showEditListTitle)
                }}>{title}</div>}
            <img onClick={() => dispatch(deleteList({listId: id}))}
                 src={Delete} alt="Delete"/>
        </div>
    )
}

export default TodoTitle
