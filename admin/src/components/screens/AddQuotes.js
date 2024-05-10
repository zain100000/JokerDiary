import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);

  const [addQuote, setAddQuote] = useState({
    title: '',
    category: '',
  });

  const QuoteHandler = (name, value) => {
    setAddQuote({...addQuote, [name]: value});
  };

  const clearFields = () => {
    setAddQuote({
      title: '',
      category: '',
    });
  };

  const handleAddQuotes = async () => {
    try {
      setLoading(true);

      const quoteData = {...addQuote};

      const addQuoteResponse = await axios.post(
        'https://jokerdiary.onrender.com/api/quotes/addQuotes',
        quoteData,
        {
          headers: {
            'Content-Type': 'application/json',
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
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#000"
          value={addQuote.title}
          onChangeText={text => QuoteHandler('title', text)}
        />

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
  },

  inputContainer: {
    width: '80%',
  },

  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color:'#000'
  },

  pickerContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
  },

  picker: {
    color: '#000',
  },

  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddProduct;
