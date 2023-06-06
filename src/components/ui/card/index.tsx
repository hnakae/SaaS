const Card = ({ data }: any) => {
  return (
    <div className="w-[80%] bg-white rounded-lg shadow-md">
      <div className="h-full text-center py-4 text-black ">{data}</div>
    </div>
  );
};

export default Card;
