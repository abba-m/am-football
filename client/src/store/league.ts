import { create } from 'zustand';
import { LeagueAttr } from '../interfaces';

interface LeagueState {
  leagues: LeagueAttr[];
  currentLeague: LeagueAttr;
  setCurrentLeague: (league: LeagueAttr) => void;
  setLeagues: (leagues: LeagueAttr[]) => void;
  addLeague: (league: LeagueAttr) => void;
  removeLeague: (id: string) => void;
  clearLeagues: () => void;
}

export const useLeagueStore = create<LeagueState>((set) => ({
  leagues: [],
  currentLeague: {},
  setCurrentLeague: (currentLeague) => set({ currentLeague }),
  setLeagues: (leagues) => set({ leagues }),
  addLeague: (league) => set((state) => ({ leagues: [...state.leagues, league] })),
  removeLeague: (id) => set((state) => ({ leagues: state.leagues.filter((l) => l.id !== id) })),
  clearLeagues: () => set({ leagues: [] }, true),
}));
