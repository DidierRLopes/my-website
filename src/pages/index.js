import React from 'react';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout
      title="Homepage"
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center md:mt-16">
          <h1 className="_h1 !mb-2">
            Who am I?
          </h1>
          <div className="_subtitle text-lg">
            Co-founder & CEO at {" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://openbb.co/"
            >
              OpenBB
            </a>
          </div>
          <div className="flex items-center content-center mx-auto align-center justify-center flex-wrap mt-4 gap-8">
            <img
              className="rounded-3xl max-h-[300px] mx-auto"
              src="img/me_timegpt.webp"
              alt="Time-GPT event from Nixtla"
            />
            <img
              className="rounded-3xl max-h-[300px] mx-auto"
              src="img/tattoo.webp"
              alt="OpenBB Tattoo"
            />
          </div>
          <div className="flex-none overflow-y-scroll rounded-sm mx-auto text-base my-8">
            <p>
              Reach out, anytime.
            </p>
            <div className="flex mx-auto gap-8 grid-cols-2 justify-center">
              <div
                className='flex justify-center items-center mx-auto mt-4'
              >
                <a
                  href="https://twitter.com/didier_lopes"
                  target="_blank"
                  rel="noreferrer noopener"
                  className='!no-underline'
                >
                  <div className="flex rounded-xl p-2 w-32 bg-[#2e8555] hover:bg-grey-200 hover:dark:bg-grey-200 hover:text-[#2e8555] hover:no-underline mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      stroke="currentColor"
                      fill="none"
                      strokeWidth={1.5}
                      viewBox="0 0 50 50"
                      className="mx-auto"
                    >
                      <path d="M11 4c-3.854 0-7 3.146-7 7v28c0 3.854 3.146 7 7 7h28c3.854 0 7-3.146 7-7V11c0-3.854-3.146-7-7-7H11zm0 2h28c2.774 0 5 2.226 5 5v28c0 2.774-2.226 5-5 5H11c-2.774 0-5-2.226-5-5V11c0-2.774 2.226-5 5-5zm2.086 7 9.223 13.104L13 37h2.5l7.938-9.293L29.977 37h7.937L27.79 22.613 36 13h-2.5l-6.84 8.01L21.023 13h-7.937zm3.828 2h3.065l14.107 20H31.02L16.914 15z" />
                    </svg>
                    <span className='ml-2 mx-auto'>
                      Twitter
                    </span>
                  </div>
                </a>
              </div>
              <div
                className='flex justify-center items-center mx-auto mt-4'
              >
                <a
                  href="https://www.linkedin.com/in/didier-lopes/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className='!no-underline'
                >
                  <div className="flex rounded-xl p-2 w-32 bg-[#2e8555] hover:bg-grey-200 hover:dark:bg-grey-200 hover:text-[#2e8555] hover:no-underline mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      fill="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 30 30"
                    >
                      <path d="M24 4H6a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM10.954 22h-2.95v-9.492h2.95V22zM9.449 11.151a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44zM22.004 22h-2.948v-4.616c0-1.101-.02-2.517-1.533-2.517-1.535 0-1.771 1.199-1.771 2.437V22h-2.948v-9.492h2.83v1.297h.04c.394-.746 1.356-1.533 2.791-1.533 2.987 0 3.539 1.966 3.539 4.522V22z" />
                    </svg>
                    <span className='ml-2 !no-underline mx-auto'>
                      LinkedIn
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center rounded-[14px]">
          <h1>
            Open source is the way.
          </h1>
          <div className="_subtitle text-lg">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/DidierRLopes"
              className="flex items-center justify-center"
            >
              Building an open-source legacy, one commit at a time.
            </a>
          </div>
          <div className="flex items-center justify-center border-blue-200">
            <iframe
              src="https://github-stats-alpha.vercel.app/api?username=DidierRLopes&cc=000&tc=fff&ic=fff&bc=fff"
              width="500"
              height="300"
              title="GitHub Stats"
            />
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center mb-16">
          <h1 className="_h1 !mb-2">
            Let's catch up
          </h1>
          <div className="flex-none overflow-y-scroll rounded-sm text-center mx-auto text-lg p-2 pr-8 mb-2">
            <span>
              I am available for 15 minutes calls as long as you set an agenda.
            </span>
            <p>
              (and it is not a sales call)
            </p>
          </div>
          <div
            className='flex justify-center items-center mx-auto mt-2'
          >
            <a
              href="https://cal.com/didierlopes/15min"
              target="_blank"
              rel="noreferrer noopener"
              className='flex justify-center items-center mx-auto'
            >
              <div className="flex rounded-xl p-2 w-32 bg-[#2e8555] hover:bg-grey-200 hover:dark:bg-grey-200 hover:text-[#2e8555] hover:no-underline mx-auto items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={101}
                  height={22}
                  fill="currentColor"
                  className="mx-auto"
                >
                  <path
                    fill="#292929"
                    d="M10.058 20.817C4.321 20.817 0 16.277 0 10.67 0 5.046 4.1.468 10.058.468c3.163 0 5.351.971 7.061 3.195l-2.758 2.299c-1.159-1.234-2.556-1.85-4.303-1.85-3.88 0-6.013 2.97-6.013 6.558 0 3.588 2.336 6.503 6.013 6.503 1.729 0 3.2-.616 4.358-1.85l2.721 2.392c-1.636 2.13-3.88 3.102-7.079 3.102ZM29.016 5.886h3.714v14.575h-3.714v-2.13c-.772 1.514-2.06 2.523-4.523 2.523-3.935 0-7.08-3.42-7.08-7.624 0-4.205 3.145-7.624 7.08-7.624 2.445 0 3.75 1.009 4.523 2.522V5.886Zm.11 7.344c0-2.28-1.563-4.167-4.027-4.167-2.372 0-3.916 1.906-3.916 4.167 0 2.205 1.544 4.167 3.916 4.167 2.446 0 4.027-1.906 4.027-4.167ZM35.36 0h3.714v20.443H35.36V0ZM40.73 18.518c0-1.196.955-2.205 2.26-2.205a2.18 2.18 0 0 1 2.226 2.205c0 1.233-.938 2.242-2.225 2.242a2.231 2.231 0 0 1-2.262-2.242ZM59.43 18.107c-1.38 1.681-3.476 2.747-5.958 2.747-4.432 0-7.686-3.42-7.686-7.624 0-4.205 3.254-7.624 7.686-7.624 2.39 0 4.468 1.009 5.847 2.597l-2.868 2.41c-.717-.896-1.655-1.569-2.98-1.569-2.371 0-3.916 1.906-3.916 4.167s1.545 4.167 3.917 4.167c1.434 0 2.427-.747 3.163-1.757l2.795 2.486ZM59.742 13.23c0-4.205 3.255-7.624 7.686-7.624 4.432 0 7.686 3.42 7.686 7.624s-3.254 7.624-7.686 7.624c-4.431-.02-7.686-3.42-7.686-7.624Zm11.603 0c0-2.28-1.545-4.167-3.917-4.167-2.372-.019-3.916 1.887-3.916 4.167 0 2.26 1.544 4.167 3.916 4.167s3.917-1.906 3.917-4.167ZM100.232 11.548v8.895h-3.714v-7.98c0-2.522-1.177-3.606-2.942-3.606-1.655 0-2.832.823-2.832 3.607v7.979H87.03v-7.98c0-2.522-1.195-3.606-2.942-3.606-1.655 0-3.108.823-3.108 3.607v7.979h-3.714V5.868h3.714v2.018c.772-1.57 2.17-2.355 4.321-2.355 2.041 0 3.751 1.01 4.69 2.71.937-1.738 2.316-2.71 4.817-2.71 3.052.019 5.424 2.336 5.424 6.017Z"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 flex flex-col px-3 text-center md:max-w-[880px]">
          <h1 className="_h1 !mb-2">
            I love to experience new cultures
          </h1>
          <div className="flex-none overflow-y-scroll rounded-sm text-center mx-auto text-lg p-2 pr-8 mb-4">
            <span>
              Nowadays I put work first. 
              But one day I hope to visit over 100 countries.
            </span>
            <iframe
              // Note that the &zoom=9 is important to set the zoom level
              src="https://www.google.com/maps/d/u/0/embed?mid=174MaDCD2ho7QwEt4uk16eJnPxnZNxzU&ehbc=2E312F&zoom=9"
              width="100%"
              height="480"
              title="My travels"
              className="mt-2"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
