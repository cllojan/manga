import styles from "../styles/home.module.css";

function Home({ data }) {
  return (
    <div className=''>
      <div className='grid grid-cols-4  gap-4'>
        {data.map((elm, idx) => (
          <a
            key={idx}
            href={`library/${elm.href}`}
            style={{ backgroundImage: `url(${elm.img})` }}
            class='relative block overflow-hidden rounded-xl h-100 bg-cover  bg-center bg-no-repeat'
          >
            <div class='absolute inset-0 bg-black/25'></div>

            <div class='relative flex items-start justify-between p-4 sm:p-6 lg:p-8'>
              <div class='sm:pt-18 pt-12 text-white lg:pt-24'>
                <h3 class='text-xl font-bold sm:text-2xl'>{elm.title}</h3>

                <p class='text-sm'></p>
              </div>

              <span class='inline-flex items-center gap-0.5 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white'>
                4.5
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-4 w-4 text-yellow-300'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const respuesta = await fetch("http://localhost:3000/api/lector");
  const data = await respuesta.json();
  return {
    props: {
      data,
    },
  };
}
export default Home;
