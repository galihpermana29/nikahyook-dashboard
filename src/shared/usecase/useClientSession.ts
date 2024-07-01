import type { ISessionData } from '../models/userServicesInterface';

export default function useClientSession() {
  const userDetail = localStorage ? localStorage.getItem('admin') : null;

  const parsedUserDetail = userDetail
    ? (JSON.parse(userDetail) as ISessionData)
    : undefined;

  return parsedUserDetail;
}
