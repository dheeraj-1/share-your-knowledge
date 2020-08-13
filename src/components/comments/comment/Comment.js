import React, { Component } from 'react';
import { connect } from 'react-redux';

import Image from '../../../assets/smiley-cyrus.jpg';
import classes from './Comment.module.css';


class Comment extends Component {

    render() {

        let editAndDeleteButtons = null;
        if(this.props.userName === this.props.comment.author.username) {
            editAndDeleteButtons = (
                <div className={classes.buttons}>
                    <button>Edit Comment</button>
                    <button onClick={(event, commentId) => this.props.onDelete(event, this.props.comment.id)}>Delete Comment</button>
                </div> 
            )
        }
        return (
            <div className={classes.Comment}>
                <p>{this.props.comment.body}</p>
                <div>
                    <img src={Image} alt='author'></img>
                    <div className={classes.Author}>
                        <a href="/">{this.props.comment.author.username}</a><br/>
                        <span>{this.props.comment.updatedAt}</span>               
                    </div>
                    {editAndDeleteButtons}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userName: state.userName
    }
}

export default connect(mapStateToProps)(Comment);