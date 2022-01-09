import Card from "../components/publications/card";

// This helper function allow me to have infinity loading without having
// to build pagination in the api
export default function loadContent(content, contentAmount) {
  let size;

  if (content.length < contentAmount) {
    size = content.length;
  } else {
    size = contentAmount;
  }

  let component = [];
  for (let i = 0; i < size; i++) {
    component.push(
      <Card
        content={content[i]}
        key={content[i].SK}
        editContent={() => {}}
        mode="dashboard"
      />
    );
  }

  return component;
}
