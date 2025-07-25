import { inject, Injectable, signal } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Profile } from '../my-resume/components/profile/interfaces/profile';
import { ProfileContract } from '../my-resume/components/profile/contracts/profile-contract';
import { HttpService } from '@core/services/http/http.service';
import { StateService } from '@core/services/state/state.service';
import { UserPersonalData } from '../my-resume/components/cover/interfaces/user-personal-data';
import { SocialNetworkTypes } from '@core/constants/social-network-def';
import { UserSocialNetwork } from '../my-resume/components/cover/interfaces/user-social-network';
import { ConfigService } from '@core/services/config/config.service';
import { Config } from '@core/services/config/interfaces/config';
import { UrlBuilderService } from '@core/services/url-builder/url-builder.service';
import { UserPersonalDataContract } from '../my-resume/components/cover/contracts/user-personal-data-contract';
import { SocialNetworkInfo } from '@core/interfaces/social-network-info';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly config: Config = inject(ConfigService).getConfig();
  private readonly http = inject(HttpService);
  private readonly stateService = inject(StateService);
  private readonly urlBuilder = inject(UrlBuilderService);
  private readonly _profileData = signal<Profile | undefined>(undefined);

  readonly profile$ = this._profileData.asReadonly();

  loadProfileBySlug(slug: string): void {
    if (!slug) {
      return;
    }

    this.loadProfile(slug).subscribe({
      next: (profileData) => {
        this._profileData.set(profileData);
      },
      error: (err) => {
        console.error('Error al cargar el perfil:', err);
        this._profileData.set(undefined);
      }
    });
  }

  transformData(data: ProfileContract): Profile {
    const personalData: UserPersonalData = this.transformPersonaData(data.personalData);
    return {
      personalData: personalData,
      about: data.about,
      service: data.service,
      birthday: data.birthday,
      contact: data.contact,
      project: data.project,
      skillSet: data.skillSet,
      summary: data.summary,
      testimonials: data.testimonials,
    };
  }

  transformPersonaData(data: UserPersonalDataContract): UserPersonalData {
    return {
      name: data.name,
      professions: data.professions,
      socialNetworks: data.socialNetworks.reduce((accumulator, network) => {
        const validNetwork: SocialNetworkInfo = {
          name: network.type,
          icon:
            network.iconClass ??
            network.iconUrl ??
            SocialNetworkTypes[network.type as keyof typeof SocialNetworkTypes]?.icon ??
            '',
        };
        if (validNetwork) {
          accumulator.push({
            type: validNetwork,
            url: network.value,
          });
        } else {
          console.warn(`Unexpected social network name: ${network.type}`);
        }
        return accumulator;
      }, [] as UserSocialNetwork[]),
    };
  }

  private loadProfile(slug: string): Observable<Profile> {
    const queryParams = { profileSlug: slug };
    let url: string;

    if (this.config.useAPI) {
      url = this.urlBuilder.buildUrl(this.config.apiUrl, 'v1/profile', queryParams);
    } else {
      url = `stubs/data.${slug || 'john'}.json`;
    }

    return this.http.get<ProfileContract>(url).pipe(
      map(this.transformData.bind(this)),
      catchError((error) => {
        console.error(error);
        return EMPTY;
      })
    );
  }
}
