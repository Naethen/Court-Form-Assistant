import React from 'react';
import { Grid, TextField } from '@mui/material';
import { useFormikContext } from 'formik';

function PersonalInfo() {
  const { values, handleChange, handleBlur, errors, touched } = useFormikContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="phone"
          name="phone"
          label="Phone Number"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="address"
          name="address"
          label="Street Address"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address && Boolean(errors.address)}
          helperText={touched.address && errors.address}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.city && Boolean(errors.city)}
          helperText={touched.city && errors.city}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          id="state"
          name="state"
          label="State"
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.state && Boolean(errors.state)}
          helperText={touched.state && errors.state}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          id="zipCode"
          name="zipCode"
          label="ZIP Code"
          value={values.zipCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.zipCode && Boolean(errors.zipCode)}
          helperText={touched.zipCode && errors.zipCode}
        />
      </Grid>
    </Grid>
  );
}

export default PersonalInfo;
