/**
 * @description Helper function for handling error response
 *
 * @param {number} code
 * @param {object} err
 * @param {object} res
 *
 * @returns {object} status message
 */
const errorHandler = (code, err, res) => {
  switch (code) {
    case 400:
      return res.status(400).json({
        status: 'fail',
        message: err
      });
    case 401:
      return res.status(401).json({
        status: 'fail',
        message: err
      });
    case 404:
      return res.status(404).json({
        status: 'fail',
        message: err
      });
    case 403:
      return res.status(403).json({
        status: 'fail',
        message: err
      });
    case 406:
      return res.status(406).json({
        status: 'fail',
        message: err
      });
    case 409:
      return res.status(409).json({
        status: 'fail',
        message: err
      });
    case 422:
      return res.status(422).json({
        status: 'fail',
        message: err
      });
    default:
      return res.status(500).json({
        status: 'fail',
        message: err
      });
  }
};

/**
 * @description Helper function for handling recipe response
 *
 * @param {number} code
 * @param {object} body
 * @param {object} res
 *
 * @returns {object} status, message, id, views, upvote, downvote,
 * recipeName, category, ingredients, instructions, image
 */
const recipeHandler = (code, body, res) => {
  switch (code) {
    case 201:
      return res.status(201).json({
        status: 'success',
        message: 'Successfully created new recipe',
        id: body.id,
        views: body.views,
        upvote: body.upvote,
        downvote: body.downvote,
        recipeName: body.recipeName,
        category: body.category,
        ingredients: body.ingredients,
        instructions: body.instructions,
        image: body.image
      });
    default:
      return res.status(200).json({
        status: 'success',
        message: 'Recipe successfully updated',
        id: body.id,
        views: body.views,
        upvote: body.upvote,
        downvote: body.downvote,
        recipeName: body.recipeName,
        category: body.category,
        ingredients: body.ingredients,
        instructions: body.instructions,
        image: body.image
      });
  }
};

/**
 * @description Helper function for handling querying
 * with join tables
 *
 * @param {object} dbReview
 * @param {object} dbUser
 * @param {object} dbFavorite
 *
 * @returns {object} response
 */
const responseHandler = (
  dbReview, dbUser, dbFavorite) => {
  const response = {
    include: [{
      model: dbReview,
      as: 'reviews',
      attributes: ['comment', 'createdAt'],
      include: [{
        model: dbUser,
        attributes: ['username']
      }]
    },
    {
      model: dbFavorite,
      attributes: ['userId']
    }]
  };
  return response.include;
};

const handleResponse = (
  code, res, func, page, limit, status, message, response) => {
  const { rows: { length }, count } = response;
  status = 'success';
  message = `Showing ${length} of ${count} recipes found`;
  return res.status(code)
    .json(
      func(page, limit, status, message, response)
    );
};

export { errorHandler, recipeHandler, responseHandler, handleResponse };

