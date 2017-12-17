/* eslint-disable */
/* jshint esversion: 6 */
import _ from 'lodash';

import actionTypes from '../actions/actionTypes';

const recipeReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SAMPLE_RECIPES:
      return {
        recipes: _.mapKeys(action.payload, 'id'),
        pagination: {}
      };
    case actionTypes.FETCH_RECIPES:
      const { pagination } = action.payload;
      const recipes = _.mapKeys(action.payload.recipes, 'id');
      return {recipes, pagination};
    case actionTypes.CREATE_POST:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          [action.payload.id]: action.payload,
        }
      };
    case actionTypes.UPVOTE_POST:
      return {
        ...state,
        recipes: {
          ...state.recipes,
          [action.payload.recipeId]: {
            ...state.recipes[action.payload.recipeId],
            upvote: action.payload.upvote,
            downvote: action.payload.downvote,
          }
        }
      };
    case actionTypes.DOWNVOTE_POST:
    return {
      ...state,
      recipes: {
        ...state.recipes,
        [action.payload.recipeId]: {
          ...state.recipes[action.payload.recipeId],
          upvote: action.payload.upvote,
          downvote: action.payload.downvote,
        }
      }
    };
    default:
      return state;
  }
};

export default recipeReducer;
