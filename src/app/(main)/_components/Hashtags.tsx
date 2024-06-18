import { useState, useEffect, useCallback } from 'react';

import { getChannelBgColor, getChannelFontColor } from '@/utils/getChannelColorClassName';

interface HashtagsProps {
  hashtage: string;
  color: string;
}

const Hashtags = ({ hashtage, color }: HashtagsProps) => {
  const fontColor = getChannelFontColor(color);
  const bgColor = getChannelBgColor(color);

  const hashtagArray = hashtage.split(',').map((tag) => `#${tag.trim()}`);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const restHashtagCount = hashtagArray.length - visibleIndex;

  const getVisibleTag = useCallback(() => {
    if (hashtagArray.length <= 1) {
      setVisibleIndex(hashtagArray.length);
    } else {
      let maxWidth = 0;
      let totalWidth = 0;

      if (windowWidth >= 1200) {
        maxWidth = 180;
        // maxWidth = 155;
      } else if (windowWidth >= 744) {
        maxWidth = 240;
        // maxWidth = 215;
      } else if (windowWidth >= 375) {
        maxWidth = 283;
        // maxWidth = 258;
      }

      for (let i = 0; i < hashtagArray.length; i++) {
        const width = (hashtagArray[i].length - 1) * 12 + 9 + 5; // 전체 글자수 -1(#) * 글자당 12 + # 9 + gap 5
        totalWidth += width;

        if (totalWidth > maxWidth) return;
        setVisibleIndex(i + 1);
      }
    }
  }, [hashtagArray, windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    getVisibleTag();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth, hashtagArray, getVisibleTag]);

  return (
    <div className="flex h-[21px] w-fit gap-x-[5px]">
      {hashtagArray.map((tag, index) => {
        if (index < visibleIndex)
          return (
            <span key={index} className={`${fontColor} shrink-0 small-regular`}>
              {tag}
            </span>
          );
      })}
      {restHashtagCount !== 0 && (
        <div
          className={`flex size-[20px] items-center justify-center rounded-full text-neutral-600 micro-medium ${bgColor} shrink-0`}
        >
          +{restHashtagCount}
        </div>
      )}
    </div>
  );
};

export default Hashtags;
