import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ava from "../../assets/images/avatar.png";
import team from "../../assets/images/SL_060521_43530_01.jpg";
import map from "../../assets/images/temp-map.png";
import { Sidebar } from "../../components";
import DomainService from "../../services/domain.service";
import OrganizationService from "../../services/organization.service";
import TeamService from "../../services/team.service";
import { IDomain } from "../../types/domain/domain.interface";
import { IOrganization } from "../../types/organization/organization";
import { ITeam } from "../../types/team/team.interface";

function Organization() {
  const { organizationId } = useParams();
  const [organization, setOrganization] = useState<IOrganization>();
  const [domains, setDomains] = useState<IDomain[]>([]);
  const [teams, setTeams] = useState<ITeam[]>([]);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const res = await OrganizationService.retrieveAnOrganization(
          organizationId as string
        );
        if (res.data.success) {
          console.log(res);
          setOrganization(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDomais = async () => {
      try {
        const res = await DomainService.retrieveDomains();
        if (res.data.success) {
          console.log(res);
          setDomains(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTeams = async () => {
      try {
        const res = await TeamService.retrieveTeams();
        if (res.data.success) {
          console.log(res);
          setTeams(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrganization();
    fetchDomais();
    fetchTeams();
  }, [organizationId]);

  if (!organization || !teams || !domains) {
    return <div />;
  }

  return (
    <div className="w-full flex h-full">
      <Sidebar
        data={organization as IOrganization}
        teams={teams}
        domains={domains}
      />
      <section className="organiztion__wrapper flex-grow flex bg-[#f5f5f5]">
        <div className="w-full flex flex-col gap-6 px-6 py-9 pb-32">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-3xl">Recently visited:</h1>
            <ul className="flex gap-4">
              <li>
                <img
                  alt="map"
                  src={map}
                  className="w-full h-auto max-h-[140px]"
                />
              </li>
              <li>
                <img
                  alt="map"
                  src={map}
                  className="w-full h-auto max-h-[140px]"
                />
              </li>
            </ul>
          </div>

          <h1 className="w-full font-semibold text-3xl border-b-2 border-primary_gray pb-4">
            Latest changes
          </h1>

          <ul className="flex flex-col gap-5">
            {new Array(5).fill("").map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li className="flex flex-col gap-3" key={item + index}>
                <div className="flex gap-2 items-center">
                  <img
                    alt="team"
                    src={team}
                    className="h-8 w-8 object-cover rounded-full"
                  />
                  <span>
                    NewYork pushed to Battle Maids’ Domain/Dependency Map
                  </span>
                </div>
                <div className="w-full rounded-lg px-3 py-3 flex flex-col gap-2 bg-white shadow-md">
                  <div>
                    1 commit to{" "}
                    <span className="text-light_hue_blue">main</span>
                  </div>
                  <div>
                    NewYork Install the Magim bot to the codeflow. Leadrn more
                    at{" "}
                    <span className="text-light_hue_blue">
                      https:/codeseer.io
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-[400px] flex flex-col px-3 py-9 gap-8">
          <div className="w-full flex justify-between text-2xl font-semibold">
            People
          </div>

          <ul className="flex flex-col gap-4">
            {new Array(3).fill("").map(() => (
              <li className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <img
                    src={ava}
                    alt="ava"
                    className="w-7 h-7 object-cover rounded-full border border-primary_text"
                  />
                  <div className="flex flex-col justify-between font-medium">
                    <h4>Nguyen Kien</h4>
                    <h5>@ngkien299</h5>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-4 py-1 border-2 border-drark_blue text-drark_blue font-semibold text-center rounded-full hover:bg-drark_blue hover:text-white transition-all duration-200"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Organization;
