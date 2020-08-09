import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';
import { updateArticle } from '../actions';
import { act } from 'react-dom/test-utils';



const initialState = {
    error: null,
    articles: null,
    currentArticle: null
}

const getArticlesSuccess = (state, action) => {
    console.log('Get articles success', state, action);
    return updateObject(state, { articles: action.articles});
}

const getArticlesFail = (state, action) => {
    console.log('Get articles fail', state, action);
    return updateObject(state, { error: action.error});
}

const getCurrentArticlesSuccess = (state, action) => {
    console.log('Get currentArticle success', state, action);
    return updateObject(state, { currentArticle: action.currentArticle});
}

const getCurrentArticlesFail = (state, action) => {
    console.log('Get currentArticle fail', state, action);
    return updateObject(state, { error: action.error});
}

const resetCurrentArticleToNull = (state, action) => {
    console.log('Get currentArticle fail', state, action);
    return updateObject(state, { currentArticle: null});
}

const articlePosted = (state, action) => {
    console.log('article posted successfully');
    updateObject(state, { currentArticle: action.currentArticle});
}

const articleUpdated = (state, action) => {
    console.log('article updated successfully');
    updateObject(state, { currentArticle: action.currentArticle});
}

const articleDeleted = (state, action) => {
    console.log('article deleted successfully');
    updateObject(state, { currentArticle: null});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ARTICLES_RECEIVED: return getArticlesSuccess(state, action);
        case actionTypes.ARTICLES_NOT_RECEIVED: return getArticlesFail(state, action);
        case actionTypes.CURRENT_ARTICLE_RECEIVED: return getCurrentArticlesSuccess(state, action);
        case actionTypes.CURRENT_ARTICLE_NOT_RECEIVED: return getCurrentArticlesFail(state, action);
        case actionTypes.RESET_CURRENT_ARTICLE_TO_NULL: return resetCurrentArticleToNull(state, action);
        case actionTypes.ARTICLE_POSTED_SUCCESSFULLY: return articlePosted(state, action);
        case actionTypes.ARTICLE_UPDATED_SUCCESSFULLY: return articleUpdated(state, action);
        case actionTypes.ARTICLE_DELETED_SUCCESSFULLY: return articleDeleted(state, action);
        default: return state;
    }
}

export default reducer;


