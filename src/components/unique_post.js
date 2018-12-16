import React, {Component} from 'react'
import '../utils/style/styles.css'
import PostComments from './post_comments'
import EmptyCard from './empty_card'
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
                            <IconButton><EditIcon/></IconButton>
                            <IconButton><DeleteIcon/></IconButton>
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

export default uniquePost