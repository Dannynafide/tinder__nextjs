import BaseLayout from 'components/BaseLayout';

export default function Home() {
  return (
    <BaseLayout>
      <section>
        <div className="skew skew-top mr-for-radius">
          <svg
            className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
            viewBox="0 0 10 10"
            preserveAspectRatio="none">
            <polygon fill="currentColor" points="0 0 10 10 0 10"></polygon>
          </svg>
        </div>
        <div className="skew skew-top ml-for-radius">
          <svg
            className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
            viewBox="0 0 10 10"
            preserveAspectRatio="none">
            <polygon fill="currentColor" points="0 10 10 0 10 10"></polygon>
          </svg>
        </div>
        <div className="py-20 bg-gray-50 radius-for-skewed">
          <div className="container mx-auto px-4">
            <div className="mb-16 mx-auto max-w-md text-center">
              <span className="text-green-600 font-bold">Wanna build something?</span>
              <h2 className="text-4xl lg:text-5xl font-bold font-heading">
                Meet &amp; Connect with creators
              </h2>
            </div>
            <div className="flex flex-wrap -mx-4">
              <div className="mb-8 lg:mb-0 w-full md:w-1/2 lg:w-1/3 px-4">
                <div className="py-10 px-6 bg-white shadow rounded text-center">
                  <span className="mb-6 w-16 h-16 inline-flex justify-center items-center bg-green-100 rounded text-2xl text-green-600 font-bold">
                    1
                  </span>
                  <h3 className="mb-4 text-2xl font-bold font-heading">Create profile</h3>
                  <p className="text-gray-500 leading-loose">
                    Describe who you are, what are your skills, and what would you like to build.{' '}
                  </p>
                </div>
              </div>
              <div className="mb-8 lg:mb-0 w-full md:w-1/2 lg:w-1/3 px-4">
                <div className="py-10 px-6 bg-white shadow rounded text-center">
                  <span className="mb-6 w-16 h-16 inline-flex justify-center items-center bg-green-100 rounded text-2xl text-green-600 font-bold">
                    2
                  </span>
                  <h3 className="mb-4 text-2xl font-bold font-heading">Meet creators</h3>
                  <p className="text-gray-500 leading-loose">
                    Setup filters and start looking through other profiles. Interested in talking to
                    someone? Like their profile.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-full lg:w-1/3 px-4">
                <div className="py-10 px-6 bg-white shadow rounded text-center">
                  <span className="mb-6 w-16 h-16 inline-flex justify-center items-center bg-green-100 rounded text-2xl text-green-600 font-bold">
                    3
                  </span>
                  <h3 className="mb-4 text-2xl font-bold font-heading">Perfect match</h3>
                  <p className="text-gray-500 leading-loose">
                    If somebody liked back your profile you have a match! Now you may instantly jump
                    into conversion and start building!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="skew skew-bottom mr-for-radius">
          <svg
            className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
            viewBox="0 0 10 10"
            preserveAspectRatio="none">
            <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
          </svg>
        </div>
        <div className="skew skew-bottom ml-for-radius">
          <svg
            className="h-8 md:h-12 lg:h-20 w-full text-gray-50"
            viewBox="0 0 10 10"
            preserveAspectRatio="none">
            <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
          </svg>
        </div>
      </section>
    </BaseLayout>
  );
}
