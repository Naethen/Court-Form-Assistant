import React from 'react';
import { Grid, TextField, MenuItem, Typography } from '@mui/material';
import { useFormikContext } from 'formik';

const claimTypes = [
  'Breach of Contract',
  'Property Damage',
  'Personal Injury',
  'Unpaid Debt',
  'Other'
];

function SmallClaimsDetails() {
  const { values, handleChange, handleBlur, errors, touched } = useFormikContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Claim Information
        </Typography>
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          select
          fullWidth
          id="claimType"
          name="claimType"
          label="Type of Claim"
          value={values.claimType || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.claimType && Boolean(errors.claimType)}
          helperText={touched.claimType && errors.claimType}
        >
          {claimTypes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          id="claimAmount"
          name="claimAmount"
          label="Claim Amount ($)"
          type="number"
          value={values.claimAmount || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.claimAmount && Boolean(errors.claimAmount)}
          helperText={touched.claimAmount && errors.claimAmount}
          InputProps={{ inputProps: { min: 0, max: 10000 } }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          id="claimDescription"
          name="claimDescription"
          label="Describe Your Claim"
          value={values.claimDescription || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.claimDescription && Boolean(errors.claimDescription)}
          helperText={touched.claimDescription && errors.claimDescription}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          id="defendantName"
          name="defendantName"
          label="Defendant's Full Name"
          value={values.defendantName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.defendantName && Boolean(errors.defendantName)}
          helperText={touched.defendantName && errors.defendantName}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          id="defendantAddress"
          name="defendantAddress"
          label="Defendant's Address"
          value={values.defendantAddress || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.defendantAddress && Boolean(errors.defendantAddress)}
          helperText={touched.defendantAddress && errors.defendantAddress}
        />
      </Grid>
    </Grid>
  );
}

export default SmallClaimsDetails;
