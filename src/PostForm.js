import React, { Component } from 'react'
import style from './style'

class PostForm extends Component {
    constructor(props){
        super(props);
            this.state = {
                title: '',
                description: ''
            };
            this.handleTitleChange = this.handleTitleChange.bind(this);
            this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleTitleChange(e) {
            this.setState({ title: e.target.value })
        }
        handleDescriptionChange(e) {
            this.setState({ description: e.target.value });
        }
        handleSubmit(e) {
            e.preventDefault();
            let title = this.state.title.trim();
            let description = this.state.description.trim();
            if(!title ||!description) {
                return;
            }
            this.props.onPostSubmit({ title: title, description: description });
            this.setState({ title: '', description: '' });
        }
        render(){
            return (
                <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
                  <input
                    type='text'
                    placeholder='What people will see first'
                    style={ style.commentFormAuthor }
                    value={ this.state.title }
                    onChange={ this.handleTitleChange } />
                  <input
                    type='text'
                    placeholder='more details'
                    style={ style.commentFormText }
                    value={ this.state.description }
                    onChange={ this.handleDescriptionChange} />
                  <input
                    type='submit'
                    style={ style.commentFormPost }
                    value='Post' />
                </form>
            )
        }
    }

export default PostForm;