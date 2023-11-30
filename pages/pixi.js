import React from 'react';
import PageDescription from "../components/baseComponents/head/pageDescription/PageDescription";
import defaultPage from "../constants/page-description";
import Scene from "../components/pixiComponent/Scene";
import SceneGame from "../components/pixiComponent/SceneGame";

export default function Home() {

  return (
    <div className="container">
      <PageDescription {...defaultPage}/>
      <SceneGame/>
      <Scene/>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
