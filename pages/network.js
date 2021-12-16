import Image from "next/image";
import { useAppState } from "../context/AppContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Network() {
  const appState = useAppState();

  return (
    <div
      className={classNames(
        "flex justify-center",
        !appState.editMode && "blur-lg"
      )}
    >
      <Image className="" src="/network.svg" width="1300px" height="1300px" />
    </div>
  );
}
