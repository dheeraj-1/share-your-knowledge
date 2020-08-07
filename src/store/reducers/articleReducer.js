import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';


const initialState = {
    error: null,
    articles: null
}

const getArticlesSuccess = (state, action) => {
    console.log('Get articles success', state, action);
    return updateObject(state, { articles: action.articles});
}

const getArticlesFail = (state, action) => {
    console.log('Get articles fail', state, action);
    return updateObject(state, { error: action.error});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ARTICLES_RECEIVED: return getArticlesSuccess(state, action);
        case actionTypes.ARTICLES_NOT_RECEIVED: return getArticlesFail(state, action);
        default: return state;
    }
}

export default reducer;


