import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { ChevronsRight } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Description } from '@radix-ui/react-dialog';
import { Country, State, City } from 'country-state-city';
import { LoadScript } from '@react-google-maps/api';
// import googleMap from '../Map/googleMap';
import './stepper.css';
import { FileUploader } from 'react-drag-drop-files';
import { useDispatch, useSelector } from 'react-redux';
import {
  categoryGet,
  getCities,
  getCountries,
  getStates,
  postDropDownValues,
  postProduct,
  subCategoryGet,
} from 'store/slices/postSlice';
import PostSuccessModal from '../PostSuccessModal/PostModal';
import App from '../maps/GoogleMap';
import * as Yup from 'yup';
const uploadLogoPictures = ['JPG', 'PNG', 'GIF'];
const parentImgPath = './Parent category';
const childImgPath = './Child Category';

const steps = [
  'Select Category',
  'Details',
  'Extra Details',
  'Images',
  'Location',
];

const libraries = ['places']; // Load the Places library

export default function HorizontalLinearStepper() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [categoryChoose, setCategoryChoose] = React.useState(false);
  const [categoryIndex, setCategoryIndex] = React.useState(0);
  const [categoryLable, setCategoryLable] = React.useState('');
  const [subcategoryLable, setSubCategoryLable] = React.useState('');
  const [successModalShow, setSuccessModalShow] = React.useState(false);
  const [postData, setPostData] = React.useState({
    category: '',
    sub_category: '',
    details: {},
    extra_details: {},
    images: {},
    location: {},
  });
  const [postDetail, setPostDetail] = React.useState({
    categoryId: '',
    subCategoryId: '',
    title: '',
    description: '',
    price: '',
    address: '',
    countryId: '6718d4b2eeadaa380b4ffbe3',
    stateId: '6718d4b2eeadaa380b4ffbe3',
    cityId: '6718d4b2eeadaa380b4ffbe3',
    latitude: '13.082680',
    longitude: '80.270721',
    additionalFields: [],
    images: [
      //need to discuss
    ],
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [uploadLogoPictures, setUploadLogoPicture] = useState([]);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // Refs for file inputs
  const uploadLogo = useRef(null);
  const productInputRef = useRef(null);

  const apiKey = 'AIzaSyBDVygSbeex7SyuVradtxkrolgOBz2l7qU'; // Replace with your actual API key

  const categoryCard = useSelector((state) => state.post.category);
  const subCategoryCard = useSelector((state) => state.post.subCategory);
  const dropDownValues = useSelector((state) => state.post.dropDownValues);
  const countries = useSelector((state) => state.post.countries);
  const states = useSelector((state) => state.post.states);
  const cities = useSelector((state) => state.post.cities);

  const [input, setInput] = useState('');
  const autocompleteRef = useRef(null); // Reference for autocomplete object
  const inputRef = useRef(null); // Reference for input element
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!window.google) return;

    // Initialize the Autocomplete object
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
    autocompleteRef.current.addListener('place_changed', () => {
      const selectedPlace = autocompleteRef.current.getPlace();
      setPlace(selectedPlace);
    });
  }, []);

  useEffect(() => {
    // Code to run on component mount
    dispatch(categoryGet());
  }, []); // Dependency array

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  //   // Update states when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      dispatch(getStates(selectedCountry));
      setSelectedState(null); // Reset state selection
    }
  }, [selectedCountry]);

  //   // Update cities when selectedState changes
  useEffect(() => {
    if (selectedState) {
      dispatch(
        getCities({
          country_code: selectedCountry,
          state_code: selectedState,
        })
      );
    }
  }, [selectedState]);

  // Handle country selection
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  // Handle state selection
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleLogoUploadChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setUploadLogoPicture((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 1) {
      dispatch(
        postDropDownValues({
          categoryId: postDetail.categoryId,
        })
      );
    }
    if (activeStep === 4) {
      return postProductSubmit();
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // updating a specific key in `postData`
  const subCategoryCardClick = (key, value, id) => {
    setSubCategoryLable(value),
      setPostData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    postDataStore('subCategoryId', id);
  };

  const postDataStore = (key, value) => {
    setPostDetail((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleChangeText = (e) => {
    const { name, value } = e.target;
    postDataStore(name, value); // Update state with key-value
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    jobRole: Yup.string().required('Required'),
    careerLevel: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    workTime: Yup.string().required('Required'),
    remoteJob: Yup.string().required('Required'),
    workExperience: Yup.string().required('Required'),
    educationLevel: Yup.string().required('Required'),
    gender: Yup.string().required('Select a gender'),
    language: Yup.array().min(1, 'Select at least one language'),
  });
  const stepThreeLayout = () => {
    return (
      <div className="container mt-4">
        <Formik
          initialValues={{
            jobRole: '',
            careerLevel: '',
            category: '',
            workTime: '',
            remoteJob: '',
            workExperience: '',
            educationLevel: '',
            gender: '',
            language: [],
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values }) => (
            <Form className="form-container">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Job Role</label>
                    <Field as="select" name="jobRole" className="form-input">
                      <option value="" label="Select job role" />
                    </Field>
                    <ErrorMessage
                      name="jobRole"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <div className="checkbox-group">
                      <label>
                        <Field type="radio" name="gender" value="Male" />
                        Male
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="Female" />
                        Female
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="Any" />
                        Any
                      </label>
                    </div>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Career Level</label>
                    <Field
                      as="select"
                      name="careerLevel"
                      className="form-input"
                    >
                      <option value="" label="Select career level" />
                    </Field>
                    <ErrorMessage
                      name="careerLevel"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Category</label>
                    <Field as="select" name="category" className="form-input">
                      <option value="" label="Select category" />
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Work Time</label>
                    <Field as="select" name="workTime" className="form-input">
                      <option value="" label="Select work time" />
                    </Field>
                    <ErrorMessage
                      name="workTime"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Remote Job</label>
                    <div className="checkbox-group">
                      <label>
                        <Field type="radio" name="remoteJob" value="Yes" />
                        Yes
                      </label>
                      <label>
                        <Field type="radio" name="remoteJob" value="No" />
                        No
                      </label>
                    </div>
                    <ErrorMessage
                      name="remoteJob"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Work Experience</label>
                    <Field
                      name="workExperience"
                      placeholder="Enter work experience"
                      className="form-input"
                    />
                    <ErrorMessage
                      name="workExperience"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Education Level</label>
                    <Field
                      as="select"
                      name="educationLevel"
                      className="form-input"
                    >
                      <option value="" label="Select education level" />
                    </Field>
                    <ErrorMessage
                      name="educationLevel"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Language</label>
                    <div className="checkbox-group">
                      {[
                        'English',
                        'Hindi',
                        'Arabic',
                        'Russian',
                        'Italian',
                        'French',
                        'Bengali',
                        'Chinese',
                        'Japanese',
                        'Portuguese',
                        'Korean',
                        'Spanish',
                        'Other',
                      ].map((lang) => (
                        <label key={lang}>
                          <Field type="checkbox" name="language" value={lang} />
                          {lang}
                        </label>
                      ))}
                    </div>
                    <ErrorMessage
                      name="language"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Benefits</label>
                    <div className="checkbox-group">
                      {[
                        'Health Insurance',
                        'Company Visa',
                        'Commision',
                        'Accommodation',
                        'Tickets',
                        'House & Facility',
                      ].map((benefit) => (
                        <label key={benefit}>
                          <Field
                            type="checkbox"
                            name="benefit"
                            value={benefit}
                          />
                          {benefit}
                        </label>
                      ))}
                    </div>
                    <ErrorMessage
                      name="benefit"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  const stepFourLayout = () => {
    return (
      <div className="logo-upload-container">
        <div className="logo-upload-labelContainer">
          <label className="logo-upload-label">
            Upload Company Logo <span className="required text-primary">*</span>
          </label>
          <span
            className="logo-upload-infoIcon px-2"
            title="Upload a company logo in JPG, PNG, or GIF format"
          >
            ⓘ
          </span>
        </div>
        <div className="logo-upload-fileUploaderContainer">
          {/* Hidden file inputs */}
          <input
            type="file"
            multiple
            ref={uploadLogo}
            onChange={handleLogoUploadChange}
            className="d-none profile-picture"
            name="profile-picture"
          />

          {/* Trigger buttons */}

          <div className="logo-upload-previewContainer">
            {uploadLogoPictures.length < 9 ? (
              <>
                <div className="logo-upload-fileSlot mt-5 pt-1">
                  <div
                    className="logo-upload-uploadSlot-btn"
                    onClick={() => uploadLogo.current.click()}
                  >
                    <div className="logo-upload-uploadText">+</div>
                    <span className="logo-upload-uploadLabel">Upload</span>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Preview section */}
            {uploadLogoPictures.map((file, index) => (
              <div key={index} className="logo-uploaded-img-fileSlot">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="rounded logo-upload-filePreview"
                />
              </div>
            ))}
            {[...Array(9 - uploadLogoPictures.length)].map((_, index) => (
              <div key={index} className="logo-uploaded-img-fileSlot"></div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const postProductSubmit = () => {
    dispatch(postProduct(postDetail));
    setSuccessModalShow(true);
  };
  return (
    <div className="container mt-3">
      <div className="d-flex">
        <a>Home</a>
        <ChevronsRight style={{ color: '#959595' }} />
        <a>Add Listing</a>
        <ChevronsRight style={{ color: '#959595' }} />
      </div>
      <div className="my-10 border rounded p-3 stepper-container">
        <Box sx={{ width: '100%' }} >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep === 0 ? (
                <div className="row mt-3">
                  <h6 className="mb-3 text-primary">Jobs</h6>
                  <div className="col-md-3 mt-3">
                    <Card
                      className="card-wrap-container"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          flex: '1 0 auto',
                          width: '80%',
                        }}
                      >
                        <CardContent>Job Hiring</CardContent>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          mr: 2,
                          backgroundColor: '#EDFEFF',
                          borderRadius: '50%',
                        }}
                      >
                        <CardMedia
                          component="img"
                          image="./Job/Frame 1171276947.png"
                          alt="job"
                          sx={{ width: 'auto', height: '50px' }}
                        />
                      </Box>
                    </Card>
                  </div>
                  <div className="col-md-3 mt-3">
                    <Card
                      className="card-wrap-container"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          flex: '1 0 auto',
                          width: '80%',
                        }}
                      >
                        <CardContent>Job Seekers</CardContent>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 40,
                          height: 40,
                          mr: 2,
                          backgroundColor: '#EDFEFF',
                          borderRadius: '50%',
                        }}
                      >
                        <CardMedia
                          component="img"
                          image="./Job/Frame 1171276948.png"
                          alt="job"
                          sx={{ width: 'auto', height: '50px' }}
                        />
                      </Box>
                    </Card>
                  </div>
                </div>
              ) : activeStep === 1 ? (
                <div className="container mt-4">
                  <Formik
                    initialValues={{ title: '', salary: '', description: '' }}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    <Form>
                      <div className="row">
                        <div className="col-md-8">
                          <label className="block text-sm font-medium text-gray-700">
                            Job Title{' '}
                            <span className="required text-primary">*</span>
                          </label>
                          <Field
                            id="title"
                            name="title"
                            type="text"
                            value={postDetail.title}
                            onChange={handleChangeText}
                            placeholder="Enter Title"
                            className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Salary (Per Year){' '}
                            <span className="required text-primary">*</span>
                          </label>
                          <Field
                            id="price"
                            name="price"
                            type="text"
                            value={postDetail.price}
                            onChange={handleChangeText}
                            placeholder="$ 00"
                            className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="col-md-12 mt-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Job Description{' '}
                            <span className="required text-primary">*</span>
                          </label>
                          <CKEditor
                            editor={ClassicEditor}
                            data=""
                            value={postDetail.description}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              // setFieldValue("description", data);
                              postDataStore('description', data);
                            }}
                          />
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </div>
              ) : activeStep === 2 ? (
                stepThreeLayout()
              ) : activeStep === 3 ? (
                stepFourLayout()
              ) : (
                <div className="row">
                  {/* Left Column */}
                  <div className="col-md-6 mt-4">
                    <label htmlFor="leftInput">Search Location on Map</label>
                    <div
                      class="input-group rounded d-flex"
                      style={{ height: '18%' }}
                    >
                      {/* <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                                <span class="input-group-text border-0" id="search-addon">
                                                <i class="fas fa-search"></i>
                                                </span> */}
                      <App />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="col-md-6 mt-4">
                    <label htmlFor="rightInput1">Address</label>
                    <input
                      type="text"
                      name="address"
                      onChange={handleChangeText}
                      value={postDetail.address}
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter address"
                    />

                    <label htmlFor="rightInput2">Country</label>
                    {/* Right Side - Last Three Select Boxes */}
                    <select
                      class="form-select mb-3"
                      aria-label="Default select example"
                      onChange={handleCountryChange}
                      value={selectedCountry || ''}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="rightInput3">State</label>
                    {/* Right Side - Last Three Select Boxes */}
                    <select
                      class="form-select mb-3"
                      aria-label="Default select example"
                      onChange={handleStateChange}
                      value={selectedState || ''}
                      disabled={!selectedCountry}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>

                    <label htmlFor="rightInput4">City</label>
                    {/* Right Side - Last Three Select Boxes */}
                    <select
                      class="form-select mb-3"
                      aria-label="Default select example"
                      disabled={!selectedState}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              <div className="row">
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button
                    className="stepper-btn"
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button className="stepper-btn" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </Box>
              </div>
            </React.Fragment>
          )}
        </Box>
      </div>
      <PostSuccessModal
        show={successModalShow}
        handleClose={() => setSuccessModalShow(false)}
      />
    </div>
  );
}
