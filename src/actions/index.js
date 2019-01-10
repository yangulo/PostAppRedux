// api
import * as api from '../utils/api'
// Posts
export const ALL_POSTS='ALL_POSTS'
export const UNIQUE_POST='UNIQUE_POST'
export const POST_COMMENT='POST_COMMENT'
export const REMOVE_POST='REMOVE_POST'
export const UPDATE_POST='UPDATE_POST'
export const UPVOTEPOST='UPVOTEPOST' 
export const DOWNVOTEPOST='DOWNVOTEPOST'
export const ORDER_BY_MAX_SCORE='ORDER_BY_MAX_SCORE'
export const ORDER_BY_TIME='ORDER_BY_TIME'
// Comments
export const ALL_COMMENTS='ALL_COMMENTS'
export const ADD_COMMENT='ADD_COMMENT'
export const REMOVE_COMMENT='REMOVE_COMMENT'
export const UPDATE_COMMENT='UPDATE_COMMENT'
export const UPVOTECOMMENT='UPVOTECOMMENT'
export const DOWNVOTECOMMENT='DOWNVOTECOMMENT'

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

export const orderByMaxScore = () => (dispatch) =>
    dispatch({
        type: ORDER_BY_MAX_SCORE
    })

export const orderByMostCurrent = () => (dispatch) =>
    dispatch({
        type: ORDER_BY_TIME
    })

export const getAllComments = (postId) => (dispatch) =>
    api.getPostComments(postId).then((comments) => dispatch({
        type: ALL_COMMENTS,
        comments
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

export const updateComment = (id, timestamp, body) => (dispatch) =>
    api.modifyComment(id, timestamp, body).then((comment) => dispatch({
        type: UPDATE_COMMENT,
        comment
    }))

export const upVotePost = (id) => (dispatch) =>
    api.upVotePost(id).then((post) => dispatch({
        type: UPVOTEPOST,
        post
    }))

export const downVotePost = (id) => (dispatch) =>
    api.downVotePost(id).then((post) => dispatch({
        type: DOWNVOTEPOST,
        post
    }))

export const upVoteComment = (id) => (dispatch) =>
    api.upVoteComment(id).then((comment)=>dispatch({
        type: UPVOTECOMMENT,
        comment
    }))

export const downVoteComment = (id) => (dispatch) =>
    api.downVoteComment(id).then((comment)=>dispatch({
        type: DOWNVOTECOMMENT,
        comment
    }))
