import { atom } from 'recoil';

const searchRecipesAtom = atom({
  key: 'searchRecipesAtom',
  default: '',
});

export default searchRecipesAtom;
