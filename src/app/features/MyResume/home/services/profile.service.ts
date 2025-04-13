import { inject, Injectable, Signal } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Profile } from '../components/profile/interfaces/profile';
import { ProfileContract } from '../components/profile/contracts/profile-contract';
import { HttpService } from '@core/services/http/http.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { StateService } from '@core/services/state/state.service';
import { UserPersonalData } from '../components/cover/interfaces/user-personal-data';
import { SocialNetworkTypes } from '@core/constants/social-network-def';
import { UserSocialNetwork } from '../components/cover/interfaces/user-social-network';
import { ConfigService } from '@core/services/config/config.service';
import { Config } from '@core/services/config/interfaces/config';
import { UrlBuilderService } from '@core/services/url-builder/url-builder.service';
import { PortFolio } from '../components/profile/components/portfolio/interfaces/portfolio';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly config: Config = inject(ConfigService).getConfig();
  private readonly http = inject(HttpService);
  private readonly stateService = inject(StateService);
  private readonly urlBuilder = inject(UrlBuilderService);

  profile$: Signal<Profile | undefined> = toSignal(this.loadProfile(this.stateService.userName()));

  private loadProfile(userName: string): Observable<Profile> {
    const queryParams = { name: userName };
    const url = this.urlBuilder.buildUrl(this.config.apiUrl, 'v1/profile', queryParams);

    return this.http.get<ProfileContract>(url.toString()).pipe(
      map(this.transformData.bind(this)),
      catchError((error) => {
        console.error(error);
        return EMPTY;
      })
    );
  }

  transformData(data: ProfileContract): Profile {
    const personalData: UserPersonalData = this.transformPersonaData(data);
    const defaultPortfolio: PortFolio = {
      gallery: []
    };

    return {
      personalData: personalData,
      about: data.about,
      service: data.service,
      birthday: data.birthday,
      contact: data.contact,
      facts: data.facts,
      portfolio: data.portfolio ?? defaultPortfolio,
      skillSet: data.skillSet,
      summary: data.summary,
      testimonials: data.testimonials,
    };
  }

  transformPersonaData(data: ProfileContract): UserPersonalData {
    const networks = data.personalData?.socialNetworks ?? [];
    const socialNetworks: UserSocialNetwork[] = networks.reduce((accumulator, network) => {
        const validNetwork = SocialNetworkTypes[network.name as keyof typeof SocialNetworkTypes];
        if (validNetwork) {
          accumulator.push({
            type: validNetwork,
            url: network.url,
          });
        } else {
          console.warn(`Unexpected social network name: ${network.name}`);
        }
        return accumulator;
      }, [] as UserSocialNetwork[]);

    const fullName = [data.firstName, data.middleName, data.lastName, data.secondLastName]
      .filter(Boolean)
      .join(' ');

    return {
      name: fullName,
      professions: data.personalData?.professions ?? [],
      socialNetworks: socialNetworks
    };
  }
}
