import { DOMAIN } from '@/constants/domains';
import { fetcher } from '@/lib/fetcher';
import { getSession } from 'next-auth/react';

import {
  CreateChannelReq,
  CreateChannelResponse,
  GetChannelDetailResponse,
  GetChannelSearchResponse,
} from './type';
import revalidate from '../revalidate';

/** 채널 생성 */
export const createChannel = async (params: CreateChannelReq) => {
  const session = await getSession();
  const data = await fetcher.post<CreateChannelResponse>(`${DOMAIN.CHANNEL}`, params, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });
  await revalidate('channel');

  return data;
};

/** 채널 검색 - 채널명, 해시태그 */
export const getSearchChannelList = async (params: {
  cursor?: number;
  perPage?: number;
  keyword?: string;
}) => {
  const { cursor = 1, perPage = 12, keyword } = params;

  const data = await fetcher.get<GetChannelSearchResponse>(
    `${DOMAIN.CHANNEL}/search`,
    {
      cursor,
      perPage,
      keyword,
    },
    { next: { tags: ['channel'] } },
  );

  return data;
};

/** 채널 상세 정보 조회 */
export const getChannelDetail = async (channelId: string) => {
  const data = await fetcher.get<GetChannelDetailResponse>(`${DOMAIN.CHANNEL}/${channelId}`);
  return data;
};

/** 채널 수정 */
export const editChannel = async (channelId: string, params: CreateChannelReq) => {
  const session = await getSession();
  const data = await fetcher.put(`${DOMAIN.CHANNEL}/${channelId}`, params, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });
  return data;
};

/** 채널 삭제 */
export const deleteChannel = async (channelId: string) => {
  const session = await getSession();
  const data = await fetcher.delete(`${DOMAIN.CHANNEL}/${channelId}`, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });
  return data;
};
