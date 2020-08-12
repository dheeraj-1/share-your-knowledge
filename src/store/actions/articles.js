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

export const resetCurrentArticleToNull = (article) => {
    return {
        type: actionTypes.RESET_CURRENT_ARTICLE_TO_NULL
    }
}
export const currentArticleReceived = (article) => {
    return {
        type: actionTypes.CURRENT_ARTICLE_RECEIVED,
        currentArticle: article,
        newArticleSubmitted: false
    }
}

export const currentArticleNotReceived = (error) => {
    return {
        type: actionTypes.CURRENT_ARTICLE_NOT_RECEIVED,
        error: error
    }
}

export const articlePosted = (article) => {
    return {
        type: actionTypes.ARTICLE_POSTED_SUCCESSFULLY,
        newArticle: article,
        newArticleSubmitted: true
    }
}

export const articleUpdated = (article) => {
    return {
        type: actionTypes.ARTICLE_UPDATED_SUCCESSFULLY,
        article: article
    }
}

export const articleDeleted = (slug) => {
    return {
        type: actionTypes.ARTICLE_DELETED_SUCCESSFULLY,
        deletedArticleSlug: slug
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

export const getCurrentArticle = (slug) => {
    console.log('GEt current article', slug);
    return dispatch => {
        dispatch(resetCurrentArticleToNull());
        axios.get('https://conduit.productionready.io/api/articles/' + slug)
            .then((res) => {
                console.log('Successss', res);
                //this.setState({loadedArticle: res.data.article});
                dispatch(currentArticleReceived(res.data.article));
            })
            .catch((error) => {
                console.log('Error while fetching this articleee', error);
                dispatch(currentArticleNotReceived(error));
            })
           
    }
}

export const postArticle = (title, desc, body, token) => {
    console.log('post article req', token);
    return dispatch => {
        //dispatch(resetCurrentArticleToNull());
        const articleData = {
            article: {
                title: title,
                description: desc,
                body: body
              }
        }
        let reqUrl = 'https://conduit.productionready.io/api/articles';
        axios.post(reqUrl, articleData, {
            headers: {
              Authorization: 'Token ' + token
            }
          })
            .then(res => {
                console.log('Articles posted', res);
                dispatch(articlePosted(res.data.article))
            })
            .catch(error => {
                console.log('Article not posted', error);
                dispatch(currentArticleNotReceived(error))
            })
    }
}

export const deleteArticle = (slug, token) => {
    console.log('delete', slug);
    return dispatch => {
        axios.delete('https://conduit.productionready.io/api/articles/' + slug, {
            headers: {
              Authorization: 'Token ' + token
            }
          })
            .then((res) => {
                console.log('deleted successfully', res);
                dispatch(articleDeleted(slug));
            })
            .catch((error) => {
                console.log('Error while deleting', error);
            })
    }
}

export const updateArticle = (title, desc, body, slug) => {
    console.log('update article');
    return dispatch => {

    }
}