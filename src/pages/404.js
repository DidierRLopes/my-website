import React from 'react';

function NotFound() {
  return (
    <div className="relative pt-20 rounded-[14px] shadow-md text-white">
      <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center md:mt-16">
        <h1 className="_h1 !mb-2">
          PAGE NOT FOUND
        </h1>
        <div className="_subtitle text-lg">
          <span>
            Sorry about that. In order to make up for it, here&apos;s Summer and Morty looking cute.
          </span>
        </div>
      </div>
      <div className="border-gray-200 px-2 sm:px-4 py-2.5 rounded text-white border-spacing-3 mb-32">
        <figure className="center content-center text-white mx-auto align-center justify-between">
          <img
            className="rounded-3xl mx-auto"
            src="img/dogs.webp"
            width="500"
            alt="Morty and Summer - Didi and Meg doggos"
          />
        </figure>
      </div>
    </div>
  );
}

export default NotFound;