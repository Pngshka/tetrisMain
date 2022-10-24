import React from 'react';
import PageDescription from "../components/baseComponents/head/pageDescription/PageDescription";
import defaultPage from "../constants/page-description";
import SceneWrapper from "../utils/scene/examples/react/threeComponent/SceneWrapper";

export default function Home() {

  return (
    <div className="container">
      <PageDescription {...defaultPage}/>
      <SceneWrapper/>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
