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

export default function BooksList({ videos }: VideosListProps) {

  return (
    <div className="mx-auto mt-8">
      {videos.map((video) => (
        <div className="container relative justify-center items-center mb-8 my-4 mx-2 border-[1px] p-2 rounded border-[#2e8555]">
          <div>
            <div className='justify-left items-start text-xs'>
              {video.date}
            </div>
            <h3 className="justify-center items-center text-base text-white mb-2">
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
          <div className="flex-none overflow-y-scroll rounded-sm mx-auto text-sm text-gray-400 p-2 pr-8 mt-2">
            <p>{video.time} - {video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};