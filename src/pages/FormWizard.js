import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import PersonalInfo from '../components/forms/PersonalInfo';
import SmallClaimsDetails from '../components/forms/SmallClaimsDetails';
import FormReview from '../components/forms/FormReview';

const steps = ['Personal Information', 'Case Details', 'Review & Generate'];

const initialValues = {
  // Personal Info
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  
  // Small Claims
  claimType: '',
  claimAmount: '',
  claimDescription: '',
  defendantName: '',
  defendantAddress: '',
};

const validationSchema = Yup.object({
  // Personal Info
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  phone: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  
  // Small Claims (conditionally required)
  claimType: Yup.string().when('$formType', {
    is: 'small-claims',
    then: Yup.string().required('Required'),
  }),
  claimAmount: Yup.number().when('$formType', {
    is: 'small-claims',
    then: Yup.number()
      .required('Required')
      .min(0, 'Amount must be positive')
      .max(10000, 'Amount cannot exceed $10,000'),
  }),
  claimDescription: Yup.string().when('$formType', {
    is: 'small-claims',
    then: Yup.string()
      .required('Required')
      .min(20, 'Please provide more detail')
      .max(1000, 'Description is too long'),
  }),
  defendantName: Yup.string().when('$formType', {
    is: 'small-claims',
    then: Yup.string().required('Required'),
  }),
  defendantAddress: Yup.string().when('$formType', {
    is: 'small-claims',
    then: Yup.string().required('Required'),
  }),
});

const pageVariants = {
  initial: {
    opacity: 0,
    x: '-100vw',
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    x: '100vw',
  },
};

function FormWizard() {
  const { formType } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  
  // Load saved form data from localStorage
  const savedData = localStorage.getItem(`form-${formType}`);
  const initialFormData = savedData ? JSON.parse(savedData) : initialValues;

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step) => {
    const content = (() => {
      switch (step) {
        case 0:
          return <PersonalInfo />;
        case 1:
          switch (formType) {
            case 'small-claims':
              return <SmallClaimsDetails />;
            default:
              return <Typography>Form type not implemented yet</Typography>;
          }
        case 2:
          return <FormReview formType={formType} />;
        default:
          return 'Unknown step';
      }
    })();

    return (
      <motion.div
        key={step}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {content}
      </motion.div>
    );
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Save form data to localStorage
    localStorage.setItem(`form-${formType}`, JSON.stringify(values));
    
    if (activeStep === steps.length - 1) {
      // Show success animation
      console.log('Form submitted:', values);
    } else {
      handleNext();
    }
    setSubmitting(false);
  };

  return (
    <Container className="content">
      <Paper 
        elevation={3} 
        className="form-container"
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          component="h1" 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          {formType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Form
        </Typography>
        
        <Box sx={{ width: '100%', mb: 4 }}>
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              '& .MuiStepLabel-root .Mui-completed': {
                color: '#2196F3',
              },
              '& .MuiStepLabel-root .Mui-active': {
                color: '#21CBF3',
              },
            }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Formik
          initialValues={initialFormData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnMount={false}
        >
          {(formik) => (
            <Form>
              <AnimatePresence mode="wait">
                {getStepContent(activeStep)}
              </AnimatePresence>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                mt: 3,
                '& .MuiButton-root': {
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  },
                },
              }}>
                {activeStep !== 0 && (
                  <Button 
                    onClick={handleBack} 
                    sx={{ 
                      mr: 1,
                      color: '#666',
                    }}
                  >
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  type="submit"
                  disabled={activeStep === steps.length - 1 && !formik.isValid}
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976D2 30%, #1CA7D2 90%)',
                    }
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Generate PDF' : 'Next'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default FormWizard;
