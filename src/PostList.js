import React, { Component } from 'react'
import Post from './Post'
import style from './style'

class PostList extends Component {
    render() {
        let postNodes = this.props.data.map(post => {
            return(
                <Post
                    title={ post.title || 'unknown' }
                    uniqueID={ post['_id'] }
                    onPostDelete={ this.props.onPostDelete }
                    onPostUpdate={ this.props.onPostUpdate }
                    key={ post['_id'] } >
                  { post.description || 'empty!'}
                </Post>
            )
        });
        return(
            <div style={ style.commentList }>
                { postNodes }
            </div>
        )
    }
}

export default PostList;