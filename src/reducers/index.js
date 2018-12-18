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
            let newStatePost= action.post
            return newStatePost
        case REMOVE_POST:
            let newStateRemove=[...state]
            return newStateRemove.filter((post)=>
                post.id!==action.id)
        case UPDATE_POST:
            let newStateUpdate=[...state]
            // newStateUpdate.filter((post)=>
            //     post.id===action.post.id
            // )
            console.log('reducer',newStateUpdate)
            // let tmp = newStateUpdate.filter(post=>
            //     post.id===action.post.id)
            // console.log(newStateUpdate)    
            // console.log(tmp)    
            // tmp.title=action.post.title
            // tmp.body=action.post.body
            // console.log(newStateUpdate)
            
            return newStateUpdate
        default:
            return state
    }
}
const comment = (state=initialState, action) =>{
    switch(action.type){
        case ADD_COMMENT:
            return state
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
