import React, {Component} from 'react'
import PostComments from './post_comments'
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
// Buttons
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
// Redux
import {connect} from 'react-redux'
import {removePost,getUniquePost} from '../actions'

class uniquePost extends Component{
    state = {
        id:'',
        postComments:[]
    }

    componentDidMount = () => {
        let postID = this.props.location.search
        postID = postID.split('=')[1]
        this.props.getUniquePost(postID)
        
        this.setState({id:postID})
        
        api.getPostComments(postID).then((comments)=>
            this.setState({postComments:comments})
            )
        }
    
    removePost = (event)=>{
        this.props.removePost(this.state.id)
        window.location = '/'
    }

    goUpdatePost = (event)=>{
        window.location=`/update/post?id=${this.state.id}`
    }

    render(){
        let {postComments} = this.state
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
                            <IconButton><AddIcon/></IconButton>
                            <IconButton><EditIcon onClick={this.goUpdatePost}/></IconButton>
                            <IconButton><DeleteIcon onClick={this.removePost}/></IconButton>
                        </CardActions>
                    </Card>
                    {postComments.length !==0 
                        ? <PostComments comments={this.state.postComments}/> 
                        : <EmptyCard/>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){  
    return {
      singlePost: state.post
    }
  }

export default connect(
    mapStateToProps,
    {removePost,getUniquePost})(uniquePost)