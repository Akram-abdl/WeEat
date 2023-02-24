import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import UserService from '../../services/UserService';
import { auth } from '../../utils/firebaseSetup';
import './RecipeHeartButton.css';

interface Props {
  userId: string;
  recipeId: number;
  isFavorite: boolean;
}

function RecipeHeartButton({ userId, recipeId, isFavorite }: Props) {
  const { currentUser } = auth;

  const queryClient = useQueryClient();

  const mutateAddFavorite = useMutation(() => UserService.addFavorite(userId, recipeId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites-search']);
    },
  });

  const mutateRemoveFavorite = useMutation(() => UserService.removeFavorite(userId, recipeId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites-search']);
    },
  });

  const handleFavoriteClick = async () => {
    if (currentUser) {
      if (isFavorite) {
        await mutateRemoveFavorite.mutateAsync();
      } else {
        await mutateAddFavorite.mutateAsync();
      }
    }
  };

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
