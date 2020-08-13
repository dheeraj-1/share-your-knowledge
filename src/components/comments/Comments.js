import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import classes from './Comments.module.css';
import Comment from './comment/Comment';

class Comments extends Component {
    state = {
        comments: null,
        commentText: '',
        slug: ''
    }

    componentDidMount() {
        console.log('Component did mount [Comments]', this);
        let reqUrl = 'https://conduit.productionready.io/api/articles/' + this.props.slug + '/comments';
        axios.get(reqUrl)
            .then(res => {
                this.setState({comments: res.data.comments});
            })
        
    }

    render() {
        let comments = null, writeComments = null;
        if(this.state.comments) {
            comments = this.state.comments.map((comment) => {
                return <Comment key={comment.id} comment={comment} onDelete={this.deleteCommentHandler}/>
            })
        }

        if(this.props.isAuthenticated) {
            writeComments = (
                <div className={classes.Comments}>
                    
                    <textarea
                            type='text'
                            name='commentText'
                            placeholder='Write a comment'
                            value={this.state.commentText}
                            onChange={(event) => this.changeHandler(event, "commentText")}
                            ></textarea><br/>
                    <button type="submit" onClick={this.submitHandler}>Post Comment</button>
                </div>
            );
        }
        return (
            <div>
                {writeComments}
                <div>
                    {comments}
                </div>
            </div>
        )
    }

    changeHandler = (event, elementName) => {
        var newState = { ...this.state};
        newState[elementName] = event.target.value;
        this.setState(newState);
    }
    submitHandler = (event) => {
        event.preventDefault();
        const commentData = {
            comment: {
                body: this.state.commentText
              }
        }
        let reqUrl = 'https://conduit.productionready.io/api/articles/' + this.props.slug + '/comments';
        axios.post(reqUrl, commentData, {
            headers: {
                Authorization: 'Token ' + this.props.token
            }
            })
            .then(res => {
                this.setState({comments: this.state.comments.concat(res.data.comment), commentText: ''});
            })
    }

    deleteCommentHandler = (event, commentId) =>{
        console.log('Delete comment', this.props, event, commentId);
        let reqUrl = 'https://conduit.productionready.io/api/articles/' + this.props.slug + '/comments/' + commentId;
        axios.delete(reqUrl, {
            headers: {
                Authorization: 'Token ' + this.props.token
            }
        })
            .then((res) => {
                this.setState({comments: this.state.comments.filter((comment) => comment.id !== commentId)});
            })
    }
        
}

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId,
        userName: state.userName,
        isAuthenticated: state.token != null
    }
};
export default connect(mapStateToProps)(Comments);