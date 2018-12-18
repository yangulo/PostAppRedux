import React, {Component} from 'react'
import PostComments from './post_comments'
import EmptyCard from './empty_card'
// css
import '../utils/style/styles.css'
// api
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
import {removePost} from '../actions'

class uniquePost extends Component{
    state = {
        p:{},
        id:'',
        postComments:[]
    }

    componentDidMount = ()=> {
        let postID = this.props.location.search
        postID = postID.split('=')[1]
        this.setState({id:postID})
        api.getUniquePost(postID).then((post) => 
            this.setState({p: post}
                // , () => {console.log("this," ,this.state)}
                ))
        api.getPostComments(postID).then((comments)=>
            this.setState({postComments:comments}
                ))
                console.log('comments',this.state.postComments)
            }
    
    removePost = (event)=>{
        this.props.removePost(this.state.id)
        window.location = '/'
    }

    goUpdatePost = (event)=>{
        window.location=`/update/post?id=${this.state.id}`
    }

    render(){
        let {p, postComments} = this.state
        return(
            <div>
                <div className='post_card'>
                    <Card>
                        <CardContent>
                            <Typography  color="textSecondary">{p.title}</Typography>
                            <Typography  color="textSecondary">{p.body}</Typography>

                            <Typography >By: {p.author}<br /></Typography>
                        </CardContent>
                        <CardActions>
                            <Button>+1</Button>
                            <Button>-1</Button>
                            <IconButton><AddIcon/></IconButton>
                            <IconButton><EditIcon previousPost={this.props.post} onClick={this.goUpdatePost}/></IconButton>
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
      post: state.post
    }
  }

export default connect(
    mapStateToProps,
    {removePost}
)(uniquePost)