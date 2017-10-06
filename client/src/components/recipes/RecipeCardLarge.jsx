import React, { Component } from 'react';
import { RecipeCard } from './Index';

class RecipeCardLarge extends Component {
  render() {
    return (
      <div className="col l6 m8 s12 offset-m2">
        <div className="card views">
          <RecipeCard />
        </div>
      </div>
    );
  }
}

export default RecipeCardLarge;