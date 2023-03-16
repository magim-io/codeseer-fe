import { AxiosResponse } from "axios";

import { ICreateDomain, IRunWorkflow } from "../types/domain/domain.interface";

import interceptor from "./interceptor";

class DomainService {
  static async retrieveDomains(): Promise<AxiosResponse> {
    const res = await interceptor.get("/domains");

    return res;
  }

  static async retrieveMaps(domainId: string): Promise<AxiosResponse> {
    const res = await interceptor.get(`/domains/${domainId}/maps`);

    return res;
  }

  static async runWorkflow({
    owner,
    repository,
  }: IRunWorkflow): Promise<AxiosResponse> {
    const res = await interceptor.post("/domains/run-workflow", {
      owner,
      repository,
    });

    return res;
  }

  static async createNewDomain({
    teamId,
    payload,
  }: ICreateDomain): Promise<AxiosResponse> {
    const res = await interceptor.post("/domains", {
      teamId,
      payload,
    });

    return res;
  }
}

export default DomainService;
