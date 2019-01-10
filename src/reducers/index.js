import {
    POST_COMMENT, 
    REMOVE_POST, 
    UPDATE_POST, 
    ADD_COMMENT, 
    REMOVE_COMMENT, 
    ALL_POSTS,
    UNIQUE_POST,
    UPDATE_COMMENT,
    UPVOTEPOST,
    DOWNVOTEPOST,
    UPVOTECOMMENT,
    DOWNVOTECOMMENT,
    ALL_COMMENTS,
    ORDER_BY_MAX_SCORE,
    ORDER_BY_TIME
} from '../actions'
import { combineReducers } from 'redux'
import _ from 'lodash'

const initialState = {
    postList:{posts:[]},
    singlePost:{post:{}},
    newPost:{post:{}},
    commentsList:{comments:[]}
}

const post = (state=initialState, action)=>{
    switch(action.type){
        case ALL_POSTS:
            let allPosts={
                postList:{
                    ...state.postList,
                    posts:action.posts
                }
            }
            return allPosts
        case UNIQUE_POST:
            let uniquePost={
                singlePost:{
                    ...state.singlePost,
                    post:action.post
                }
            }
            return uniquePost
        case POST_COMMENT:
            let newPost={
                newPost:{
                    ...state.newPost,
                    post:action.post
                }
            }
            return newPost
        case UPDATE_POST:
            let postUpdated={
                singlePost:{
                    ...state.singlePost,
                    post:action.post
                }
            }
            return postUpdated
        case REMOVE_POST:
            let postRemoved={
                singlePost:{
                    ...state.singlePost,
                    // TODO Fix
                    post: null
                    // post: [...state.singlePost.post.filter(post => post.id!==action.id)]
                }
            }
            return postRemoved
        case UPVOTEPOST:
            let upVotePost={
                singlePost:{
                    ...state.singlePost,
                    post:action.post
                }
            }
            return upVotePost
        case DOWNVOTEPOST:
            let downVotePost={
                singlePost:{
                    ...state.singlePost,
                    post:action.post
                }
            }
            return downVotePost
        case ORDER_BY_MAX_SCORE:
                let newOrder = [...state.postList.posts]
                newOrder.sort(function(a,b) { 
                    return b.voteScore - a.voteScore
                })
                let orderPosts={
                    postList:{
                        posts: newOrder
                    }
                }
                console.log(newOrder)
                return orderPosts
        case ORDER_BY_TIME:
                let newOrderTime = [...state.postList.posts]
                newOrderTime.sort(function(a,b) { 
                return b.timestamp - a.timestamp
                })
                let orderTimePosts={
                    postList:{
                        posts: newOrderTime
                    }
                }
                console.log(newOrderTime)
                return orderTimePosts
        default:
            return state
    }
}

const comment = (state=initialState, action) =>{
    switch(action.type){
        case ALL_COMMENTS:
            let commentsList={
                commentsList:{
                    ...state.commentsList,
                    comments:action.comments
                }
            }
            return commentsList
        case ADD_COMMENT:
            let newComment={
                commentsList:{
                    ...state.commentsList,
                    comments: [...state.commentsList.comments, action.comment]
                }
            }
            return newComment
        case REMOVE_COMMENT:
            let newCommentRemove={
                commentsList:{
                    ...state.commentsList,
                    comments:[...state.commentsList.comments.filter(comment => comment.id!==action.id)]
                }
            }
            return newCommentRemove
        case UPDATE_COMMENT:
            let commentUpdated={
                commentsList:{
                    ...state.commentsList,
                    comments:[...state.commentsList.comments.filter(comment => comment.id!==action.comment.id), action.comment]
                }
            }
            return commentUpdated
        // TODO Keep comment order
        case UPVOTECOMMENT:
            let upVoteComment={
                commentsList:{
                    ...state.commentsList,
                    comments:[...state.commentsList.comments.filter(comment => comment.id!==action.comment.id), action.comment]
                }
            }
            return upVoteComment
        // TODO Keep comment order
        case DOWNVOTECOMMENT:
            let downVoteComment={
                commentsList:{
                    ...state.commentsList,
                    comments:[...state.commentsList.comments.filter(comment => comment.id!==action.comment.id), action.comment]
                }
            }
            return downVoteComment
        default:
            return state
    }
}

export default combineReducers({
    post,
    comment
})
