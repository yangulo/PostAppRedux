import React, {Component} from 'react'
// css
import '../utils/style/styles.css'
// Cards
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// Text Field
import TextField from '@material-ui/core/TextField'
// Buttons
import Button from '@material-ui/core/Button'
// Redux
import {connect} from 'react-redux'
import {updatePost} from '../actions'

class UpdatePost extends Component {
    
    state={
        post:{
            title:'',
            body:'',
            id:''
        }
    }

    handleChangeTitle=(event)=>{
        let id = this.props.location.search
        let newTitle = document.getElementById('new title').value
        this.setState({
            post:{
                ...this.state.post,
                title:newTitle,
                id:id
            }
        })
    }
    
    handleChangeBody=(event)=>{
        let newBody = document.getElementById('new body').value
        this.setState({
            post:{
                ...this.state.post,
                body:newBody
            }
        })
    }

    updateExistingPost = () => {
        let statePost = this.state.post
        this.props.updatePost(statePost)
        console.log(statePost)
    }

    render(){
        return(
            <div>
                <Card className='post_card'>
                    <CardContent>
                        <TextField label="Update Title" 
                            id='new title'
                            placeholder='Update Title' 
                            margin="normal"
                            onChange={this.handleChangeTitle}
                            />
                        <TextField label="Update Body" 
                            id='new body'
                            placeholder="Update your post here!"
                            fullWidth 
                            margin="normal" 
                            onChange={this.handleChangeBody}
                            />
                    </CardContent>
                    <CardActions>
                        <Button onClick={this.updateExistingPost}>Submit</Button>
                    </CardActions>
                </Card>            
            </div>
        )
    }
}
function mapStateToProps(state) {
    console.log(state)
    return {
      post: state.post
    }
  }

export default connect(
    mapStateToProps,
    {updatePost}
)(UpdatePost)
