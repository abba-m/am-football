export interface TeamAttr {
  coach: string;
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  logo: string;
  name: string;
  stadium: string;
  updated: string;
}

export interface LeagueAttr {
  id?: string;
  title?: string;
  season?: string;
  expand?: {
    teams?: TeamAttr[];
  };
  created?: string;
  updated?: string;
}

export interface FixtureAttr {
  id?: string;
  leagueId?: string;
  home?: string;
  away?: string;
  expand?: { league: LeagueAttr; home?: TeamAttr; away?: TeamAttr };
  schedule?: string;
  stage?: string;
  created?: string;
  updated?: string;
}

export interface MatchResultAttr {
  id?: string;
  home?: number;
  away?: number;
  fixtureId?: string;
  expand?: { fixtureId: FixtureAttr };
}

export interface StandingsAttr {
  id?: string;
  leagueId?: string;
  team?: string;
  teamName?: string;
  totalWins?: number;
  matchesPlayed?: number;
  points?: number;
  win?: number;
  draw?: number;
  lose?: number;
}
