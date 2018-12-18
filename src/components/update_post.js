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

class UpdatePost extends Component{
    
    state={
        post:{
            title:this.props.previousPost.title,
            body:'this.previousPost.body',
            id:'this.previousPost.id'
        }
    }

    handleChangeTitle=(event)=>{
        let newTitle = document.getElementById('new title').value
        console.log(newTitle)
        this.setState({
            post:{
                ...this.state.post,
                title:newTitle
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

    updatePost=()=>{
        this.props.updatePost(
            this.state.post)
        //window.location='/'
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
                        <Button onClick={this.updatePost}>Submit</Button>
                    </CardActions>
                </Card>            
            </div>
        )
    }
}
function mapStateToProps({post}){  
    return {
      post
    }
  }

export default connect(
    mapStateToProps,
    {updatePost}
)(UpdatePost)
