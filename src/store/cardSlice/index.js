import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    "card-0": {
        id: "card-0",
        title: "Example card",
        list: "list-0"
    }
}

// Card işlemleriyle ilgili fonksiyonlar burada bulunmaktadır
export const cardSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addCard: (state, action) => {
            const newTask = {
                id: action.payload.id,
                title: action.payload.title,
                listId: action.payload.listId
            }
            state = {...state, [`${action.payload.id}`]: newTask}
            return state;
        },
        deleteCard: (state, action) => {
            delete state[action.payload.id]
        },
        editCard: (state, action) => {
            state[action.payload.id].title = action.payload.title;
        }
    }
})
export const {addCard, deleteCard, editCard} = cardSlice.actions

export default cardSlice.reducer
