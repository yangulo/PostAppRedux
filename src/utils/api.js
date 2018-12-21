const api = 'http://localhost:3001'

let token = localStorage.token
if(!token){
    token='whatever-you-want'
}

const headers={
    'Accept': 'application/json',
    'Authorization': 'token'
}

// GET
export const getAllPosts = () =>
    fetch(`${api}/posts`, {headers})
        .then((response)=>response.json())
        .catch(function (error){
            console.log('Request failed',error)
        })

export const getAllCategories = () =>
    fetch(`${api}/categories`, {headers})
       .then((response)=>response.json())
        .catch(function (error){
            console.log('Request failed',error)
        })

export const getPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, {headers})
        .then((response)=>response.json())
        .catch(function (error){
            console.log('Request failed',error)
        })

export const getUniquePost = (postID) =>
    fetch(`${api}/posts/${postID}`, {headers})
        .then((response) => response.json())
        .catch(function (error) {
            console.log('Request failed',error)
        })

export const getPostComments = (postID) =>
    fetch(`${api}/posts/${postID}/comments`, {headers})
        .then((response) => response.json())
        .catch(function (error) {
            console.log('Request failed',error)
        })

// POST
export const createPost = (post) =>
    fetch(`${api}/posts`,{
        method:'POST',
        headers:{
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(response=>response.json())
    .catch(function (error) {
        console.log('Request failed',error)
    })

export const createComment = (comment) =>
    fetch(`${api}/comments`, {
        method:'POST',
        headers:{
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(response=>response.json())
    .catch(function (error) {
        console.log('Request failed',error)
    })
    
// DELETE
export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`,{
        method:'DELETE',
        headers:{
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(response=>response.json())
    .catch(function(error){
        console.log('Request failed',error)
    })

export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`,{
        method:'DELETE',
        headers:{
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(response=>response.json())
    .catch(function(error){
        console.log('Request failed',error)
    })

// UPDATE
export const updatePost = (id, title, body) =>
    fetch(`${api}/posts/${id}`,{
        method:'PUT',
        headers:{
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title:title, body:body})
    }).then(response => {response.json()})
        .catch(function(error){
        console.log('Request failed',error)
    })

 

