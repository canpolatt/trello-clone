import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from 'uuid'

const initialState = {
    "list-0": {
        id: "list-0",
        cards: ["card-0"],
        title: "Example"
    }
}


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addList: (state, action) => {
            const id = `list-${uuidv4()}`
            const newList = {
                title: action.payload,
                id: id,
                cards: []
            }
            state = {...state, [`${id}`]: newList}
            return state;
        },
        addTask: (state, action) => {
            const list = state[action.payload.listId];
            list.cards.push(`${action.payload.id}`);
        },
        moveItem: (state, action) => {
            if (action.payload.source.droppableId === action.payload.destination.droppableId) {
                const list = state[action.payload.source.droppableId];
                const card = list.cards.splice(action.payload.source.index, 1);
                list.cards.splice(action.payload.destination.index, 0, ...card);
            }


            if (action.payload.source.droppableId !== action.payload.destination.droppableId) {
                const listStart = state[action.payload.source.droppableId];
                const card = listStart.cards.splice(action.payload.source.index, 1);
                const listEnd = state[action.payload.destination.droppableId];
                listEnd.cards.splice(action.payload.destination.index, 0, ...card);

            }

        },
        deleteCardFromList: (state, action) => {
            const list = state[action.payload.listId];
            const newCards = list.cards.filter(cardID => cardID !== action.payload.id);
            return {...state, [action.payload.listId]: {...list, cards: newCards}};
        },
        editListTitle: (state, action) => {
            const list = state[action.payload.id];
            list.title = action.payload.title;
        },
        deleteList: (state, action) => {
            delete state[action.payload.listId];
        }
    }
})
export const {addList, addTask, moveItem, deleteCardFromList, editListTitle, deleteList} = todoSlice.actions

export default todoSlice.reducer
