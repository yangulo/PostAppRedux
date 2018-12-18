// api
import * as api from '../utils/api'
// Posts
export const ALL_POSTS='ALL_POSTS'
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

export const createPost = (post) => (dispatch) => 
    api.createPost(post).then(post => dispatch(
        {
            type: POST_COMMENT,
            post
        }
    )
)

export const removePost = (id) => (dispatch) =>
    api.deletePost(id).then((id) => dispatch(
        {
            type: REMOVE_POST,
            id
        }
    )
)

export const updatePost = (post) => (dispatch) =>
    api.updatePost(post.id, post.title, post.body).then((post) => dispatch(
        {
            type: UPDATE_POST,
            post
        }
    )
)

export const addComment = ({parentID, comment}) => ({
    type: ADD_COMMENT,
    parentID,
    comment
})

export const removeComment = ({commentID}) => ({
    type: REMOVE_COMMENT,
    commentID
})