import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
async function filterMna() {
  const respuesta = await fetch("http://localhost:3000/api/lector");
  const data = await respuesta.json();
  return data;
}
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
