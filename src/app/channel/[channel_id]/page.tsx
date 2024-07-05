import { Button } from '@/components/ui/button';
import { getChannelDetail } from '@/services/channel';
import { Settings, Share2 } from 'lucide-react';
import Image from 'next/image';

import Chatting from '../_components/chatting';
import Player from '../_components/player';
import Playlist from '../_components/playlist';

interface Props {
  params: { channel_id: string };
}

const page = async ({ params }: Props) => {
  const { channel, owner } = await getChannelDetail(params.channel_id);

  return (
    <div className="flex size-full flex-col justify-between desktop:flex-row ">
      {/** 플레이어 */}
      <section className="mt-10 w-full desktop:order-2">
        <Player channelId={params.channel_id} />

        {/** 채널 정보 */}
        <div className="mt-4 flex flex-col justify-between tablet:flex-row desktop:order-2">
          <div className="flex flex-col gap-2">
            <h2 className="base-bold tablet:medium-bold desktop:large-bold">{channel.name}</h2>
            <div className="flex items-center">
              <Image
                className="aspect-square rounded-full object-cover"
                src={owner.profile_image || '/default-profile-image.png'}
                width={36}
                height={36}
                alt="profile"
              />
              <p className="ml-2.5 text-neutral-100 small-medium">{owner.nickname}</p>
            </div>

            {/** 해시태그 */}
            <div className="flex gap-2">
              {channel.hashtag.split(',').map((tag, index) => (
                <div
                  key={tag + index}
                  className="small-regular"
                  style={{ color: channel.channel_color ? channel.channel_color : '#00FFFF' }}
                >{`#${tag}`}</div>
              ))}
            </div>
          </div>

          {/** 설정 및 링크 공유 */}
          <div className="mt-2 flex gap-2 tablet:mt-0">
            <Button className="rounded-full bg-neutral-500" size="icon">
              <Share2 />
            </Button>
            <Button className="rounded-full bg-neutral-500" size="icon">
              <Settings />
            </Button>
          </div>
        </div>
      </section>

      {/** 채팅 */}
      <Chatting channelId={params.channel_id} />

      {/** 플레이리스트 */}
      <Playlist channelId={params.channel_id} />
    </div>
  );
};

export default page;
