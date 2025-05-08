export interface ResumeCreateCommand {
  ResumeQueryData: ResumeFormData;
}
export interface ResumeFormData {
  profileId: string;
  jobTitle: string;
  about: string;
  summary: string;
  overview: string;
  title: string;
  suffix: string;
  address: string;
}
