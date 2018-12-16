import React, {Component} from 'react'
import '../utils/style/styles.css'
// api
import * as api from '../utils/api'
// Expansion Panel
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// ccs
import '../utils/style/styles.css'

class postsByCategory extends Component{
    state={
        posts:[],
        c:''
    }

    componentDidMount = ()=> {
        let category = this.props.location.search
        category = category.split('=')[1]
        this.setState({c:category})
        api.getPostsByCategory(category).then((posts)=>
        this.setState({posts: posts}))
    }

    handleChange = (id) => (event, expanded) => {
        this.setState({
          expanded: expanded ? id : false,
        })
        console.log('expanded', this.state.expanded )
    }

    render(){
        const { expanded, c } = this.state
        return(
            <div>
                <h2 className='main_title'>{c}</h2>
                <hr className='main_title_hr'/>
                <div className='expansion_panel'>
                    {this.state.posts.map( post => 
                        <ExpansionPanel key={post.id} expanded={expanded === post.id} onChange={this.handleChange(post.id)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <div>
                                    <Typography>
                                        {post.title}
                                        <a className='post_link' href={`/comments?id=${post.id}`}>Go post</a>
                                     </Typography>
                                </div>
                                <div className='posts'><Typography>{post.category}</Typography></div>
                            </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className='post_body'><Typography>{post.author}</Typography></div>
                                    <div><Typography>{post.body}</Typography></div>
                                </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )}
                </div>
            </div>
        )
    }
}

export default postsByCategory