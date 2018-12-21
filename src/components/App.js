import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import AllPostsList from './list_posts'
import postsByCategory from './posts_by_category'
import uniquePost from './unique_post'
import NewPost from './new_post'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={AllPostsList}/>
        <Route exact path='/posts' component={postsByCategory}/>
        <Route exact path='/comments' component={uniquePost}/>
        <Route exact path='/newPost' component={NewPost}/>
      </div>
    );
  }
}

export default App
