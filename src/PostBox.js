import React, { Component } from 'react'
import axios from 'axios'
import PostList from './PostList'
import PostForm from './PostForm'
import style from './style'

class PostBox extends Component {
  constructor(props) {
    super(props);
      this.state = { data: [] };
      this.loadPostsFromServer = this.loadPostsFromServer.bind(this);
      this.handlePostSubmit = this.handlePostSubmit.bind(this);
      this.handlePostDelete = this.handlePostDelete.bind(this);
      this.handlePostUpdate = this.handlePostUpdate.bind(this);
    }
    loadPostsFromServer() {
      axios.get(this.props.url)
          .then(res => {
              this.setState({ data: res.data });
          })
    }
    handlePostSubmit(post){
      let posts = this.state.data;
      post.id = Date.now();
      let newPosts = posts.concat([post]);
      this.setState({ data: newPosts });
      axios.post(this.props.url, post )
          .catch(err => {
              console.log(err);
              this.setState({ data: posts });
          });
    }
    handlePostDelete(id) {
        axios.delete(`${this.props.url}/${id}`)
            .then(res => {
                console.log('Post deleted');
            })
            .catch(err => {
                console.log(err);
            });
    }
    handlePostUpdate(id, post) {
        // sends the post id and new title/description to our api
        axios.put(`${this.props.url}/${id}`, post)
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount() {
        this.loadPostsFromServer()
        setInterval(this.loadPostsFromServer, this.props.pollInterval);
    }
    render() {
      return (
        <div style={ style.commentBox }>
          <h2 style={ style.title }>meetbff</h2>
          <PostForm onPostSubmit={ this.handlePostSubmit }/>
          <PostList
              onPostDelete={ this.handlePostDelete }
              onPostUpdate={ this.handlePostUpdate }
              data={ this.state.data } />

        </div>
      )
    }
}

export default PostBox;