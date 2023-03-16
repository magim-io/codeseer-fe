import { AxiosResponse } from "axios";

import { ICreateTeam, IJoinTeam } from "../types/team/team.interface";

import interceptor from "./interceptor";

class TeamService {
  static async retrieveTeams(): Promise<AxiosResponse> {
    const res = await interceptor.get("/teams");

    return res;
  }

  static async createNewTeam({
    orgId,
    payload,
  }: ICreateTeam): Promise<AxiosResponse> {
    const res = await interceptor.post("/teams", {
      organizationId: orgId,
      payload,
    });

    return res;
  }

  static async joinTeam({ teamId, orgId }: IJoinTeam): Promise<AxiosResponse> {
    const res = await interceptor.post(
      `/teams/members/join?team=${teamId}&org=${orgId}`
    );

    return res;
  }
}

export default TeamService;
