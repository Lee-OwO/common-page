import { getApi } from '@/api';

export function getCommonDesDetail(id: string) {
  return getApi('/api/commonDesDetail', { id });
}
