import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button } from '../MyButton/CustomButton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Select from 'react-select';
import { ChevronsRight } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Description } from '@radix-ui/react-dialog';
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

const uploadPictures = ['JPG', 'PNG', 'GIF'];
const parentImgPath = './Parent category';
const childImgPath = './Child Category';

const steps = [
  'Selected Category',
  'Select Sub Category',
  'Details',
  'Extra Details',
  'Images',
  'Location',
];

const libraries = ['places']; // Load the Places library

const PostProduct = () => {
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
    userId: '',
  });

  // const [companyLogoFile, setCompanyLogoFile] = useState([]);
  // const handleLogoUploadChange = (fileList) => {
  //     // Ensure `fileList` is converted to a proper array
  //     const newFiles = Array.from(fileList);

  //     // Use functional update form to ensure proper merging of files
  //     setCompanyLogoFile((prevFiles) => {
  //         const updatedFiles = [...prevFiles, ...newFiles];
  //         return updatedFiles;
  //     });
  // };
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [ProfilePicture, setProfilePicture] = useState([]);
  const [ProductPicture, setProductPicture] = useState([]);
  const [uploadPictures, setUploadPicture] = useState([]);
  const [stepThreeValidate, setStepThreeValidate] = useState(false);
  const [stepperValidateArr, setStepperValidateArr] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [userDetail, setUserDetail] = useState('');

  // Refs for file inputs
  const profileInputRef = useRef(null);
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
    // Check if userDetail exists in localStorage
    const storedUserDetail = localStorage.getItem('userDetail');
    if (storedUserDetail) {
      console.log(storedUserDetail);

      setUserDetail(JSON.parse(storedUserDetail)); // Parse and update state
    }
  }, []); // Dependency array

  //     //   useEffect(() => {
  //     //     if (navigator.geolocation) {
  //     //       navigator.geolocation.getCurrentPosition(
  //     //         (position) => {
  //     //           const { latitude, longitude } = position.coords;
  //     //           setPostDetail((prevData) => ({
  //     //             ...prevData,
  //     //             latitude: latitude.toString(),
  //     //             longitude: longitude.toString(),
  //     //           }));
  //     //         },
  //     //         (error) => {
  //     //           console.error("Error getting location:", error);
  //     //         }
  //     //       );
  //     //     } else {
  //     //       console.error("Geolocation is not supported by this browser.");
  //     //     }
  //     //   }, []);

  //         // Fetch all countries on component mount
  useEffect(() => {
    dispatch(getCountries());
  }, []);

  //   // Update states when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      dispatch(getStates(selectedCountry));
      postDataStore('countryId', selectedCountry);
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
      postDataStore('stateId', selectedState);
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

  const handleProfileUploadChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setProfilePicture((prevFiles) => [...prevFiles, ...newFiles]);
    setUploadPicture((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleProductUploadChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setProductPicture((prevFiles) => [...prevFiles, ...newFiles]);
    setUploadPicture((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const validateStepper = async () => {
    if (activeStep === 0) {
      if (postDetail.categoryId === '' || postDetail.subCategoryId === '') {
        setStepperValidateArr((prev) => {
          // Create a copy of the array
          const updatedArray = [...prev];
          // Update the specific index
          updatedArray[activeStep] = true;
          return updatedArray;
        });
        return false;
      } else {
        setStepperValidateArr((prev) => {
          // Create a copy of the array
          const updatedArray = [...prev];
          // Update the specific index
          updatedArray[activeStep] = false;
          return updatedArray;
        });
        return true;
      }
    } else if (activeStep === 2) {
      try {
        // Validate the current step's data against the schema
        const validatedData = await validationSchema.validate(formData, {
          abortEarly: false,
        });

        console.log('Validated data:', validatedData);
        // If validation is successful, proceed to the next step
        // setStep(currentStep + 1);
        return true;
      } catch (err) {
        if (err.inner) {
          // Collect and display validation errors
          const errors = err.inner.reduce((acc, error) => {
            acc[error.path] = error.message;
            return acc;
          }, {});
          console.log('Validation Errors:', errors);
        } else {
          console.error('Unexpected validation error:', err.message);
        }
      }
      // if(stepThreeValidate===true){
      //     return true
      // }else{
      //     return false
      // }
    } else {
      return true;
    }
  };

  const handleNext = () => {
    if (validateStepper()) {
      if (activeStep === 1) {
        dispatch(
          postDropDownValues({
            categoryId: postDetail.categoryId,
            subCategoryId: postDetail.subCategoryId,
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
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const categoryCardClick = (index, key, value, id) => {
    dispatch(
      subCategoryGet({
        categoryId: id,
      })
    );
    setCategoryIndex(index), setCategoryChoose(true);
    subCategoryCardClick(key, value);
    postDataStore('categoryId', id);
    setCategoryLable(value);
    validateStepper();
  };

  // updating a specific key in `postData`
  const subCategoryCardClick = (key, value, id) => {
    setSubCategoryLable(value),
      setPostData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    postDataStore('subCategoryId', id);
    validateStepper();
  };

  const postDataStore = (key, value) => {
    setPostDetail((prevData) => ({
      ...prevData,
      [key]: value,
      userId: userDetail['_id'],
    }));
  };

  const handleChangeText = (e) => {
    const { name, value } = e.target;
    postDataStore(name, value); // Update state with key-value
  };

  const getFormData = (category, subCategory) => {
    let formData = {
      brand: '',
      condition: '',
      delivery_option: '',
      payment_method: '',
    };

    if (
      category === 'Real Estate' &&
      subCategory === 'Office Space for Rent/Lease'
    ) {
      formData = {
        ...formData,
        furnishing: '',
        listed_by: '',
        build_up_area: '',
        carpet_area: '',
        maintenance: '',
        car_parking: '',
        washroom: '',
        project_name: '',
      };
    } else if (
      category === 'Real Estate' &&
      subCategory === 'Shared Rooms/Co-living Spaces'
    ) {
      formData = {
        ...formData,
        condition: '', // For subtype
        furnishing: '',
        listed_by: '',
        car_parking: '',
        meals_included: '',
        build_up_area: '',
      };
    } else if (category === 'Real Estate' && subCategory === 'Land & Plots') {
      formData = {
        ...formData,
        condition: '', // For listed by
        plot_area: '',
        length: '',
        breadth: '',
        facing: '',
      };
    }

    return formData;
  };

  const getValidationSchema = (category, subCategory) => {
    let schema = {
      brand: Yup.string().required('Brand is required'),
      condition: Yup.string().required('Condition is required'),
      delivery_option: Yup.string().required('Delivery option is required'),
      payment_method: Yup.string().required('Payment method is required'),
    };

    if (
      category === 'Real Estate' &&
      subCategory === 'Office Space for Rent/Lease'
    ) {
      schema = {
        ...schema,
        furnishing: Yup.string().required('Furnishing is required'),
        listed_by: Yup.string().required('Listed by is required'),
        build_up_area: Yup.number()
          .required('Super Builtup Area Sqft is required')
          .typeError('Must be a number'),
        carpet_area: Yup.number()
          .required('Carpet Area Sqft is required')
          .typeError('Must be a number'),
        maintenance: Yup.number()
          .required('Maintenance is required')
          .typeError('Must be a number'),
        car_parking: Yup.string().required('Car Parking is required'),
        washroom: Yup.string().required('Washrooms is required'),
        project_name: Yup.string().required('Project Name is required'),
      };
    } else if (
      category === 'Real Estate' &&
      subCategory === 'Shared Rooms/Co-living Spaces'
    ) {
      schema = {
        ...schema,
        condition: Yup.string().required('Subtype is required'),
        furnishing: Yup.string().required('Furnishing is required'),
        listed_by: Yup.string().required('Listed by is required'),
        car_parking: Yup.string().required('Car Parking is required'),
        meals_included: Yup.string().required('Meals included is required'),
        build_up_area: Yup.number()
          .required('Super Builtup Area Sqft is required')
          .typeError('Must be a number'),
      };
    } else if (category === 'Real Estate' && subCategory === 'Land & Plots') {
      schema = {
        ...schema,
        condition: Yup.string().required('Listed by is required'),
        plot_area: Yup.number()
          .required('Plot Area is required')
          .typeError('Must be a number'),
        length: Yup.number()
          .required('Length is required')
          .typeError('Must be a number'),
        breadth: Yup.number()
          .required('Breath is required')
          .typeError('Must be a number'),
        facing: Yup.string().required('Facing is required'),
      };
    }

    return Yup.object(schema);
  };

  const formData = getFormData(postData.category, postData.sub_category);

  const stepThreeLayout = () => {
    const validationSchema = getValidationSchema(
      postData.category,
      postData.sub_category
    );
    return (
      <div className="container mt-4">
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // setStepThreeValidate(true)
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              {postData.category === 'Real Estate' &&
              postData.sub_category === 'Office Space for Rent/Lease' ? (
                <div className="row">
                  <h6 className="mb-3">Enter Extra Details</h6>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Furnishing{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="furnishing"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Furnishing') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                    {errors.furnishing && touched.furnishing && (
                      <div className="text-danger">{errors.furnishing}</div>
                    )}
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Listed by <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="listed_by"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Listed by') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                    {errors.listed_by && touched.listed_by && (
                      <div className="text-danger">{errors.listed_by}</div>
                    )}
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Super Builtup Area Sqft{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="build_up_area"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter sqft"
                    />
                    <ErrorMessage
                      name="build_up_area"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Carpet Area Sqft{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <input
                      name="carpet_area"
                      type="text"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter sqft"
                    />
                    {errors.carpet_area && touched.carpet_area && (
                      <div className="text-danger">{errors.carpet_area}</div>
                    )}
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Maintenance (Monthly)
                      <span className="required text-primary">*</span>
                    </label>
                    <input
                      name="maintenance"
                      type="text"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter amount"
                    />
                    {errors.maintenance && touched.maintenance && (
                      <div className="text-danger">{errors.maintenance}</div>
                    )}
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Car Parking
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="car_parking"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Car Parking') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                    {errors.car_parking && touched.car_parking && (
                      <div className="text-danger">{errors.car_parking}</div>
                    )}
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Washrooms<span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="washroom"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Washrooms') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                    {errors.washroom && touched.washroom && (
                      <div className="text-danger">{errors.washroom}</div>
                    )}
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Project Name{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <input
                      name="project_name"
                      type="text"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter project name"
                    />
                    {errors.project_name && touched.project_name && (
                      <div className="text-danger">{errors.project_name}</div>
                    )}
                  </div>
                </div>
              ) : postData.category === 'Real Estate' &&
                postData.sub_category === 'Shared Rooms/Co-living Spaces' ? (
                <div className="row">
                  <h6 className="mb-3">Enter Extra Details</h6>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Subtype <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Subtype') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Furnishing{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Furnishing') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Listed by <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Listed by') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Car Parking{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Car Parking') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Meals included{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Meals included') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Super Builtup Area Sqft{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter sqft"
                    />
                  </div>
                </div>
              ) : postData.category === 'Real Estate' &&
                postData.sub_category === 'Land & Plots' ? (
                <div className="row">
                  <h6 className="mb-3">Enter Extra Details</h6>

                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Listed by <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Listed by') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Plot Atea <span className="required text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter plot area"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Length <span className="required text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter length"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Breath <span className="required text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter breath"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Facing <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Facing') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Project Name{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter project name"
                    />
                  </div>
                </div>
              ) : postData.category === 'Real Estate' ? (
                <div className="row">
                  <h6 className="mb-3">Enter Extra Details</h6>

                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      BHK<span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="brand"
                      name="bhk"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'BHK') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Bathrooms <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="delivery_option"
                      name="bathrooms"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Bathrooms') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Furnishing{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="furnishing"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Furnishing') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Project Status{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="project_status"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Project Status') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Listed by <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="listed_by"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Listed by') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Super Builtup Area Sqft{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="super_build_up"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter sqft"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Carpet Area Sqft{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="carpet_area"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter sqft"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Maintenance (Monthly)
                      <span className="required text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="maintenance"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Total Floors{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="total_floor"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Total Floors') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Floor No <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Floor No') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Car Parking{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Car Parking') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Facing <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="facing"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Facing') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Project Name{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="project_name"
                      className="form-control mb-3"
                      id="rightInput1"
                      placeholder="Enter project name"
                    />
                  </div>
                </div>
              ) : postData.category === 'Antiques & Collectibles' ? (
                <div className="row">
                  <h6 className="mb-3">Enter Extra Details</h6>

                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Condition<span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="brand"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Condition') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Delivery Options{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="delivery_option"
                      name="delivery_option"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Delivery Options') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Methods Accepted{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Payment Methods Accepted') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                </div>
              ) : postData.category === 'Vehicles' ? (
                <div className="row">
                  <h6 className="mb-3">Enter Extra Details</h6>

                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Brand <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="brand"
                      name="brand"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Brand') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Condition <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Condition') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Delivery Option{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="delivery_option"
                      name="delivery_option"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Delivery Options') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Method Accepted{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="delivery_option"
                      name="delivery_option"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Payment Method Accepted') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      KM driven <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="brand"
                      name="brand"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'KM driven') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      No. Of Owners{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'No. of Owners') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Condition <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="delivery_option"
                      name="delivery_option"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Condition') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Delivery Options{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="delivery_option"
                      name="delivery_option"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Delivery Options') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <h6 className="mb-3">Enter Extra Details</h6>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Brand <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="brand"
                      name="brand"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Brand') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                    <ErrorMessage
                      name="brand"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Condition <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="condition"
                      name="condition"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Condition') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                    <ErrorMessage
                      name="condition"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Delivery Option{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="delivery_option"
                      name="delivery_option"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Delivery Options') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                    <ErrorMessage
                      name="delivery_option"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="col-md-3 mt-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Method Accepted{' '}
                      <span className="required text-primary">*</span>
                    </label>
                    <Field
                      as="select"
                      id="payment_method"
                      name="payment_method"
                      className="mt-1 block w-full border border-gray rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" label="Select" />

                      {dropDownValues.map((item) => {
                        if (item.name === 'Payment Methods Accepted') {
                          return item.options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              label={option}
                            />
                          ));
                        }
                        return null;
                      })}
                    </Field>
                    <ErrorMessage
                      name="payment_method"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              )}
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
            Upload Pictures <span className="required text-primary">*</span>
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
            ref={profileInputRef}
            onChange={handleProfileUploadChange}
            className="d-none profile-picture"
            name="profile-picture"
          />
          <input
            type="file"
            multiple
            ref={productInputRef}
            onChange={handleProductUploadChange}
            className="d-none product-picture"
            name="product-picture"
          />

          {/* Trigger buttons */}

          <div className="logo-upload-previewContainer">
            {uploadPictures.length < 8 ? (
              <>
                <div className="logo-upload-fileSlot">
                  <div className="logo-upload-fileSlot-label">
                    Upload Profile Picture
                  </div>
                  <div
                    className="logo-upload-uploadSlot-btn"
                    onClick={() => profileInputRef.current.click()}
                  >
                    <div className="logo-upload-uploadText">+</div>
                    <span className="logo-upload-uploadLabel">Upload</span>
                  </div>
                </div>

                <div className="logo-upload-fileSlot">
                  <div className="logo-upload-fileSlot-label">
                    Upload Product Picture
                  </div>
                  <div
                    className="logo-upload-uploadSlot-btn"
                    onClick={() => productInputRef.current.click()}
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
            {uploadPictures.map((file, index) => (
              <div key={index} className="logo-uploaded-img-fileSlot">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="rounded logo-upload-filePreview"
                />
              </div>
            ))}
            {[...Array(8 - uploadPictures.length)].map((_, index) => (
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
        <a>Product</a>
        <ChevronsRight style={{ color: '#959595' }} />
        <a>Add Listing</a>
        <ChevronsRight style={{ color: '#959595' }} />
        <a>
          {activeStep === 0
            ? 'Select Category'
            : activeStep === 1
              ? 'Details'
              : activeStep === 2
                ? 'Extra Details'
                : activeStep === 3
                  ? 'Images'
                  : 'Location'}
        </a>
      </div>
      <div className="my-10 border rounded p-3 stepper-container">
        <Box sx={{ width: '100%' }}>
          <Stepper  activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step  key={label} {...stepProps}>
                  <StepLabel></StepLabel>
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
                  <h6 className="mb-3">
                    {categoryChoose ? 'Select Sub-Category' : 'Select Category'}
                  </h6>
                  {categoryChoose ? (
                    <>
                      {subCategoryCard.map((card) => (
                        <div
                          onClick={() =>
                            subCategoryCardClick(
                              'sub_category',
                              card.title,
                              card['_id']
                            )
                          }
                          className="col-md-3 mt-3"
                        >
                          <Card
                            className={
                              subcategoryLable === card.title
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
                                width: '80%',
                              }}
                            >
                              <CardContent>{card.title}</CardContent>
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
                              {card.title ===
                              'Shared Rooms/Co-living Spaces' ? (
                                <CardMedia
                                  component="img"
                                  image={
                                    childImgPath +
                                    '/' +
                                    postData.category +
                                    '/' +
                                    'Co-living Spaces.png'
                                  }
                                  alt={card.title}
                                  sx={{ width: 'auto', height: '50px' }}
                                />
                              ) : card.title ===
                                'Office Space for Rent/Lease' ? (
                                <CardMedia
                                  component="img"
                                  image={
                                    childImgPath +
                                    '/' +
                                    postData.category +
                                    '/' +
                                    'Lease.png'
                                  }
                                  alt={card.title}
                                  sx={{ width: 'auto', height: '50px' }}
                                />
                              ) : (
                                <CardMedia
                                  component="img"
                                  image={
                                    childImgPath +
                                    '/' +
                                    postData.category +
                                    '/' +
                                    card.image
                                  }
                                  alt={card.title}
                                  sx={{ width: 'auto', height: '50px' }}
                                />
                              )}
                            </Box>
                          </Card>
                        </div>
                      ))}
                      {stepperValidateArr[activeStep] ? (
                        <div className="error-msg">
                          Please Select Any Sub Category
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <>
                      {categoryCard.map((card, index) => (
                        <div
                          onClick={() =>
                            categoryCardClick(
                              index,
                              'category',
                              card.title,
                              card['_id']
                            )
                          }
                          className="col-md-3"
                        >
                          <Card
                            className={
                              categoryLable === card.title
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
                                width: '80%',
                              }}
                            >
                              <CardContent>{card.title}</CardContent>
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
                                image={parentImgPath + '/' + card.image}
                                alt={card.title}
                                sx={{ width: 'auto', height: '50px' }}
                              />
                            </Box>
                          </Card>
                        </div>
                      ))}
                      {stepperValidateArr[activeStep] ? (
                        <div className="error-msg">
                          Please Select Any Category
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              ) : activeStep === 1 ? (
                <div className="container mt-4">
                  <Formik
                    initialValues={{ title: '', price: '', description: '' }}
                    validationSchema={Yup.object({
                      title: Yup.string().required('Title is required'),
                      price: Yup.number()
                        .typeError('Price must be a number')
                        .required('Price is required'),
                      description: Yup.string().required(
                        'Description is required'
                      ),
                    })}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    {({ setFieldValue, validateForm }) => (
                      <Form>
                        <div className="row">
                          <h6 className="mb-3">Enter Products Details</h6>
                          <div className="col-md-8">
                            <label className="block text-sm font-medium text-gray-700">
                              Title{' '}
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
                            <ErrorMessage
                              name="title"
                              component="div"
                              className="text-danger mt-1"
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Price{' '}
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
                            <ErrorMessage
                              name="price"
                              component="div"
                              className="text-danger mt-1"
                            />
                          </div>
                          <div className="col-md-12 mt-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Description{' '}
                              <span className="required text-primary">*</span>
                            </label>
                            <CKEditor
                              editor={ClassicEditor}
                              data=""
                              name="description"
                              value={postDetail.description}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                // setFieldValue("description", data);
                                postDataStore('description', data);
                              }}
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="text-danger mt-1"
                            />
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              ) : activeStep === 2 ? (
                stepThreeLayout()
              ) : activeStep === 3 ? (
                stepFourLayout()
              ) : (
                <div className="row">
                  <h6 className="mt-3">Enter Location Details</h6>
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
                      <App postData={postDataStore} />
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
                    <label htmlFor="rightInput3">Region</label>
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
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 ,gap:'10px'}}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button
                    className="stepper-btn"
                    color="inherit"
                    variant="outline"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button className="stepper-btn" onClick={handleNext} variant="default">
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </Box>
              </div>
            </React.Fragment>
          )}
        </Box>
      </div>
      <PostSuccessModal
        submit={'product'}
        show={successModalShow}
        handleClose={() => setSuccessModalShow(false)}
      />
    </div>
  );
};
export default PostProduct;
