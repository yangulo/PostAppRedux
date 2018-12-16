import {POST_COMMENT, REMOVE_POST, ADD_COMMENT, REMOVE_COMMENT} from '../actions'
import { combineReducers } from 'redux'

const initialState = []

const post = (state=initialState, action)=>{
    switch(action.type){
        case POST_COMMENT:
            let newState=[...state]
            newState.push(action.post)
            return newState
        case REMOVE_POST:
            let newStatee=[...state]
            return newStatee.filter((post)=>
                post.id!==action.id)
        default:
            return state
    }
}
const comment = (state=initialState, action) =>{
    switch(action.type){
        case ADD_COMMENT:
            let newStateee=[...state]
            return newStateee.filter((post)=>
                post.parentId===action.id).push(action.comment)
        case REMOVE_COMMENT:
            return state
        default:
            return state
    }
}

export default combineReducers({
    post,
    comment
})
