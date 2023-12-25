import { FaTabletAlt } from "react-icons/fa";
import { RiComputerLine } from "react-icons/ri";
import { PiDeviceMobileSpeaker } from "react-icons/pi";

type Props = {
  device: string;
  setDevice: (device: string) => void;
};

const SelectDevice = ({ device, setDevice }: Props) => {
  return (
    <div className="flex justify-center items-center gap-10 my-5">
      <RiComputerLine
        size={35}
        className={`cursor-pointer transition-colors ${
          device === "pc" ? "text-blue-600" : "text-gray-500"
        }`}
        onClick={() => {
          if (device === "pc") setDevice("");
          else setDevice("pc");
        }}
      />
      <FaTabletAlt
        size={35}
        onClick={() => {
          if (device === "tablet") setDevice("");
          else setDevice("tablet");
        }}
        className={`cursor-pointer transition-colors ${
          device === "tablet" ? "text-blue-600" : "text-gray-500"
        }`}
      />
      <PiDeviceMobileSpeaker
        size={35}
        onClick={() => {
          if (device === "mobile") setDevice("");
          else setDevice("mobile");
        }}
        className={`cursor-pointer transition-colors ${
          device === "mobile" ? "text-blue-600" : "text-gray-500"
        }`}
      />
    </div>
  );
};

export default SelectDevice;
