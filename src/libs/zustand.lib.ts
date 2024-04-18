import {TAnime} from '@components/Shared/AnimeCard';
import {create} from 'zustand';

type AnimeStore = {
  lovedAnimes: TAnime[];
  love: (datas: TAnime[]) => void;
  unlove: (id: string) => void;
};

export const useAnimeStore = create<AnimeStore>(set => ({
  lovedAnimes: [],
  love: (datas: TAnime[]) => {
    set(state => ({lovedAnimes: datas}));
  },
  unlove: id => {
    set(state => ({
      lovedAnimes: state.lovedAnimes.filter(data => data.mal_id != id),
    }));
  },
}));
