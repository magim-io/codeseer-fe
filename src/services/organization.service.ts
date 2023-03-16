import { AxiosResponse } from "axios";

import {
  ICreateOrganization,
  IInviteMemberToOrg,
  IJoinOrg,
} from "../types/organization/organization";

import interceptor from "./interceptor";

class OrganizationService {
  static async retrieveOrganizations(): Promise<AxiosResponse> {
    const res = await interceptor.get("/organizations");

    return res;
  }

  static async retrieveAnOrganization(
    organizationId: string
  ): Promise<AxiosResponse> {
    const res = await interceptor.get(`/organizations/${organizationId}`);

    return res;
  }

  static async createNewOrganization({
    login,
    description,
    name,
  }: ICreateOrganization): Promise<AxiosResponse> {
    try {
      const res = await interceptor.post("/organizations", {
        login,
        description,
        name,
      });
      return res;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  static async deleteAnOrganization(
    organizationId: string
  ): Promise<AxiosResponse> {
    const res = await interceptor.delete(`/organizations/${organizationId}`);

    return res;
  }

  static async inviteMemberToOrganization({
    organizationId,
    memberEmail,
  }: IInviteMemberToOrg): Promise<AxiosResponse> {
    const res = await interceptor.post(`/organizations/members/invite`, {
      organiztionId: organizationId,
      memberEmail,
    });

    return res;
  }

  static async joinOrganization({
    invitationId,
    orgId,
  }: IJoinOrg): Promise<AxiosResponse> {
    const res = await interceptor.get(`/organizations/members/invite`, {
      params: {
        inv: invitationId,
        org: orgId,
      },
    });

    return res;
  }
}

export default OrganizationService;
