// app/screens/FileXmlScreen.js
import React, { useState } from 'react';
import { View, Button, ScrollView, Text } from 'react-native';
import parseXmlToFormData from '../utils/xmlParser';
import FormRenderer from '../components/FormRenderer';

// Sample XML string (you can load from file if needed)
const sampleXml = `
<form>
  <field type="text" label="Name" />
  <field type="datetime" label="Appointment Time" />
  <field type="radio" label="Gender">
    <option>Male</option>
    <option>Female</option>
  </field>
  <field type="drawing" label="Signature" />
</form>
`;

const FileXmlScreen = () => {
  const [formData, setFormData] = useState(null);

  const handleRender = () => {
    try {
      const parsed = parseXmlToFormData(sampleXml);
      setFormData(parsed);
    } catch (error) {
      console.error('Invalid XML:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Button title="Render Predefined XML Form" onPress={handleRender} />
      {formData ? <FormRenderer formData={formData} /> : <Text style={{ marginTop: 20 }}>Click button to render form</Text>}
    </ScrollView>
  );
};

export default FileXmlScreen;
