import {POST_COMMENT, REMOVE_POST, ADD_COMMENT, REMOVE_COMMENT} from '../actions'
import { combineReducers } from 'redux'

const initialState = []

const post = (state=initialState, action)=>{
    switch(action.type){
        case POST_COMMENT:
            let newStatePost=[...state]
            newStatePost.push(action.post)
            return newStatePost
        case REMOVE_POST:
            let newStateRemove=[...state]
            return newStateRemove.filter((post)=>
                post.id!==action.id)
        case UPDATE_COMMENT:
            let newStateUpdate=[...state]
            return 
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
