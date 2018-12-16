// api
import * as api from '../utils/api'

export const POST_COMMENT='POST_COMMENT'
export const REMOVE_POST='REMOVE_POST'
export const ADD_COMMENT='ADD_COMMENT'
export const REMOVE_COMMENT='REMOVE_COMMENT'
//export const GET_CATEGORIES


export const createPost = (post) => (dispatch) => 
    api.createPost(post).then(post => dispatch(
        {
            type: POST_COMMENT,
            post
        }
    )
)

export const removePost = (id) => ({
    type: REMOVE_POST,
    id
})

export const addComment = ({parentID, comment}) => ({
    type: ADD_COMMENT,
    parentID,
    comment
})

export const removeComment = ({commentID}) => ({
    type: REMOVE_COMMENT,
    commentID
})