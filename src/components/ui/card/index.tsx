const Card = ({ data }: any) => {
  return (
    <div className="flex-shrink-0 w-30 h-44 bg-white rounded-lg shadow-md">
      <div className="flex justify-center items-center h-full">{data}</div>
    </div>
  );
};

export default Card;
