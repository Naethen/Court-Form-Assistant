import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  field: {
    fontSize: 12,
    marginBottom: 10
  }
});

const CourtFormDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Court Form Document</Text>
        {Object.entries(formData).map(([key, value]) => (
          <Text key={key} style={styles.field}>
            {key}: {value}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

const PDFGenerator = ({ formData }) => {
  return (
    <div className="pdf-generator">
      <PDFDownloadLink
        document={<CourtFormDocument formData={formData} />}
        fileName="court-form.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : 'Download PDF'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PDFGenerator;
