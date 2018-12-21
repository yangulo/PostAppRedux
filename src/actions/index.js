// api
import * as api from '../utils/api'
// Posts
export const ALL_POSTS='ALL_POSTS'
export const UNIQUE_POST='UNIQUE_POST'
export const POST_COMMENT='POST_COMMENT'
export const REMOVE_POST='REMOVE_POST'
export const UPDATE_POST='UPDATE_POST'
// Comments
export const ADD_COMMENT='ADD_COMMENT'
export const REMOVE_COMMENT='REMOVE_COMMENT'

export const getAllPosts =() => (dispatch) =>
    api.getAllPosts().then(posts => dispatch({
        type: ALL_POSTS,
        posts
    }))

export const getUniquePost =(id) => (dispatch) =>
    api.getUniquePost(id).then(post => dispatch({
        type: UNIQUE_POST,
        post
    }))

export const createPost = (post) => (dispatch) => 
    api.createPost(post).then(post => dispatch({
        type: POST_COMMENT,
        post
    }))

export const removePost = (id) => (dispatch) =>
    api.deletePost(id).then(() => dispatch({
        type: REMOVE_POST,
        id
    }))

export const updatePost = (id, title, body) => (dispatch) =>
    api.updatePost(id, title, body).then((post) => dispatch({
        type: UPDATE_POST,
        post
    }))

export const addComment = (comment) => (dispatch) =>
    api.createComment(comment).then(comment => dispatch({
        type: ADD_COMMENT,
        comment
    }))

export const removeComment = (id) => (dispatch) =>
    api.deleteComment(id).then(() => dispatch({
        type: REMOVE_COMMENT,
        id
    }))