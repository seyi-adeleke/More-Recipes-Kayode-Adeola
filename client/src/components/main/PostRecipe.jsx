import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'proptypes';
import showdown from 'showdown';

import FileUpload from './FileUpload';
import { Loader } from './';
import { createPost } from '../../actions';
import validate from '../../utils/validate';
import categories from '../../../../shared/categories';
import pascalCase from '../../utils/pascalCase';
import resetPage from '../../utils/resetPage';

showdown.setFlavor('github');

/**
 * @summary - PostRecipe class declaration
 * @class PostRecipe
 * @extends {Component}
 */
class PostRecipe extends Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf PostRecipe
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'others',
      isLoading: false
    };
  }

  /**
   * @method componentDidMount
   *
   * @param {void} void
   *
   * @returns {void}
   */
  componentDidMount() {
    // eslint-disable-next-line
    $(findDOMNode(this.category))
      .on('change', this.handleCategory);
  }

  /**
   * @method componentWillUpdate
   *
   * @param {void} void
   *
   * @returns {void}
   */
  componentWillUpdate() {
    $('select').material_select();
  }

  /**
   * Handle submit
   *
   * @method onSubmit
   *
   * @param {object} values
   *
   * @returns {void}
   */
  onSubmit = (values) => {
    const category = this.state.selectedCategory;
    this.setState({ isLoading: true });
    this.props.createPost(category, values, () => {
      resetPage();
      this.setState({ isLoading: false });
      this.props.history.push('/');
    });
  }

  /**
   * Handle category selection
   *
   * @method handleCategory
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleCategory = (event) => {
    this.setState({
      selectedCategory: event.target.value
    });
  }

  /**
   * @method renderInput
   *
   * @param {object} field
   *
   * @returns {JSX} JSX
   */
  renderInput = (field) => {
    const { label, input, meta, type, className, placeholder } = field;
    return (
      <div className="row">
        <div className="input-field col-s12 l12 m12">
          <input
            type={type}
            placeholder={placeholder}
            {...input}
            className={className}
          />
          <label htmlFor className="active">{label}</label>
        </div>
        <div className="red-text right">
          {meta.touched ? meta.error : ''}
        </div>
      </div>
    );
  }

  /**
   * @method renderTextArea
   *
   * @param {object} field
   *
   * @returns {JSX} JSX
   */
  renderTextArea = (field) => {
    const { label, input, meta, type, className, placeholder } = field;
    return (
      <div className="row">
        <div className="input-field col-s12 l12 m12">
          <textarea
            placeholder={placeholder}
            type={type}
            {...input}
            className={className}
          />
          <label htmlFor className="active">{label}</label>
        </div>
        <div className="red-text right">
          {meta.touched ? meta.error : ''}
        </div>
      </div>
    );
  }

  /**
   * @method renderCategory
   *
   * @param {object} field
   *
   * @returns {JSX} JSX
   */
  renderCategory = (field) => {
    const { value, ref } = field;
    return (
      <div className="row">
        <div className="input-field col-s12 l12 m12">
          <select
            ref={ref}
            value={value}
          >
            <option value="others">Select Category</option>
            {categories
              .map(
                category => (<option value={category} key={category}>
                  {pascalCase(category)}
                </option>)
              )
            }
          </select>
        </div>
      </div>
    );
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    const { handleSubmit, invalid } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="container">
        <div className="row">
          { isLoading ?
            <Loader /> :
            <form
              className="col l8 m8 s12 offset-m2 offset-l2"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <Field
                type="text"
                className=""
                placeholder="Enter recipe name"
                label="Recipe Name"
                name="recipeName"
                component={this.renderInput}
              />

              <Field
                name="category"
                ref={(ref) => { this.category = ref; }}
                value={this.state.selectedCategory}
                component={this.renderCategory}
              />

              <Field
                type="text"
                placeholder="Markdown supported"
                className="materialize-textarea"
                label="Ingredients"
                name="ingredients"
                component={this.renderTextArea}
              />

              <Field
                type="text"
                placeholder="Markdown supported"
                className="materialize-textarea"
                label="Intsructions"
                name="instructions"
                component={this.renderTextArea}
              />
              <div>
                <Field
                  name="image"
                  component={FileUpload}
                />
              </div>

              <span className="right">
                <button
                  style={{ marginLeft: 20 }}
                  disabled={invalid}
                  type="submit"
                  className="btn"
                >
                Post
                </button>
              </span>
              <Link to="/" className="right">
                <button className="btn red">Cancel</button>
              </Link>
            </form>}
        </div>
      </div>

    );
  }
}

PostRecipe.defaultProps = {
  values: {},
  errors: {}
};

PostRecipe.propTypes = {
  createPost: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    recipeName: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string
  }),
  values: PropTypes.shape({
    ingredients: PropTypes.string,
    instructions: PropTypes.string
  }),
};

const mapStateToProps = ({ form }) => ({
  values: form.PostRecipeForm.values,
  errors: form.PostRecipeForm.syncErrors
});

export default reduxForm({
  validate,
  form: 'PostRecipeForm'
})(connect(mapStateToProps, { createPost })(PostRecipe));
