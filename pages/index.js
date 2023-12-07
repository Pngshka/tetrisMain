import React from 'react';
import PageDescription from "../components/baseComponents/head/pageDescription/PageDescription";
import defaultPage from "../constants/page-description";
import SceneGame from "../components/threeComponent/SceneGame";

export default function Home() {

  return (
    <div className="container">
      <PageDescription {...defaultPage}/>
      {/*<Scene/>*/}
      <SceneGame/>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
