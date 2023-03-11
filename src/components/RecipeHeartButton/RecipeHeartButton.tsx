import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import './RecipeHeartButton.css';
import useUser from '../../hooks/useUser';

interface Props {
  recipeId: number;
  isFavorite: boolean;
}

function RecipeHeartButton({ recipeId, isFavorite }: Props) {
  const { user, mutationAddFavorite, mutationRemoveFavorite } = useUser();

  const handleFavoriteClick = async () => {
    if (user) {
      if (isFavorite) {
        await mutationRemoveFavorite.mutateAsync(recipeId);
      } else {
        await mutationAddFavorite.mutateAsync(recipeId);
      }
    }
  };

  if (!user) return null;

  return (
    <IconButton
      className="recipe-heart-button"
      icon={isFavorite ? <HiHeart color="teal" size={20} /> : <HiOutlineHeart color="teal" size={20} />}
      aria-label="favorite"
      onClick={(event) => {
        event.preventDefault();
        handleFavoriteClick();
      }}
      size="md"
      colorScheme="transparent"
    />
  );
}

export default RecipeHeartButton;
