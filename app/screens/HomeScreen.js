import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        title="Render Form from XML File"
        onPress={() => navigation.navigate('screens/FileXmlScreen')}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Render Form from XML Input"
        onPress={() => navigation.navigate('screens/InputXmlScreen')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
