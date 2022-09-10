import {deleteCard, editCard} from "../../store/cardSlice";
import Edit from "../../assets/edit.svg";
import {deleteCardFromList} from "../../store/todoSlice";
import Delete from "../../assets/delete.svg";
import {useDispatch} from "react-redux";
import {useState} from "react";

const Card = ({inputValues, handleChange, task, sectionId, setInitialValue}) => {
    const [showEditArea, setShowEditArea] = useState(false)
    const [error, setError] = useState(false)

    const dispatch = useDispatch()
    return (<>
        {showEditArea ?
            <div className="kanban__section__content__card">
                <div><input className={`hipporello-input ${error && "error"}`} value={inputValues.editTitle}
                            onChange={(e) => handleChange(e, "editTitle")}/></div>
                <div>
                    <button className="hipporello-btn" onClick={() => {

                        if (inputValues.editTitle.length > 0) {
                            dispatch(editCard({
                                id: task.id,
                                title: inputValues.editTitle
                            }))
                            setShowEditArea(false)
                            setError(false)
                        }else{
                            setError(true)
                        }

                    }
                    }>Save
                    </button>
                    <button className="hipporello-btn" onClick={() => {

                        setShowEditArea(!showEditArea)
                    }
                    }>Close
                    </button>
                </div>
            </div>
            : <div className="kanban__section__content__card">
                <div> {task.title}</div>
                <div className="kanban__section__content__tool-area"> <span
                    className="kanban__section__content__card__edit"><img src={Edit}
                                                                          onClick={() => {
                                                                              setError(false)
                                                                              setInitialValue(task.title)
                                                                              setShowEditArea(!showEditArea)
                                                                          }
                                                                          }
                                                                          alt="Edit"/></span>
                    <span className="kanban__section__content__card__edit" onClick={() => {
                        dispatch(deleteCard({id: task.id}))
                        dispatch(deleteCardFromList({id: task.id, listId: sectionId}))
                    }}><img src={Delete}
                            alt="Delete"/></span>
                </div>
            </div>}
    </>)
}

export default Card
