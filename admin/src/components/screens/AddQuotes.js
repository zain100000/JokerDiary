import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [addQuote, setAddQuote] = useState({
    image: '',
    category: '',
  });

  const QuoteHandler = (name, value) => {
    setAddQuote({...addQuote, [name]: value});
  };

  const imageHandler = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setImage(res);
      setAddQuote({...addQuote, image: res});
    } catch (err) {
      console.log(err);
    }
  };

  const clearFields = () => {
    setAddQuote({
      image: '',
      category: '',
    });
    setImage(null);
  };

  const handleAddQuotes = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
      formData.append('category', addQuote.category);

      const addQuoteResponse = await axios.post(
        'https://messagestime.com/api/quotes/addQuotes',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (addQuoteResponse.data.success) {
        alert('Quote Added Successfully!');
        clearFields();
      } else {
        alert('Error Occurred During Quote Addition');
      }
    } catch (error) {
      console.error('Error adding quote:', error);
      alert('Error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={imageHandler} style={styles.uploadContainer}>
          <MaterialCommunityIcons name="upload-outline" size={45} />
          <Text style={styles.uploadText}>Upload Quote</Text>
        </TouchableOpacity>

        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={addQuote.category}
            onValueChange={itemValue => QuoteHandler('category', itemValue)}>
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Joker" value="Joker" />
            <Picker.Item label="Alone" value="Alone" />
            <Picker.Item label="Angry" value="Angry" />
            <Picker.Item label="Attitude" value="Attitude" />
            <Picker.Item label="Breakup" value="Breakup" />
            <Picker.Item label="Emotional" value="Emotional" />
            <Picker.Item label="Family" value="Family" />
            <Picker.Item label="Fathers Day" value="Fathers Day" />
            <Picker.Item label="Friends" value="Friends" />
            <Picker.Item label="Funny" value="Funny" />
            <Picker.Item label="Good Morning" value="Good Morning" />
            <Picker.Item label="Good Night" value="Good Night" />
            <Picker.Item label="Happiness" value="Happiness" />
            <Picker.Item label="Inspirational" value="Inspirational" />
            <Picker.Item label="Love" value="Love" />
            <Picker.Item label="Mothers Day" value="Mothers Day" />
            <Picker.Item label="Motivational" value="Motivational" />
            <Picker.Item label="Relationship" value="Relationship" />
            <Picker.Item label="Sad" value="Sad" />
            <Picker.Item label="Trust" value="Trust" />
          </Picker>
        </View>

        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{uri: image.uri}} style={styles.image} />
          ) : (
            <Text style={{marginBottom: 50}}>No Files Selected</Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddQuotes}>
          {loading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={styles.buttonText}>Add Quote</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },

  inputContainer: {
    width: '80%',
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  uploadContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },

  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },

  pickerContainer: {
    marginBottom: 80,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    width: '100%',
  },

  picker: {
    color: '#fff',
    width: '100%',
  },

  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },

  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddProduct;
