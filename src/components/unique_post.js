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
    removeComment} from '../actions'

class uniquePost extends Component{
    state = {
        id:'',
        title:'',
        body:'',
        postComments:[],
        open:false,
        commentOpen:false,
        comment:{
            id:'', 
            timestamp:'',
            body:'', 
            author:'', 
            parentId:''
        }
    }

    componentDidMount = () => {
        let postID = this.props.location.search
        postID = postID.split('=')[1]
        this.props.getUniquePost(postID)
        this.setState({id:postID})
        api.getPostComments(postID).then((comments)=>
            this.setState({postComments:comments}))
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
        window.location = '/'
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
            }}, ()=>{this.props.addComment(this.state.comment)})
        this.setState({commentOpen:false})
        window.location = '/'
    }

    // Remove Comment
    toDeleteComment =(id)=>{
        console.log('event clicked', id)
        this.props.removeComment(id)
        window.location = '/'
    }

    render(){
        let {postComments, open, commentOpen} = this.state
        let {singlePost} = this.props
        return(
            <div>
                <div className='post_card'>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">{singlePost.title}</Typography>
                            <Typography color="textSecondary">{singlePost.body}</Typography>
                            <Typography>By: {singlePost.author}<br/></Typography>
                        </CardContent>
                        <CardActions>
                            <Button>+1</Button>
                            <Button>-1</Button>
                            <IconButton><AddIcon onClick={this.goNewComment}/></IconButton>
                            <IconButton><EditIcon onClick={this.showUpdateDialog}/></IconButton>
                            <IconButton><DeleteIcon onClick={this.removePost}/></IconButton>
                        </CardActions>
                    </Card>
                    {postComments.length !==0 ? 
                        <div>
                            {postComments.map(comment =>
                                <div key={comment.id}>
                                    <Card className='post_comment_card'>
                                    <CardContent>
                                        <Typography>{comment.body}</Typography>
                                        <Typography>{comment.author}</Typography>
                                        <Typography>{comment.voteScore}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button>+1</Button>
                                        <Button>-1</Button>
                                        <IconButton><EditIcon/></IconButton>
                                        <IconButton><DeleteIcon onClick={()=>this.toDeleteComment(comment.id)}/></IconButton>
                                    </CardActions>
                                    </Card>
                                    <br/>
                                </div>
                                )}
                        </div>
                        : <EmptyCard/>}
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
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){  
    return {
      singlePost: state.post,
      comment: state.newComment
    }
  }

export default connect(
    mapStateToProps,
    {
        removePost, 
        getUniquePost, 
        updatePost, 
        addComment,
        removeComment})(uniquePost)