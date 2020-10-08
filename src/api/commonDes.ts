import { getApi, postApi } from '@/api';

export function getCommonDesDetail(tag: string) {
  return getApi('/api/commonDesDetail', { tag });
}
const commonDesApiUrl = '/api/commonDes';
export function addCommonDes(description: string) {
  return postApi(commonDesApiUrl, {
    description
  });
}

export function getCommonDesList({
  size,
  page
}: {
  size: number;
  page: number;
}) {
  return getApi(commonDesApiUrl, {
    page,
    size
  });
}
