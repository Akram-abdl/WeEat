import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import { User } from '../../interfaces/User';

function Home() {
  const user: User = {
    intolerances: [],
    isVegan: false,
    isVegetarian: false,
    favorites: [
      715497, 766453, 795751,
    ],
  };

  return (
    <div>
      <h1>Nos sélections</h1>
      <Carousel />
      <h1>Vos favoris</h1>
      <h1>Choix selon vos goûts</h1>
    </div>
  );
}

export default Home;
