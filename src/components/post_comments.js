import React, {Component} from 'react'
import '../utils/style/styles.css'
// Cards
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'

class PostComments extends Component{
    render(){
        return(
            <div>
                {console.log(this.props.comments)}
                {this.props.comments.map(comment =>
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
                            <IconButton><DeleteIcon/></IconButton>
                        </CardActions>
                        </Card>
                        <br/>
                    </div>
                    )}
            </div>
        )
    }
}

export default PostComments