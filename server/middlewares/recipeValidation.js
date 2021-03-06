/* jshint esversion: 6 */
import isNull from 'lodash/isEmpty';

import db from '../models/index';
import isEmpty from '../helpers/isEmpty';
import categories from '../../shared/categories';
import cleanString from '../../shared/cleanString';
import { errorHandler } from '../helpers/responseHandler';

const Recipe = db.Recipe;

/**
 * @description Middleware function for handles input
 * validation for recipes
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const recipeBasicValidation = (req, res, next) => {
  const errors = {};
  if (!req.body.recipeName || isEmpty(req.body.recipeName)) {
    errors.recipeName = 'Please enter a recipe name';
  }
  if (!req.body.ingredients || isEmpty(req.body.ingredients)) {
    errors.ingredients = 'Ingredients field cannot be empty';
  }
  if (!req.body.instructions || isEmpty(req.body.instructions)) {
    errors.instructions = 'Instructions field cannot be empty';
  }
  if (req.body.category) {
    if (!cleanString(req.body.category)) {
      req.body.category = 'others';
    } else if (cleanString(req.body.category) &&
      !categories.includes(req.body.category)) {
      errors.category = 'Invalid category selected';
    }
  } else if (!req.body.category || !cleanString(req.body.category)) {
    req.body.category = 'others';
  }
  if (isNull(errors)) {
    return next();
  }
  return errorHandler(400, errors, res);
};

/**
 * @description Middleware function for validating if a recipe exists
 *
 * @param {object} req http request object to server
 * @param {object} res http response object from server
 * @param {function} next
 *
 * @returns {object} status message
 */
const recipeExists = (req, res, next) => {
  Recipe
    .find({ where: { id: req.params.recipeId } })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send({
          status: 'fail',
          message: 'Recipe not found'
        });
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};

const checkPermission = (req, res, next) => {
  Recipe
    .find({ where:
      {
        id: req.params.recipeId,
      }
    })
    .then((recipe) => {
      if (recipe && req.decoded.user.id !== recipe.userId) {
        return errorHandler(
          403, 'Your request is understood but not permitted', res
        );
      }
      next();
    })
    .catch(error => res.status(400).send(error));
};

const checkMultiplePost = (req, res, next) => {
  const { recipeName } = req.body;
  return Recipe
    .findOne({ where: {
      userId: req.decoded.user.id,
      recipeName,
    }
    })
    .then((recipes) => {
      if (!recipes) return next();
      return errorHandler(409, 'You have already created post', res);
    })
    .catch(error => res.status(400).json(error));
};

export {
  recipeBasicValidation,
  recipeExists,
  checkMultiplePost,
  checkPermission
};
