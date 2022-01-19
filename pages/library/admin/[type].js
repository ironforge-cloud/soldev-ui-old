import useGetContentByStatus from "../../../hooks/useGeneralContent";
import { Container } from "../../../components/layout";
import dynamic from "next/dynamic";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

export default function ContentAdmin({}) {
  const { data = [], type = "", isLoading } = useGetContentByStatus();

  const metaTags = {
    title: "SolDev - Library Admin",
    description: "Library Admin",
    url: "https://soldev.app/admin",
    image: "https://soldev.app/solanaLogoMark.png",
    shouldIndex: false,
  };

  return (
    <Container metaTags={metaTags}>
      <PublicationsComponent data={data} title={type} isLoading={isLoading} />
    </Container>
  );
}
