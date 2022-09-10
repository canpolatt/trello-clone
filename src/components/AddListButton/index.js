import "./AddListButton.scss"

const AddListButton=({setShowButton,text="Add a list"})=>{
    return( <button className="hipporello-btn add-list-button-wrapper" onClick={setShowButton}>{text} <span>&#43;</span></button>)
}

export default AddListButton
