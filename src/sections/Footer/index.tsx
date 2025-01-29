import 'assets/css/footer.css';
import appStoreImg from 'assets/landing_page/footer/appstore-icon.png';
import playStoreImg from 'assets/landing_page/footer/googleplay-icon.png';
import Facebook from 'assets/landing_page/footer/facebook.svg';
import Instagram from 'assets/landing_page/footer/insta.svg';
import LinkedIn from 'assets/landing_page/footer/linkedin.svg';
import Youtube from 'assets/landing_page/footer/youtube.svg';
import './style.scss';
import { Select } from 'antd';

const { Option } = Select;

const Icons = [
  { href: '#', src: Facebook, name: 'facebook' },
  { href: '#', src: Instagram, name: 'Instagram' },
  { href: '#', src: LinkedIn, name: 'LinkedIn' },
  { href: '#', src: Youtube, name: 'youtube' },
];

const Languages = ['English', 'French', 'Spanish'];

const links = [
  {
    heading: 'about loffre.ma',
    links: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  },
  {
    heading: 'Legal Information',
    links: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  },
  {
    heading: 'Our Pro. Solutions',
    links: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  },
  {
    heading: 'Any Questions?',
    links: ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'],
  },
  {
    heading: 'Our Application',
    links: [
      <div key="apps" className="flex  justify-center ">
        <a href="#">
          <img src={appStoreImg} alt="App Store" />
        </a>
        <a href="#">
          <img src={playStoreImg} alt="Google Play" />
        </a>
      </div>,
    ],
  },
  {
    heading: 'Are you Abroad?',
    links: [
      <div key="languages" className="max-sm:mb-[20px]">
        <Select defaultValue="English" className="rounded-[4px] w-[165px] h-[44]">
          {Languages.map((language) => (
            <Option key={language} value={language}>
              {language}
            </Option>
          ))}
        </Select>
      </div>,
    ],
  },
];


const LinksGroup = ({ data }) => {
  const { heading, links } = data;
  return (
    <>
    <div className="col-6 max-sm:text-center col-md-3 px-4 md:px-5">
      <div className="flex flex-col">
        <div col-6>
          <h6 className="border-bottom pb-3 inline-block">
            {heading.toUpperCase()}
          </h6>
          <ul className="list-unstyled pl-0">
            {links.map((link:any, index:any) => (
              <li
                key={index}
                className="text-base md:text-start font-normal mb-2"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
        </div>
    </div>           
      </>
  );
};

const Footer = () => {
  return (
    <footer className={`footer py-10 pt-15 px-10}`}>
      <div className="container">
        <div className="row text-left">
          {links.map((linksGroup) => (
            <LinksGroup data={linksGroup} />
          ))}
        </div>

        {/* App Download Links and Social Icons */}
        <div className="flex flex-col md:flex-row md:justify-between gap-3 text-sm md:text-base font-light leading-normal items-center pt-3 md:pt-4 border-t">
          <div className="select-none">
            © 2024 Loffre.ma Copyright | All Rights Reserved
          </div>

          <div className="flex items-center gap-3">
            {Icons.map((Icon) => (
              <a
                href={Icon.href}
                className="bg-white w-[42px] h-[42px] flex items-center justify-center rounded-full"
              >
                <img src={Icon.src} alt={Icon.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
