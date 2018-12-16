import React, {Component} from 'react'
// Cards
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// Icons
import Button from '@material-ui/core/Button';
// css
import '../utils/style/styles.css'
// Text Field
import TextField from '@material-ui/core/TextField'
// Redux
import { connect } from 'react-redux'
import {createPost} from '../actions'

class NewPost extends Component{

    state={
        post:{
            id:'', 
            timestamp:'',
            title:'', 
            body:'', 
            author:'', 
            category:''
        }
    }

    // Should be called on submit button? 
    generateTimestamp=()=>{
        let date = new Date()
        return new Date(date).getTime()
    }

    generateUUID=()=>{        
        let d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxxxxxx4xxxyxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        })
    }

    handleChangeName=(event)=>{
        let name= document.getElementById('name').value
        console.log(name)
        this.setState({
            post:{
                ...this.state.post,
                author:name,
                id:this.generateUUID(),
                timestamp:this.generateTimestamp()
            }
        }, ()=>{console.log('name:', this.state.post.author)})
    }

    handleChangeTitle=(event)=>{
        let title=document.getElementById('title').value
        this.setState({
            post:{
                ...this.state.post,
                title:title
            }
        }, ()=>{console.log('title:', this.state.post.title)})
    }

    handleChangeCategory=(event)=>{
        let category=document.getElementById('categories').value
        this.setState({
            post:{
                ...this.state.post,
                category:category
            }
        }, ()=>{console.log('category:', this.state.post.category)})
    }

    handleChangeBody=(event)=>{
        let body=document.getElementById('body').value
        this.setState({
            post:{
                ...this.state.post,
                body:body
            }
        }, ()=>{console.log('body:', this.state.post.body)})
    }

    createPost =(event)=>{
        this.props.createPost(this.state.post)
    }
    
    render(){
        return(
            <div>
                <h2 className='main_title'>New Post</h2>
                <hr className='main_title_hr'/>
                <div>
                    <Card className='post_comment_card'>
                        <CardContent>
                            <form className='text_field'>
                                <TextField label="Name" 
                                id='name' 
                                placeholder='Name' 
                                margin="normal" 
                                onChange={this.handleChangeName}/>
                                <TextField label="Title" 
                                id='title'
                                placeholder='Title' 
                                margin="normal"
                                onChange={this.handleChangeTitle}/>
                                <select className='select_form' 
                                id='categories' 
                                onChange={this.handleChangeCategory}>
                                    <option disabled selected>None...</option>
                                    <option value='react'>React</option>
                                    <option value='redux'>Redux</option>
                                    <option value='udacity'>Udacity</option>
                                </select>
                            </form>
                            <TextField label="Body" 
                            id='body'
                            placeholder="Write your post here!"
                            fullWidth 
                            margin="normal" 
                            onChange={this.handleChangeBody}/>
                        </CardContent>
                        <CardActions>
                            <Button>+1</Button>
                            <Button>-1</Button>
                            <Button onClick={this.createPost}>Submit</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//       newPost: (post)=>dispatch(createPost(post)),
//     }
//   }
  
function mapStateToProps({post}) {  
    console.log(post)
    return {
      post
    }
  }

export default connect(
    mapStateToProps,
    {createPost}
  )(NewPost)