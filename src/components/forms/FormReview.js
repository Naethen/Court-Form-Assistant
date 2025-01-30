import React from 'react';
import { Grid, Typography, Paper, List, ListItem, ListItemText, Button } from '@mui/material';
import { useFormikContext } from 'formik';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
});

const FormDocument = ({ values, formType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>{formType.toUpperCase()} FORM</Text>
        
        <Text style={styles.subheading}>Personal Information</Text>
        <Text style={styles.text}>Name: {values.firstName} {values.lastName}</Text>
        <Text style={styles.text}>Email: {values.email}</Text>
        <Text style={styles.text}>Phone: {values.phone}</Text>
        <Text style={styles.text}>Address: {values.address}</Text>
        <Text style={styles.text}>City: {values.city}</Text>
        <Text style={styles.text}>State: {values.state}</Text>
        <Text style={styles.text}>ZIP: {values.zipCode}</Text>

        {formType === 'small-claims' && (
          <>
            <Text style={styles.subheading}>Claim Information</Text>
            <Text style={styles.text}>Claim Type: {values.claimType}</Text>
            <Text style={styles.text}>Amount: ${values.claimAmount}</Text>
            <Text style={styles.text}>Description: {values.claimDescription}</Text>
            <Text style={styles.text}>Defendant: {values.defendantName}</Text>
            <Text style={styles.text}>Defendant Address: {values.defendantAddress}</Text>
          </>
        )}
      </View>
    </Page>
  </Document>
);

function FormReview({ formType }) {
  const { values } = useFormikContext();

  const renderField = (label, value) => (
    <ListItem>
      <ListItemText
        primary={label}
        secondary={value}
      />
    </ListItem>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Review Your Information
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Personal Information
          </Typography>
          <List>
            {renderField('Name', `${values.firstName} ${values.lastName}`)}
            {renderField('Email', values.email)}
            {renderField('Phone', values.phone)}
            {renderField('Address', values.address)}
            {renderField('City', values.city)}
            {renderField('State', values.state)}
            {renderField('ZIP Code', values.zipCode)}
          </List>
        </Paper>
      </Grid>

      {formType === 'small-claims' && (
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Claim Information
            </Typography>
            <List>
              {renderField('Type of Claim', values.claimType)}
              {renderField('Claim Amount', `$${values.claimAmount}`)}
              {renderField('Claim Description', values.claimDescription)}
              {renderField('Defendant Name', values.defendantName)}
              {renderField('Defendant Address', values.defendantAddress)}
            </List>
          </Paper>
        </Grid>
      )}

      <Grid item xs={12} sx={{ mt: 2 }}>
        <PDFDownloadLink
          document={<FormDocument values={values} formType={formType} />}
          fileName={`${formType}-form.pdf`}
        >
          {({ blob, url, loading, error }) => (
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </Button>
          )}
        </PDFDownloadLink>
      </Grid>
    </Grid>
  );
}

export default FormReview;
