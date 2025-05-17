import { TestBed } from '@angular/core/testing';
import { CommandAdapter } from './command.adapter';
import { ProfileCommandModel } from '../../components/register/models/profileCommand.model';
import { ProfileDataModel } from '../../components/register/models/ProfileData.model';
import { expectTypeOf } from 'expect-type';

const profileData: ProfileDataModel = {
  firstName: 'John',
  lastName: 'Doe',
  profileImageUrl: 'http://example.com/image.png',
  birthDate: '1990-01-01',
  middleName: 'Michael',
  secondLastName: 'Smith',
};

interface ProfileDataWithId extends ProfileDataModel {
  profileId: string;
}

interface TestModel extends ProfileCommandModel {
  profileData: ProfileDataWithId;
}

interface CustomData {
  key_01: string;
  key_02: string;
  key_03: string;
}

interface CustomTransformedData {
  profileData: CustomData;
}

describe('CommandAdapterShould', () => {
  let commandAdapter: CommandAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandAdapter],
    });
    commandAdapter = TestBed.inject(CommandAdapter);
  });

  it('transform data correctly', () => {
    const result = commandAdapter.transform<ProfileDataModel, ProfileCommandModel>(
      profileData,
      'profileData'
    );

    expectTypeOf(result).toEqualTypeOf<ProfileCommandModel>();
    const expectedResult: ProfileCommandModel = {
      profileData: {
        ...profileData,
      },
    };

    expect(result).toEqual(expectedResult);
  });

  it('transform resume data correctly and include additionalFields', () => {
    const profileId = 'profile123';

    const result = commandAdapter.transform<ProfileDataModel, ProfileCommandModel>(
      profileData,
      'profileData',
      { profileId } as Partial<ProfileDataModel>
    );

    const expectedResult: TestModel = {
      profileData: {
        ...profileData,
        profileId,
      },
    };

    expectTypeOf(result).toEqualTypeOf<ProfileCommandModel>();
    expect(result).toEqual(expectedResult);
  });

  it('transform data correctly with custom transform function', () => {
    const customTransformMethod = (data: ProfileDataModel): CustomData => {
      return {
        key_01: data.firstName,
        key_02: data.lastName,
        key_03: data.profileImageUrl,
      };
    };

    const expectedResult = {
      profileData: {
        key_01: profileData.firstName,
        key_02: profileData.lastName,
        key_03: profileData.profileImageUrl,
      },
    };

    const result = commandAdapter.transform<ProfileDataModel, CustomTransformedData>(
      profileData,
      'profileData',
      {},
      customTransformMethod
    );

    expect(result).toEqual(expectedResult);
  });
});
