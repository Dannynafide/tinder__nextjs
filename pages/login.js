import Link from 'next/link';

export default function Login() {
  return (
    <div>
      <section className="h-screen py-10 lg:py-20 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="mb-10 text-center ">
              <Link href="/" className="text-white text-3xl font-bold leading-none">
                MakersMatch
              </Link>
            </div>
            <div className="p-6 lg:p-12 bg-white shadow-md rounded">
              <div className="mb-6 px-3 text-center">
                <span className="text-gray-500">Sign In</span>
                <h3 className="text-2xl font-bold">Join our community</h3>
              </div>
              <form action="">
                <div className="text-center">
                  <Link
                    className="mt-8 mb-4 p-4 flex justify-center items-center border rounded hover:bg-gray-50"
                    href="/">
                    <img className="mr-4 w-6" src="/github.svg" alt="" />
                    <span className="text-xs text-gray-500 font-bold">
                      Sign In with your GitHub
                    </span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
