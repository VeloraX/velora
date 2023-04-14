import React from 'react';
import { IconBrandFacebook } from '@tabler/icons-react';

const IconTest = () => {
  const pageUrl = 'http://localhost:3000/blog/agi-hype-fading-artificial-general-intelligence-analysisi-ai-winter';
  const title = 'AGI Hype Fading: Artificial General Intelligence Analysis & AI Winter';

  const handleClick = () => {
    const shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <h1>Icon Test</h1>
      <div
        class="tw-bg-blue-500 tw-p-2 tw-font-semibold tw-text-white tw-inline-flex tw-items-center tw-space-x-2 tw-rounded tw-cursor-pointer"
        onClick={handleClick}
      >
        <IconBrandFacebook size={18} />
      </div>
    </div>
  );
};

export default IconTest;
