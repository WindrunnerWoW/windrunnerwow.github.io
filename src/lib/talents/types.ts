export type RankValues = string[];

export type Talent = {
  i: number;
  icon: string;
  name: string;
  ranks: number;
  requires: number | null;
  reqRanks: number | null;
  description: string;
  values: RankValues[];
};

export type TalentTree = {
  name: string;
  icon: string;
  maxPoints: number;
  talents: Talent[];
};

export type TalentClass = {
  slug: string;
  name: string;
  trees: TalentTree[];
};

export type ClassInfo = {
  slug: string;
  name: string;
  color: string;
};
