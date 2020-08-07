import axios from 'axios';

import * as actionTypes from './actionTypes';

export const articlesReceived = (articles) => {
    return {
        type: actionTypes.ARTICLES_RECEIVED,
        articles: articles
    }
}

export const articlesNotReceived = (error) => {
    return {
        type: actionTypes.ARTICLES_NOT_RECEIVED,
        error: error
    }
}

export const getArticles = () => {
    console.log("Get articles is called");
    return dispatch => {
        let reqUrl = 'https://conduit.productionready.io/api/articles';
        axios.get(reqUrl)
            .then(res => {
                console.log('Articles received', res);
                dispatch(articlesReceived(res.data.articles))
            })
            .catch(error => {
                dispatch(articlesNotReceived(error))
            })
    }
}