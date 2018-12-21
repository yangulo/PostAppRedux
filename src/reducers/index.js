import {
    POST_COMMENT, 
    REMOVE_POST, 
    UPDATE_POST, 
    ADD_COMMENT, 
    REMOVE_COMMENT, 
    ALL_POSTS,
    UNIQUE_POST
} from '../actions'
import { combineReducers } from 'redux'

const initialState = []

const post = (state=initialState, action)=>{
    switch(action.type){
        case ALL_POSTS:
            let newAllPosts=[...action.posts]
            return newAllPosts
        case UNIQUE_POST:
            let newUniquePost= action.post
            return newUniquePost
        case POST_COMMENT:
            let newPost= action.post
            return newPost
        case UPDATE_POST:
            let postUpdated = action.post
            return postUpdated
        case REMOVE_POST:
            let newStateRemove=[...state]
            return newStateRemove.filter((post)=>post.id!==action.id)
        default:
            return state
    }
}
const comment = (state=initialState, action) =>{
    switch(action.type){
        case ADD_COMMENT:
            let newComment = action.comment
            return newComment
        case REMOVE_COMMENT:
            let newCommentRemove=[...state]
            return newCommentRemove.filter((comment)=>comment.id!==action.id)
        default:
            return state
    }
}

export default combineReducers({
    post,
    comment
})
