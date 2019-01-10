// General
import React, {Component} from 'react'
import AllCategoriesList from './list_categories'
// Api
import * as api from '../utils/api'
// Redux
import {getAllPosts, orderByMaxScore, orderByMostCurrent} from '../actions'
import {connect} from 'react-redux'
// Expansion Panel
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// Floating button
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
// Chips
import Chip from '@material-ui/core/Chip'
// ccs
import '../utils/style/styles.css'

class AllPostsList extends Component{
    state={
        allCategories:[],
        expanded: null,
    }
    
    componentDidMount = ()=> {
        this.props.getAllPosts()
        api.getAllCategories().then((categories)=>{
            this.setState({allCategories: categories.categories})
        })
    }

    handleChange = (id) => (event, expanded) => {
        this.setState({
          expanded: expanded ? id : false,
        })
    }

    orderByMaxScore=(event)=>{
        this.props.orderByMaxScore()
    }

    orderByMostCurrent=(event)=>{
        this.props.orderByMostCurrent()
    }
    
    render() {
        const { expanded, allCategories } = this.state
        const { posts } = this.props
        return(
            <div>
                <h2 className='main_title'>All Posts</h2>
                <hr className='main_title_hr'/>
                <div className='expansion_panel'>
                    {/* TODO Order by score */}
                    <Chip className='max' label='Max Top' variant="outlined" onClick={this.orderByMaxScore}/>
                    <Chip className='max' label='Most Current' variant="outlined" onClick={this.orderByMostCurrent}/>
                    {posts.map( post => 
                        <ExpansionPanel key={post.id} expanded={expanded === post.id} onChange={this.handleChange(post.id)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography>
                                    {post.title}
                                    <a className='post_link' href={`/comments?id=${post.id}`}>Go Post</a>
                                </Typography>    
                                <div className='posts'>
                                    <Typography>
                                        {post.category}
                                    </Typography>
                                </div>
                            </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography className='post_body'>
                                        {post.author}
                                    </Typography>        
                                    <Typography>
                                        {post.body}
                                        <br/>
                                        Votes: {post.voteScore}
                                    </Typography>
                                </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )}
                </div>
                <div>
                    <AllCategoriesList categories={allCategories}/>
                </div>
                <div className='add_icon'>
                    <Fab aria-label="Add" href='/newPost'>
                        <AddIcon />
                    </Fab>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        posts: state.post.postList.posts
    }
}

export default connect(
    mapStateToProps,
    {getAllPosts, orderByMaxScore, orderByMostCurrent})(AllPostsList)

