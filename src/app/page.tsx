import Link from 'next/link';

const Home = () => {
  return (
    <div className='bg-emerald-200 flex flex-col min-h-screen items-center justify-center text-8xl'>
      <Link href='/documents/123' className='underline text-blue-400'>
        Document ID PAGE
      </Link>
    </div>
  );
};

export default Home;
