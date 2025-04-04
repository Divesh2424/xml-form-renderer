// app/components/FormRenderer.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SignatureCanvas from 'react-native-signature-canvas';

export default function FormRenderer({ formData }) {
  const [formValues, setFormValues] = useState({});
  const [datePickersVisible, setDatePickersVisible] = useState({});

  const handleChange = (label, value) => {
    setFormValues((prev) => ({ ...prev, [label]: value }));
  };

  const toggleDatePicker = (label) => {
    setDatePickersVisible((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formValues);
    Alert.alert('Submitted Data', JSON.stringify(formValues, null, 2));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {formData.map((field, index) => {
        switch (field.type) {
          case 'text':
            return (
              <View key={index} style={styles.fieldContainer}>
                <Text>{field.label}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => handleChange(field.label, text)}
                  value={formValues[field.label] || ''}
                />
              </View>
            );

          case 'date':
            return (
              <View key={index} style={styles.fieldContainer}>
                <Text>{field.label}</Text>
                <Button
                  title="Select Date"
                  onPress={() => toggleDatePicker(field.label)}
                />
                {datePickersVisible[field.label] && (
                  <DateTimePicker
                    value={
                      formValues[field.label]
                        ? new Date(formValues[field.label])
                        : new Date()
                    }
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, date) => {
                      if (date) {
                        handleChange(field.label, date.toDateString());
                      }
                      toggleDatePicker(field.label);
                    }}
                  />
                )}
                <Text style={styles.selectedText}>
                  {formValues[field.label] || 'No date selected'}
                </Text>
              </View>
            );

          case 'radio':
            return (
              <View key={index} style={styles.fieldContainer}>
                <Text>{field.label}</Text>
                {field.options.map((option, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleChange(field.label, option)}
                    style={[
                      styles.radioButton,
                      formValues[field.label] === option && styles.radioButtonSelected,
                    ]}
                  >
                    <Text style={styles.radioText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            );

          case 'drawing':
            return (
              <View key={index} style={styles.fieldContainer}>
                <Text>{field.label}</Text>
                <View style={styles.signatureBox}>
                  <SignatureCanvas
                    onOK={(sig) => handleChange(field.label, sig)}
                    descriptionText="Sign or Draw"
                    clearText="Clear"
                    confirmText="Save"
                    webStyle={signatureStyles}
                  />
                </View>
              </View>
            );

          default:
            return null;
        }
      })}

      <View style={styles.submitButton}>
        <Button title="Submit Form" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
  selectedText: {
    marginTop: 5,
    fontStyle: 'italic',
    color: '#555',
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    marginTop: 5,
  },
  radioButtonSelected: {
    backgroundColor: '#cce5ff',
    borderColor: '#3399ff',
  },
  radioText: {
    fontSize: 16,
  },
  signatureBox: {
    height: 200,
    borderWidth: 1,
    borderColor: '#888',
    marginTop: 10,
  },
  submitButton: {
    marginTop: 30,
  },
});

const signatureStyles = `
  .m-signature-pad {
    box-shadow: none;
    border: none;
  }
  .m-signature-pad--body {
    border: 1px solid #000;
  }
  .m-signature-pad--footer {
    display: flex;
    justify-content: space-between;
  }
  body,html {
    width: 100%; height: 200px; margin: 0;
  }
`;

