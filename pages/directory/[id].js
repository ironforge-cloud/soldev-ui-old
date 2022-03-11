import { memo } from "react"
import fetch from "../../utils/fetcher";

export async function getStaticPaths() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/companies`);

  if (!Array.isArray(data)) {
    return {paths: [], fallback: false};
  }
  
  const paths = data.map((content) => {
    return {
      params: {
        companyID: content.ID,
      },
    };
  });

  return {paths, fallback: "blocking"};
}

export async function getStaticProps({params}) {
}

function Project({project}) {
  return <></>
}

export default memo(Project)