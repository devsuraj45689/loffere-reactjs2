import largeAds from '../../assets/images/largeImage.png';
import smallAds from '../../assets/images/smallSizeImage.png';
import ProductSeller from './ProductSeller';

const ProductAds = () => {
  return (
    <div className="col product_ads">
      <ProductSeller />
      <div className="adsSection min_pad_top">
        <div className="row">
          <img src={largeAds} alt="Ads" />
        </div>
        <div className="row min_pad_top">
          <img src={smallAds} alt="Ads" />
        </div>
        <div className="row min_pad_top">
          <img src={largeAds} alt="Ads" />
        </div>
      </div>
    </div>
  );
};

export default ProductAds;
