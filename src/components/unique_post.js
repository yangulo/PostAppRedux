import React, {Component} from 'react'
import EmptyCard from './empty_card'
// css
import '../utils/style/styles.css'
// Api
import * as api from '../utils/api'
// Cards
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
// Redux
import {connect} from 'react-redux'
import {
    removePost,
    getUniquePost,
    updatePost,
    addComment,
    removeComment,
    updateComment,
    upVotePost,
    downVotePost,
    upVoteComment,
    downVoteComment,
    getAllComments} from '../actions'

class uniquePost extends Component{
    state = {
        id:'',
        title:'',
        body:'',
        open:false,
        commentOpen:false,
        openCommentUpdate:false,
        comment:{
            id:'', 
            timestamp:'',
            body:'', 
            author:'', 
            parentId:''
        },
        cbody:'',
        ctimestamp:'',
        cid:'',
    }

    componentDidMount = () => {
        let postID = this.props.location.search
        postID = postID.split('=')[1]
        this.props.getUniquePost(postID)
        this.props.getAllComments(postID)
        this.setState({
            id:postID
        })
    }
    
    // Remove Post
    removePost = (event)=>{
        this.props.removePost(this.state.id)
        window.location = '/'
    }

    // Update Post
    showUpdateDialog = (event)=>{
        this.setState({open:true})
    }

    handleChangeTitle=(event)=>{
        let newTitle = document.getElementById('new title').value
        this.setState({title:newTitle})
    }
    
    handleChangeBody=(event)=>{
        let newBody = document.getElementById('new body').value
        this.setState({body:newBody})
    }

    modifyPost=(event)=>{
        this.setState({open:false})
        let id = this.state.id
        let title = this.state.title
        let body = this.state.body
        this.props.updatePost(id, title, body)
        //window.location = '/'
    }

    // Vote Score Post
    plusVotePost=(id)=>{
        this.props.upVotePost(id)
    }

    lessVotePost=(id)=>{
        this.props.downVotePost(id)
    }

    // Add Comment
    goNewComment=(event)=>{
        this.setState({commentOpen:true})
    }

    generateTimestamp=()=>{
        let date = new Date()
        return new Date(date).getTime()
    }

