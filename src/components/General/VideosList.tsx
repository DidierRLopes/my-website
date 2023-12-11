import React from 'react';

interface Video {
  date: string;
  title: string;
  embed: string;
  description: string;
  time: string;
}

interface VideosListProps {
  videos: Video[];
}

export default function VideosList({ videos }: VideosListProps) {
  return (
    <div className="mx-auto mt-8">
      {videos.map((video) => (
        <div className="container relative justify-center items-center mb-8 my-4 mx-2 border-[1px] p-2 rounded border-[#0088CC]">
          <div>
            <div className='justify-left items-start text-xs'>
              {video.date}
            </div>
            <h3 className="justify-center font-bold items-center text-base mb-2">
              {video.title}
            </h3>
          </div>
          <div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
            <iframe
              src={video.embed}
              width="512"
              height="256"
              title={video.title}
            />
          </div>
          <div className="flex-none overflow-y-scroll rounded-sm mx-auto text-sm p-2 pr-8 mt-2">
            <p><strong>{video.time}</strong> - {video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};