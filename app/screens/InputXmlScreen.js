// app/screens/InputXmlScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Alert, Text } from 'react-native';
import parseXmlToFormData from '../utils/xmlParser';
import FormRenderer from '../components/FormRenderer';

const InputXmlScreen = () => {
  const [xmlInput, setXmlInput] = useState('');
  const [formData, setFormData] = useState(null);

  const handleRender = () => {
    try {
      if (!xmlInput.trim()) {
        Alert.alert('Error', 'Please enter some XML input.');
        return;
      }

      const parsed = parseXmlToFormData(xmlInput);

      if (!Array.isArray(parsed) || parsed.length === 0) {
        Alert.alert('Error', 'No valid fields found in XML.');
        return;
      }

      setFormData(parsed);
    } catch (error) {
      console.error('XML Parsing Error:', error);
      Alert.alert('Error', 'Invalid XML format or missing required elements.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{
        marginBottom: 10,
        color: '#333',
        fontStyle: 'italic',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 6
      }}>
        💡 Only the following field types are supported: {'\n'}text, date/datetime, radio, and drawing.
      </Text>

      <TextInput
        style={{
          height: 150,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 12,
          padding: 10,
          textAlignVertical: 'top',
        }}
        multiline
        placeholder="<form>...</form>"
        value={xmlInput}
        onChangeText={setXmlInput}
      />
      <Button title="Render Form from Input XML" onPress={handleRender} />
      {formData && <FormRenderer formData={formData} />}
    </ScrollView>
  );
};

export default InputXmlScreen;
