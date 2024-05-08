import React from 'react';
import {Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import COLORS from '../consts/Colors';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Privacy Policy</Text>

        <Text style={styles.sectionTitle}>
          MANCHESTER APPS built the QUOTES AND STATUS APP as an Ad Supported
          app. This SERVICE is provided by MANCHESTER APPS at no cost and is
          intended for use as is.
        </Text>

        <Text style={styles.sectionTitle}>
          This page is used to inform website visitors regarding my policies
          with the collection, use, and disclosure of Personal Information if
          anyone decided to use my Service.
        </Text>

        <Text style={styles.sectionTitle}>
          If you choose to use my Service, then you agree to the collection and
          use of information in relation to this policy. The Personal
          Information that I collect is used for providing and improving the
          Service. I will not use or share your information with anyone except
          as described in this Privacy Policy.
        </Text>

        <Text style={styles.sectionTitle}>
          The terms used in this Privacy Policy have the same meanings as in our
          Terms and Conditions, which is accessible at QUOTES AND STATUS APP
          unless otherwise defined in this Privacy Policy.
        </Text>

        <Text style={styles.subtitle}>Information Collection and Use</Text>

        <Text style={styles.sectionTitle}>
          For a better experience, while using our Service, I may require you to
          provide us with certain personally identifiable information. The
          information that I request is retained on your device and is not
          collected by me in any way.
        </Text>

        <Text style={styles.sectionTitle}>
          The app does use third-party services that may collect information
          used to identify you.
        </Text>

        <Text style={styles.link}>- AdMob</Text>
        <Text style={styles.link}>- FAN</Text>

        <Text style={styles.subtitle}>Log Data</Text>

        <Text style={styles.sectionTitle}>
          I want to inform you that whenever you use my Service, in a case of an
          error in the app I collect data and information (through third-party
          products) on your phone called Log Data. This Log Data may include
          information such as your device Internet Protocol (“IP”) address,
          device name, operating system version, the configuration of the app
          when utilizing my Service, the time and date of your use of the
          Service, and other statistics.
        </Text>

        <Text style={styles.subtitle}>Service Providers</Text>

        <Text style={styles.sectionTitle}>
          I may employ third-party companies and individuals due to the
          following reasons:
        </Text>
        <Text style={styles.listItem}>- To facilitate our Service;</Text>
        <Text style={styles.listItem}>
          - To provide the Service on our behalf;
        </Text>
        <Text style={styles.listItem}>
          - To perform Service-related services; or
        </Text>
        <Text style={styles.listItem}>
          - To assist us in analyzing how our Service is used.
        </Text>

        <Text style={styles.subtitle}>Security</Text>

        <Text style={styles.sectionTitle}>
          I value your trust in providing us your Personal Information, thus we
          are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and I cannot
          guarantee its absolute security.
        </Text>

        <Text style={styles.subtitle}>Links to Other Sites</Text>

        <Text style={styles.sectionTitle}>
          This Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by me. Therefore, I strongly advise
          you to review the Privacy Policy of these websites. I have no control
          over and assume no responsibility for the content, privacy policies,
          or practices of any third-party sites or services.
        </Text>

        <Text style={styles.subtitle}>Children’s Privacy</Text>

        <Text style={styles.sectionTitle}>
          These Services do not address anyone under the age of 13. I do not
          knowingly collect personally identifiable information from children
          under 13. In the case I discover that a child under 13 has provided me
          with personal information, I immediately delete this from our servers.
          If you are a parent or guardian and you are aware that your child has
          provided us with personal information, please contact me so that I
          will be able to do necessary actions.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 24,
    color: COLORS.dark,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'justify',
  },

  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: COLORS.dark,
    textAlign: 'justify',
  },

  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: COLORS.dark,
    textAlign: 'justify',
  },

  listItem: {
    marginLeft: 20,
    color: COLORS.dark,
    textAlign: 'justify',
  },

  link: {
    marginLeft: 20,
    color: 'blue',
    textAlign: 'justify',
  },
});

export default PrivacyPolicy;
