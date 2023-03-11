import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UserService from '../services/UserService';
import { auth } from '../utils/firebaseSetup';

const useUser = () => {
  const queryClient = useQueryClient();

  const user = auth.currentUser;

  const {
    isLoading: isLoadingUserDetails, data: userDetails,
  } = useQuery(['get-user', user?.uid], () => user && UserService.getUser(user.uid), {
    enabled: !!user,
  });

  const {
    isLoading: isLoadingFavorites, data: favorites, refetch: refetchFavorites,
  } = useQuery(['get-user-favorites', user?.uid], () => user && UserService.getFavorites(user.uid));

  const mutationAddFavorite = useMutation((recipeId: number) => UserService.addFavorite(user?.uid || '', recipeId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-user-favorites', user?.uid]);
    },
  });

  const mutationRemoveFavorite = useMutation((recipeId: number) => UserService.removeFavorite(user?.uid || '', recipeId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-user-favorites', user?.uid]);
    },
  });

  return {
    user, isLoadingUserDetails, userDetails, isLoadingFavorites, favorites, refetchFavorites, mutationAddFavorite, mutationRemoveFavorite,
  };
};

export default useUser;