    generateUUID=()=>{        
        let d = new Date().getTime()
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxxxxxx4xxxyxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        })
    }

    handleCommentBody=(event)=>{
        let body = document.getElementById('comment body').value
        this.setState({
            comment:{
                ...this.state.comment,
                body: body
            }
        })
    }

    handleCommentAuthor=(event)=>{
        let author = document.getElementById('comment author').value
        this.setState({
            comment:{
                ...this.state.comment,
                author: author
            }
        })
    }

    createComment=()=>{
        let postID = this.props.location.search
        postID = postID.split('=')[1]
        this.setState({
            comment:{
                ...this.state.comment,
                timestamp: this.generateTimestamp(),
                id: this.generateUUID(),
                parentId: postID,
            }}, ()=>{
                this.props.addComment(this.state.comment)})
        this.setState({commentOpen:false})
        //window.location = '/'
    }

    // Remove Comment
    toDeleteComment =(id)=>{
        this.props.removeComment(id)
    }

    // Update Comment
    showUpdatedComment=(id)=>{
        this.setState({cid:id})
        this.setState({openCommentUpdate:true})
    }

    handleCommentUpdatedBody=(event)=>{
        let cBody=document.getElementById('comment updated body').value
        this.setState({cbody:cBody})
    }

    updateComment=(event)=>{
        this.setState({openCommentUpdate:false})
        let timestamp = this.generateTimestamp()
        this.setState({ctimestamp:timestamp})
        this.props.updateComment(this.state.cid, this.state.ctimestamp, this.state.cbody)
        //window.location = '/'
    }

    // Vote Score Comment
    plusVoteComment=(id)=>{
        this.props.upVoteComment(id)
    }

    lessVoteComment=(id)=>{
        this.props.downVoteComment(id)
    }

    goHome=(event)=>{
        window.location='/'
    }

    render(){
        let {open, commentOpen, openCommentUpdate} = this.state
        let {singlePost, comments} = this.props
        return(
            <div>
                {/* {POST} */}
                <div className='post_card'>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">{singlePost.title}</Typography>
                            <Typography color="textSecondary">{singlePost.body}</Typography>
                            <Typography>By: {singlePost.author}</Typography>
                            <Typography>Votes: {singlePost.voteScore}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={()=>this.plusVotePost(singlePost.id)}>+1</Button>
                            <Button onClick={()=>this.lessVotePost(singlePost.id)}>-1</Button>
                            <IconButton><AddIcon onClick={this.goNewComment}/></IconButton>
                            <IconButton><EditIcon onClick={this.showUpdateDialog}/></IconButton>
                            <IconButton><DeleteIcon onClick={this.removePost}/></IconButton>
                        </CardActions>
                    </Card>

                {/* {COMMENTS LIST} */}
                    {comments.length !==0 ? 
                        <div>
                            {comments.map(comment =>
                                <div key={comment.id}>
                                    <Card className='post_comment_card'>
                                    <CardContent>
                                        <Typography>{comment.body}</Typography>
                                        <Typography>{comment.author}</Typography>
                                        <Typography>Votes: {comment.voteScore}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={()=>this.plusVoteComment(comment.id)}>+1</Button>
                                        <Button onClick={()=>this.lessVoteComment(comment.id)}>-1</Button>
                                        <IconButton><EditIcon onClick={()=>this.showUpdatedComment(comment.id)}/></IconButton>
                                        <IconButton><DeleteIcon onClick={()=>this.toDeleteComment(comment.id)}/></IconButton>
                                    </CardActions>
                                    </Card>
                                    <br/>
                                </div>
                                )}
                        </div>
                        : <EmptyCard/>}
                    
                    <button className='goHome' onClick={this.goHome}>Home</button>

                    {/* {POST UPDATED} */}
                    {open ? 
                    <div>
                        <Dialog open={open}>
                            <DialogTitle>Update your Post!</DialogTitle>
                            <DialogContentText className='dialog'>
                                To update this post, please enter new title and content.
                            </DialogContentText>
                            <div className='dialog'>
                                <TextField 
                                id='new title'
                                placeholder={singlePost.title} 
                                label="Title:" 
                                onChange={this.handleChangeTitle}/>
                                <br/>   
                                <TextField 
                                id='new body'
                                placeholder={singlePost.body} 
                                label="Body:" 
                                onChange={this.handleChangeBody}/>
                            </div>
                            <DialogActions>
                                <Button label="Ok" onClick={this.modifyPost}>Ok</Button>
                            </DialogActions>
                        </Dialog>
                    </div> : '' }

                    {/* {ADD COMMENT} */}
                    {commentOpen ?
                        <Dialog open={commentOpen}>
                            <DialogTitle>Add a new comment!</DialogTitle>
                            <DialogContentText className='dialog'>
                            What do you think?, add your comment below.
                            </DialogContentText>
                                <div className='dialog'>
                                    <TextField 
                                    id='comment body'
                                    placeholder='Share your thoughts!' 
                                    label="Content:" 
                                    onChange={this.handleCommentBody}/>
                                    <br/>   
                                    <TextField 
                                    id='comment author'
                                    placeholder='By:' 
                                    label="By:" 
                                    onChange={this.handleCommentAuthor}/>
                                </div>
                                <DialogActions>
                                    <Button label="Ok" onClick={this.createComment}>Ok</Button>
                                </DialogActions>
                        </Dialog> : ''}

                    {/* {COMMENT UPDATED} */}
                    {openCommentUpdate ?
                        <Dialog open={openCommentUpdate}>
                            <DialogTitle>Update this comment!</DialogTitle>
                            <DialogContentText className='dialog'>
                            To update this comment. please enter new content.
                            </DialogContentText>
                                <div className='dialog'>
                                    <TextField 
                                    id='comment updated body'
                                    placeholder='Share your thoughts!' 
                                    label="Content:" 
                                    onChange={this.handleCommentUpdatedBody}/>
                                </div>
                                <DialogActions>
                                    <Button label="Ok" onClick={this.updateComment}>Ok</Button>
                                </DialogActions>
                        </Dialog> : ''}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){  
    return {
        singlePost: state.post.singlePost.post,
        comments: state.comment.commentsList.comments,
    }
  }

export default connect(
    mapStateToProps,
    {
        removePost, 
        getUniquePost, 
        updatePost, 
        addComment,
        removeComment,
        updateComment,
        upVotePost,
        downVotePost,
        upVoteComment,
        downVoteComment,
        getAllComments})(uniquePost)