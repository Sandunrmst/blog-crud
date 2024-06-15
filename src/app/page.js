import Link from "next/link";

export default async function Home() {
  // console.log(process.env.NEXT_PUBLIC_DB_CONNECTION_PSW)

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h2 className="text-4xl text-white font-bold md-4">
          Browse our blog collection
        </h2>
        <Link
          className="mt-5 bg-white text-sm text-blue-700 font-semibold py-2 px-6 rounded"
          href={"/blogs"}
        >
          Explore Blogs
        </Link>
      </div>
    </div>
  );
}
