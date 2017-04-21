import React, { Component } from 'react';
import style from './style'
import marked from 'marked'

class Post extends Component {
    constructor(props){
        super(props);
        this.state = {
            toBeUpdated: false,
            title: '',
            description: ''
        };
        this.updatePost = this.updatePost.bind(this);
        this.handlePostUpdate = this.handlePostUpdate.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    }
    updatePost(e) {
        e.preventDefault();
        this.setState({ toBeUpdated: !this.state.toBeUpdated });
    }
    handlePostUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        // if title or description changes, set it,
        // if not leave null and our Put will ignore it
        let title = ( this.state.title ) ? this.state.title : null;
        let description = ( this.state.description ) ? this.state.description : null;
        let post = { title: title, description: description };
        this.props.onPostUpdate(id, post);
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            title: '',
            description: ''
        })
    }
    deletePost(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onPostDelete(id);
        console.log('post deleted')
    }
    handleTitleChange(e) {
        this.setState({ title: e.target.value });

    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value });

    }
    rawMarkup(){
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render(){
        return (
            <div style={ style.comment} >
                <h3>{this.props.title}</h3>
                <h3>{this.props.description}</h3>
                <span dangerouslySetInnerHTML={ this.rawMarkup()} />
                <a style={ style.updateLink } href='#' onClick={ this.updatePost }>update</a>
                <a style={ style.updateLink } href='#' onClick={ this.deletePost }>delete</a>
                { (this.state.toBeUpdated )
                ? (<form onSubmit={ this.handlePostUpdate}>
                            <input
                                type='text'
                                placeholder='Update title...'
                                style={ style.commentFormAuthor }
                                value={ this.state.title }
                                onChange={ this.handleTitleChange } />
                            <input
                                type='text'
                                placeholder='Update your description...'
                                style={ style.commentFormText }
                                value={ this.state.description }
                                onChange={ this.handleDescriptionChange } />
                            <input
                                type='submit'
                                style={ style.commentFormPost }
                                value='Update' />
                        </form>)
                        : null}
            </div>
        )
    }
}

export default Post;