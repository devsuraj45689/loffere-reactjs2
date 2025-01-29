import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '../MyButton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { ChevronsRight } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './stepper.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCities,
  getCountries,
  getStates,
  postJob,
} from 'store/slices/postSlice';
import PostSuccessModal from '../PostSuccessModal/PostModal';
import App from '../maps/GoogleMap';
import * as Yup from 'yup';
import Select from 'react-select';
import { CircleX } from 'lucide-react';

const steps = ['Position Type', 'Details', 'Location'];

export default function HorizontalLinearStepper() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [pageWarning, setPageWarning] = useState('');
  const [postDetail, setPostDetail] = useState({
    categoryId: '',
    title: '',
    salary: '',
    description: '',
    salaryPeriod: '',
    preferredGender: '',
    jobtype: '',
    companyName: '',
    aboutCompany: '',
    companyLogo: '',
    companyAddress: '',
    countryId: '',
    stateId: '',
    cityId: '',
    userId: '67169d4798bdd288fe36050b',
    latitude: '',
    longitude: '',
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [uploadLogoPictures, setUploadLogoPicture] = useState([]);

  // Refs for file inputs
  const uploadLogo = useRef(null);

  const countries = useSelector((state) => state.post.countries);
  const states = useSelector((state) => state.post.states);
  const cities = useSelector((state) => state.post.cities);

  const autocompleteRef = useRef(null); // Reference for autocomplete object
  const inputRef = useRef(null); // Reference for input element
  const [place, setPlace] = useState(null);
  const [activeJobCards, setActiveJobCards] = useState([]);
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    if (!window.google) return;

    // Initialize the Autocomplete object
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
    autocompleteRef.current.addListener('place_changed', () => {
      const selectedPlace = autocompleteRef.current.getPlace();
      console.log('select place', selectedPlace);

      setPlace(selectedPlace);
    });
  }, []);

  useEffect(() => {
    dispatch(getCountries());
    const storedUserDetail = localStorage.getItem('userDetail');
    if (storedUserDetail) {
      console.log(storedUserDetail);

      setUserDetail(JSON.parse(storedUserDetail)); // Parse and update state
    }
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

  const handleLogoUploadChange = async (event) => {
    const newFiles = Array.from(event.target.files);
    await setUploadLogoPicture((prevFiles) => [...prevFiles, ...newFiles]);
    postDataStore('companyLogo', 'test');
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (activeJobCards.length === 0) {
        setPageWarning('Please select atleast one');
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }

    if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
    if (activeStep === 2) {
      return postJobSubmit();
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const JobCardClick = async (job) => {
    setPageWarning('');
    // setActiveJobCard(job);

    // Check if the job is already in the activeJobCards array
    if (activeJobCards.includes(job)) {
      // If it is, remove it from the array
      await setActiveJobCards(activeJobCards.filter((item) => item !== job));
      postDataStore('categoryId', job);
    } else {
      // If it's not, add it to the array
      await setActiveJobCards([...activeJobCards, job]);
      postDataStore('categoryId', job);
    }
  };

  const postDataStore = async (key, value) => {
    await setPostDetail((prevData) => ({
      ...prevData,
      [key]: value,
      userId: userDetail['_id'],
    }));
  };

  const handleChangeText = (e) => {
    const { name, value } = e.target;
    postDataStore(name, value); // Update state with key-value
  };

  const handleDrop = (e) => {
    const files = Array.from(e.dataTransfer.files); // Get the files dropped
    handleLogoUploadChange({ target: { files } }); // Reuse the existing function
  };

  // Create a Formik ref
  const secondStepFormikRef = useRef();
  // Define the validation schema using Yup
  const secondStepperFormValidationSchema = Yup.object().shape({
    title:
      postDetail.title !== ''
        ? Yup.string()
        : Yup.string().required('Job Title is required'),
    description:
      postDetail.description !== ''
        ? Yup.string()
        : Yup.string().required('Job description is required'),
    salary:
      postDetail.salary !== ''
        ? Yup.number()
        : Yup.number()
            .required('Salary is required')
            .positive('Salary must be a positive number'),
    salaryPeriod:
      postDetail.salaryPeriod !== ''
        ? Yup.string()
        : Yup.string().required('Salary Period is required'),
    preferredGender:
      postDetail.preferredGender !== ''
        ? Yup.string()
        : Yup.string().required('Preferred Gender is required'),
    jobtype:
      postDetail.jobtype !== ''
        ? Yup.string()
        : Yup.string().required('Job Type is required'),
    companyName:
      postDetail.companyName !== ''
        ? Yup.string()
        : Yup.string().required('Company Name is required'),
    aboutCompany:
      postDetail.aboutCompany !== ''
        ? Yup.string()
        : Yup.string().required('About Company is required'),
    companyLogo:
      postDetail.companyLogo.length !== 0
        ? Yup.mixed()
        : Yup.mixed()
            .required('Company logo is required') // Handle file input validation
            .test(
              'fileSize',
              'File size is too large (max: 5MB)',
              (value) => !value || (value && value.size <= 5 * 1024 * 1024)
            )
            .test(
              'fileType',
              'Unsupported file format (only JPG, PNG, GIF)',
              (value) =>
                !value ||
                (value &&
                  [
                    'image/jpg',
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                  ].includes(value.type))
            ),
  });

  const salaryPeriodOptions = [
    { value: '', label: 'Select Salary Period', isDisabled: true },
    { value: 'Hourly', label: 'Hourly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Yearly', label: 'Yearly' },
  ];
  const preferredGenderOptions = [
    { value: '', label: 'Select Gender', isDisabled: true },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];
  const jobtypeOptions = [
    { value: '', label: 'Select Job Type', isDisabled: true },
    { value: 'Remote Job', label: 'Remote Job' },
    { value: 'Work From Office', label: 'Work From Office' },
    { value: 'Hybrid Mode', label: 'Hybrid Mode' },
  ];

  const deleteUploadImage = (indexToDelete) => {
    setUploadLogoPicture((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToDelete)
    );
  };
  const stepTwoLayout = () => {
    return (
      <div className="container mt-4">
        <Formik
          innerRef={secondStepFormikRef}
          initialValues={{
            title: postDetail.title || '',
            salary: postDetail.salary || '',
            description: postDetail.description || '',
            salaryPeriod: postDetail.salaryPeriod || '',
            preferredGender: postDetail.preferredGender || '',
            jobtype: postDetail.jobtype || '',
            companyName: postDetail.companyName || '',
            aboutCompany: postDetail.aboutCompany || '',
            companyLogo: '',
          }}
          validationSchema={secondStepperFormValidationSchema}
          onSubmit={(values) => {
            handleNext();
            console.log(values);
          }}
        >
          <Form>
            <div className="row">
              <div className="col-md-8 mt-3">
                <label className="block text-sm font-medium text-gray-700">
                  Job Title <span className="required text-primary">*</span>
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
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              <div className="col-md-4 mt-3">
                <label className="block text-sm font-medium text-gray-700">
                  Salary (Per Year){' '}
                  <span className="required text-primary">*</span>
                </label>
                <Field
                  id="salary"
                  name="salary"
                  type="number"
                  onKeyDown={(e) => {
                    // Prevent input of characters that aren't digits or control keys
                    if (
                      e.key !== 'Backspace' &&
                      e.key !== 'Tab' &&
                      isNaN(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  value={postDetail.salary}
                  onChange={handleChangeText}
                  placeholder="$ 00"
                  className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name="salary" component="div" className="error" />
              </div>
              <div className="col-md-12 mt-3">
                <label className="block text-sm font-medium text-gray-700">
                  Job Description{' '}
                  <span className="required text-primary">*</span>
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={postDetail.description || ''} // Initial content
                  name="description"
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    // Update Formik field value
                    // postDataStore(name, value);
                    postDataStore('description', data);
                  }}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
              </div>

              <div className="col-md-4 mt-3">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">
                    Salary Period
                    <span className="required text-primary">*</span>
                  </label>
                  <Field
                    name="salaryPeriod"
                    className="search-select-form-field"
                  >
                    {({ field, form }) => (
                      <>
                        <Select
                          className="form-input search-select-form"
                          value={salaryPeriodOptions.find(
                            (option) => option.value === postDetail.salaryPeriod
                          )}
                          onChange={(e) => {
                            postDataStore('salaryPeriod', e.value);
                          }}
                          name="salaryPeriod"
                          options={salaryPeriodOptions}
                          isSearchable
                          placeholder="Select Salary Period"
                        />
                      </>
                    )}
                  </Field>
                  <ErrorMessage
                    name="salaryPeriod"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="col-md-4 mt-3">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Gender
                    <span className="required text-primary">*</span>
                  </label>
                  <Field
                    name="preferredGender"
                    className="search-select-form-field"
                  >
                    {({ field, form }) => (
                      <>
                        <Select
                          className="form-input search-select-form"
                          value={preferredGenderOptions.find(
                            (option) =>
                              option.value === postDetail.preferredGender
                          )}
                          onChange={(e) => {
                            postDataStore('preferredGender', e.value);
                          }}
                          name="preferredGender"
                          options={preferredGenderOptions}
                          isSearchable
                          placeholder="Select Gender"
                        />
                      </>
                    )}
                  </Field>
                  <ErrorMessage
                    name="preferredGender"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="col-md-4 mt-3">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Type<span className="required text-primary">*</span>
                  </label>
                  <Field name="jobtype" className="search-select-form-field">
                    {({ field, form }) => (
                      <>
                        <Select
                          className="form-input search-select-form"
                          value={jobtypeOptions.find(
                            (option) => option.value === postDetail.jobtype
                          )}
                          onChange={(e) => {
                            postDataStore('jobtype', e.value);
                          }}
                          name="jobtype"
                          options={jobtypeOptions}
                          isSearchable
                          placeholder="Select Job Type"
                        />
                      </>
                    )}
                  </Field>
                  <ErrorMessage
                    name="jobtype"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="logo-upload-container">
                  <div className="logo-upload-labelContainer">
                    <label className="logo-upload-label">
                      Upload Company Logo{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <span
                      className="logo-upload-infoIcon px-2"
                      title="Upload a company logo in JPG, PNG, or GIF format"
                    >
                      ⓘ
                    </span>
                  </div>
                  <div
                    className="logo-upload-fileUploaderContainer"
                    // onClick={() => uploadLogo.current.click()}
                    onDragOver={(e) => e.preventDefault()} // Prevent default behavior to allow drop
                    onDragEnter={(e) => e.preventDefault()} // Optional: Add styles or effects on drag enter
                    onDrop={(e) => {
                      e.preventDefault(); // Prevent the browser's default handling of the file
                      handleDrop(e); // Handle the dropped files
                    }}
                  >
                    {/* Hidden file inputs */}
                    <input
                      type="file"
                      ref={uploadLogo}
                      onChange={(event) => {
                        handleLogoUploadChange(event); // Custom handler to manage file input
                        // handleChange(event); // Also update Formik's state
                      }}
                      className="d-none companyLogo"
                      id="companyLogo"
                      name="companyLogo"
                    />
                    {/* Trigger buttons */}
                    <div className="row">
                      <div className="col-12 mt-3 text-secondary">
                        Drag & drop your file
                      </div>
                      <div className="col-12 logo-upload-previewContainer mt-3">
                        <div
                          className="logo-upload-fileSlot mt-1 pt-1"
                          onClick={() => uploadLogo.current.click()}
                        >
                          <div className="logo-upload-uploadSlot-btn">
                            <div className="logo-upload-uploadText">+</div>
                            <span className="logo-upload-uploadLabel">
                              Upload
                            </span>
                          </div>
                        </div>

                        {/* Preview section */}
                        {uploadLogoPictures.map((file, index) => (
                          <div
                            key={index}
                            className="logo-uploaded-img-fileSlot"
                          >
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index}`}
                              className="rounded logo-upload-filePreview"
                            />
                            <CircleX
                              className="img-delete-icon"
                              onClick={() => deleteUploadImage(index)}
                            />
                          </div>
                        ))}
                        {uploadLogoPictures.length === 0 ? (
                          <div className="logo-uploaded-img-fileSlot"></div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                  <ErrorMessage
                    name="companyLogo"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-12">
                    <label className="block text-sm font-medium text-gray-700">
                      Company / Organization Name{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      id="companyName"
                      name="companyName"
                      type="text"
                      onChange={handleChangeText}
                      value={postDetail.companyName}
                      placeholder="Enter company Name"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="companyName"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="block text-sm font-medium text-gray-700">
                      About Company{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="textarea"
                      id="aboutCompany"
                      name="aboutCompany"
                      onChange={handleChangeText}
                      value={postDetail.aboutCompany}
                      placeholder="Enter company details"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="4"
                    />
                    <ErrorMessage
                      name="aboutCompany"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    );
  };

  // Create a Formik ref
  const thirdStepFormikRef = useRef();
  // Define the validation schema using Yup
  const thirdStepperFormValidationSchema = Yup.object().shape({
    companyAddress:
      postDetail.companyAddress !== ''
        ? Yup.string()
        : Yup.string().required('Company Address is required'),
    countryId:
      postDetail.countryId !== ''
        ? Yup.string()
        : Yup.string().required('Country is required'),
    stateId:
      postDetail.stateId !== ''
        ? Yup.string()
        : Yup.string().required('State is required'),
    // cityId: postDetail.cityId !== '' ? Yup.string() : Yup.string().required('City is required'),
  });
  const stepThreeLayout = () => {
    return (
      <div>
        <Formik
          innerRef={thirdStepFormikRef}
          initialValues={{
            companyAddress: postDetail.companyAddress || '',
            countryId: postDetail.countryId || '',
            stateId: postDetail.stateId || '',
            cityId: postDetail.cityId || '',
          }}
          validationSchema={thirdStepperFormValidationSchema}
          onSubmit={(values) => {
            handleNext();
          }}
        >
          <Form>
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6 mt-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="leftInput"
                >
                  Search Location on Map
                </label>
                <div
                  className="input-group rounded d-flex mt-2"
                  style={{ height: '18%' }}
                >
                  <App postData={postDataStore} />
                </div>
              </div>

              {/* Right Column */}
              <div className="col-md-6 mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Company / Work Location Address{' '}
                  <span className="required text-primary">*</span>
                </label>
                <Field
                  id="companyAddress"
                  name="companyAddress"
                  type="text"
                  onChange={handleChangeText}
                  value={postDetail.companyAddress}
                  placeholder="Enter company Name"
                  className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="companyAddress"
                  component="div"
                  className="error"
                />

                <label className="block text-sm font-medium text-gray-700 mt-3">
                  Country<span className="required text-primary">*</span>
                </label>
                <Field
                  onChange={(e) => {
                    handleChangeText(e);
                    handleCountryChange(e);
                  }}
                  value={postDetail.countryId}
                  as="select"
                  name="countryId"
                  className="form-input"
                >
                  <option value="" disabled label="Select Country" />
                  {countries.map((country) => (
                    <option value={country.isoCode} label={country.name} />
                  ))}
                </Field>
                <ErrorMessage
                  name="countryId"
                  component="div"
                  className="error"
                />

                <label className="block text-sm font-medium text-gray-700 mt-3">
                  Region<span className="required text-primary">*</span>
                </label>
                <Field
                  onChange={(e) => {
                    handleChangeText(e);
                    handleStateChange(e);
                  }}
                  value={postDetail.stateId}
                  as="select"
                  name="stateId"
                  className="form-input"
                >
                  <option value="" disabled label="Select State" />
                  {states.map((state) => (
                    <option value={state.isoCode} label={state.name} />
                  ))}
                </Field>
                <ErrorMessage
                  name="stateId"
                  component="div"
                  className="error"
                />

                <label className="block text-sm font-medium text-gray-700 mt-3">
                  City<span className="required text-primary">*</span>
                </label>
                <Field
                  onChange={handleChangeText}
                  value={postDetail.cityId}
                  as="select"
                  name="cityId"
                  className="form-input"
                >
                  <option value="" disabled label="Select City" />
                  {cities.map((city) => (
                    <option value={city.name} label={city.name} />
                  ))}
                </Field>
                <ErrorMessage name="cityId" component="div" className="error" />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    );
  };

  const postJobSubmit = () => {
    dispatch(postJob(postDetail));
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
        <Box sx={{ width: '100%' }}>
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
                  {[
                    'Contract',
                    'Full-time',
                    'Part-time',
                    'Temporary',
                    'Internship',
                  ].map((job, index) => (
                    <div className="col-md-3 mt-3">
                      <Card
                        onClick={() => JobCardClick(job)}
                        className={
                          activeJobCards.includes(job)
                            ? 'card-wrap-container active-category-card'
                            : 'card-wrap-container'
                        }
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: '1 0 auto',
                            width: '70%',
                            paddingLeft: '5px',
                          }}
                        >
                          <CardContent>{job}</CardContent>
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '30%',
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
                  ))}
                </div>
              ) : activeStep === 1 ? (
                stepTwoLayout()
              ) : activeStep === 2 ? (
                stepThreeLayout()
              ) : (
                <></>
              )}
              <div className="row">
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <span className="text-danger pl-3">{pageWarning}</span>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button
                    className={activeStep === 0 ? 'd-none' : 'stepper-btn'}
                    color="inherit"
                    variant="outline"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    className="stepper-btn"
                    variant="default"
                    onClick={() => {
                      if (activeStep === 1) {
                        // Submit the form using Formik ref
                        secondStepFormikRef.current.submitForm();
                      } else if (activeStep === 2) {
                        // Submit the form using Formik ref
                        thirdStepFormikRef.current.submitForm();
                      } else {
                        // Move to the next step
                        handleNext();
                      }
                    }}
                  >
                    {/* onClick={handleNext}> */}
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
