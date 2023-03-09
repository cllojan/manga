import React, { useState } from "react";

const xd = ({ data }) => {
  const [imgs, setImgs] = useState(Object.values(data[0]));

  return (
    <div>
      <div className='con'>
        <h1>BH</h1>
        {imgs.map((x, i) => (
          <img key={i} src={x} alt='' />
        ))}
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  const respuesta = await fetch("http://localhost:3000/api/library/test");
  const data = await respuesta.json();
  return {
    props: {
      data,
    },
  };
}
export default xd;
