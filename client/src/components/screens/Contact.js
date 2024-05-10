import React from 'react';
import {ScrollView} from 'react-native';
import {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../consts/Colors';

const Contact = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContactForm = async () => {
    try {
      setLoading(true);
      const contactFormData = {
        name,
        email,
        mobile,
        message,
      };

      const ContactFormApiUrl =
        'https://jokerdiary.onrender.com/api/contact/uploadContactForm';
      const response = await axios.post(ContactFormApiUrl, contactFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        alert('Thank You! Your Response Has Been Submitted!');
        navigation.navigate("Joker's Diary");
      } else {
        alert('Error Submitting Contact Form!');
      }
    } catch (error) {
      console.error('Error during submitting Contact Form:', error);
      alert('Error During Submitting Contact Form!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={COLORS.dark}
              autoCapitalize="none"
              value={name}
              onChangeText={text => setName(text)}
            />
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={30}
              style={styles.icon}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={COLORS.dark}
              autoCapitalize="none"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <MaterialCommunityIcons
              name="email-outline"
              size={30}
              style={styles.icon}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.input}
              placeholder="Mobile"
              placeholderTextColor={COLORS.dark}
              autoCapitalize="none"
              keyboardType="number-pad"
              value={mobile}
              onChangeText={text => setMobile(text)}
            />
            <MaterialCommunityIcons
              name="phone-outline"
              size={30}
              style={styles.icon}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.input}
              placeholder="Message"
              placeholderTextColor={COLORS.dark}
              autoCapitalize="none"
              value={message}
              onChangeText={text => setMessage(text)}
            />
            <MaterialCommunityIcons
              name="comment-outline"
              size={30}
              style={styles.icon}
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleContactForm}>
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.btnText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  formContainer: {
    padding: 20,
    marginTop: 100,
  },

  input: {
    borderWidth: 2,
    borderColor: COLORS.dark,
    paddingTop: 20,
    paddingLeft: 35,
    marginBottom: 20,
    paddingBottom: 8,
    color: COLORS.dark,
    fontWeight: '800',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: '100%',
  },

  icon: {
    position: 'absolute',
    top: 20,
    color: COLORS.dark,
  },

  btn: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: COLORS.dark,
    margin: 100,
    padding: 15,
    backgroundColor: COLORS.dark,
  },

  btnText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: '700',
    paddingRight: 5,
  },
});
