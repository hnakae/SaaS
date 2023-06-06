const Card = ({ data }: any) => {
  return (
    <div className="flex-shrink-0 w-[80vw] bg-white rounded-lg shadow-md">
      <div className="flex justify-center items-center h-full text-center py-4 ">
        {data}
      </div>
    </div>
  );
};

export default Card;
