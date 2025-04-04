// app/utils/xmlParser.js
import { XMLParser } from 'fast-xml-parser';

const parseXmlToFormData = (xmlString) => {
  const parser = new XMLParser({
    ignoreAttributes: false,
  });

  const jsonObj = parser.parse(xmlString);

  // Normalize form structure
  const fields = jsonObj.form.field;

  // Ensure it's always an array
  const fieldArray = Array.isArray(fields) ? fields : [fields];

  const result = fieldArray.map((field) => {
    const { type, label } = field['@_type'] ? field : { type: field.type, label: field.label };

    let options = [];
    if (field.option) {
      options = Array.isArray(field.option) ? field.option : [field.option];
    }

    return {
      type: field['@_type'] || type,
      label: field['@_label'] || label,
      options,
    };
  });

  return result;
};

export default parseXmlToFormData;
