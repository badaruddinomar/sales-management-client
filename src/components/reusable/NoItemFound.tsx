import { HiOutlineFaceFrown } from "react-icons/hi2";
const NoItemFound = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center flex-col my-[5rem]">
      <HiOutlineFaceFrown size={120} className="text-purple-500 mb-3" />
      <h4 className="text-[50px] font-primary font-bold text-purple-500 leading-8 mb-3">
        <span className="text-[60px]">O</span>OPS!
      </h4>
      <p className="font-primary text-[20px] font-light my-[10px] ">
        No {title} found!
      </p>
    </div>
  );
};

export default NoItemFound;
