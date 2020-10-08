import { getApi } from '@/api';

export function getCommonDesDetail(tag: string) {
  return getApi('/api/commonDesDetail', { tag });
}
