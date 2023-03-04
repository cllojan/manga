import React from "react";
import { useRouter } from "next/router";
const libreria = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <h1>AAA</h1>
      <h2>{slug}</h2>
    </div>
  );
};

export default libreria;
