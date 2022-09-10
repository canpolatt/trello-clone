import "./AddListInputButton.scss"
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from 'uuid'

const AddListInputButton = ({handleChange, inputValue, listId, addList,addCard, setShowButton, text = "Add a list",placeholder="Enter List Title"}) => {
    const dispatch = useDispatch()

    return (<div className="add-list-input-button-wrapper">
        <input className="hipporello-input" placeholder={placeholder} onChange={handleChange} value={inputValue}
               type="text"/>
        <div className="add-list-input-button-footer">
            <button className="hipporello-btn add-list-input-button-footer-add-btn" onClick={() => {
                const id=`card-${uuidv4()}`
                if (!listId) {
                    dispatch(addList(inputValue))
                    setShowButton()
                } else {
                    dispatch(addList({title: inputValue, listId: listId,id:id}))
                    dispatch(addCard({title: inputValue, listId: listId,id:id}))
                    setShowButton()
                }
            }}>{text}
            </button>
            <button className="hipporello-btn add-list-input-button-footer-close-btn" onClick={setShowButton}>Close
            </button>
        </div>
    </div>)
}

export default AddListInputButton
