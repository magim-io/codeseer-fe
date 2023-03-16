export interface ITeam {
  id: string;
  teamId: string;
  organizationId: string;
  createdAt?: string;
  updatedAt?: string;
  team: {
    id: string;
    login: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface ICreateTeam {
  orgId: string;
  payload: {
    login: string;
    name: string;
  };
}

export interface IJoinTeam {
  orgId: string;
  teamId: string;
}
