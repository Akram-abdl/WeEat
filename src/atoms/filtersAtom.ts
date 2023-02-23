import { atom } from 'recoil';

const filterIngredientsAtom = atom<string[]>({
  key: 'filterAtom',
  default: [],
});

export default filterIngredientsAtom;
