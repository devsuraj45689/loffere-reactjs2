import imageMap from '../../../pages/Home/ImageImports';

interface Category {
  image_url: string;
  text: string;
}

const CategoryCard: React.FC<Category> = ({ image_url, text }) => {
  const importedSrc = imageMap[image_url];
  return (
    <div>
      <div className="w-[88px] h-[88px] md:h-120 md:w-120 flex flex-col justify-center items-center">
        <div className="bg-[#DEFEFF] rounded-full flex justify-center items-center w-100 h-100">
          <img
            src={importedSrc}
            alt={text}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
      <div className="text-wrap w-[88px] md:w-[110px] h-[20%]">
        <p className="text-xs leading-[18px] font-normal md:text-sm md:leading-[21px] md:font-medium flex text-center text-[#1B1B1B] font-poppins">
          {text}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
