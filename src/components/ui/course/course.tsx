interface CourseProps {
  title: string;
  description: string;
  image: string;
}
const Course = ({ title, description, image }: CourseProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="wrapper">
        <div className="relative w-[80vw] h-[300px] flex flex-col justify-end space-y-4  items-center p-4">
          <div className="absolute outline px-4 rounded-md top-5 left-5">
            PRO
          </div>
          <div
            className="image "
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="px-4 py-2 rounded-lg bg-opaque backdrop-blur-md capitalize text-center">
            <div className="text-3xl font-bold">{title}</div>
            <div className="text-lg font-semibold">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Course;
