import React from 'react';

interface Video {
  date: string;
  title: string;
  embed: string;
  description: string;
  time: string;
  image: string;
  info: string;
  location: string;
}

interface VideosListProps {
  videos: Video[];
}

export default function VideosList({ videos }: VideosListProps) {
  return (
    <div className="mx-auto mt-8">
      {videos.map((video, index) => (
        <div key={index} className="mission-container">
          <div className="mission-description">
            <div className='flex justify-between mb-2'>
              <div className='text-xs'>
                {video.date}
              </div>
              <div className='text-xs'>
                {video.location}
              </div>
            </div>
            <div className="font-bold text-base mb-4">
              {video.title}
            </div>
            {video.embed && (
              <>
                <div className="flex place-items-center justify-center items-center rounded-sm mx-auto mb-4">
                  <iframe
                    src={video.embed}
                    width="512"
                    height="256"
                    title={video.title}
                  />
                </div>
                <div className="text-sm mb-4">
                  <p><strong>{video.time}</strong> - {video.description}</p>
                </div>
              </>
            )}
            {video.image && (
              <>
                <div className="flex place-items-center justify-center items-center rounded-sm mx-auto mb-4">
                  <img
                    src={video.image}
                    width="512"
                    height="256"
                  />
                </div>
                <div className="text-sm mb-4">
                  <p>{video.description}</p>
                </div>
              </>
            )}
            {video.info && (
              <div className="text-sm mb-4">
                <p dangerouslySetInnerHTML={{ __html: video.info }} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};