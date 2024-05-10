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

const UpdateQuote = ({route}) => {
  const [loading, setLoading] = useState(false);
  const {selectedQuote} = route.params;
  const [updatedQuote, setUpdatedQuote] = useState(selectedQuote);

  const quoteHandler = (name, value) => {
    setUpdatedQuote({...updatedQuote, [name]: value});
  };

  const clearFields = () => {
    setUpdatedQuote({
      title: '',
      category: '',
    });
  };

  const handleUpdateQuote = async e => {
    try {
      setLoading(true);

      const quoteData = {
        ...updatedQuote,
      };

      const updateQuoteResponse = await axios.patch(
        `https://jokerdiary.onrender.com/api/quotes/updateQuotes/${selectedQuote._id}`,
        quoteData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (updateQuoteResponse.data.success) {
        alert('Quote Has Been Updated Successfully!');
        clearFields();
      } else {
        alert('Error Occurred During Quote Updation');
      }
    } catch (error) {
      console.error('Error updating quote:', error);
      if (error.response) {
        console.error('Server error response:', error.response);
      }
      alert('Error updating quote: ' + error.message);
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
          value={updatedQuote.title}
          onChangeText={text => quoteHandler('title', text)}
        />

        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={updatedQuote.category}
            onValueChange={itemValue => quoteHandler('category', itemValue)}>
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

        <TouchableOpacity style={styles.button} onPress={handleUpdateQuote}>
          {loading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={styles.buttonText}>Update Quote</Text>
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

export default UpdateQuote;
