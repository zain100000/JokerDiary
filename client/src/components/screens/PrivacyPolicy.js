import React from 'react';
import {Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import COLORS from '../consts/Colors';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>
          This privacy policy applies to the Joker Diary app (hereby referred to
          as "Application") for mobile devices that was created by Zeeshan Dogar
          (hereby referred to as "Service Provider") as a Free service. This
          service is intended for use "AS IS".
        </Text>

        <Text style={styles.subtitle}>Information Collection and Use</Text>

        <Text style={styles.sectionTitle}>
          The Application collects information when you download and use it.
          This information may include information such as your device's
          Internet Protocol address (e.g. IP address), the pages of the
          Application that you visit, the time and date of your visit, the time
          spent on those pages, the time spent on the Application, and the
          operating system you use on your mobile device.
        </Text>

        <Text style={styles.sectionTitle}>
          The Application does not gather precise information about the location
          of your mobile device.
        </Text>

        <Text style={styles.sectionTitle}>
          The Service Provider may use the information you provided to contact
          you from time to time to provide you with important information,
          required notices, and marketing promotions.
        </Text>

        <Text style={styles.sectionTitle}>
          For a better experience, while using the Application, the Service
          Provider may require you to provide us with certain personally
          identifiable information. The information that the Service Provider
          request will be retained by them and used as described in this privacy
          policy.
        </Text>

        <Text style={styles.subtitle}>Third Party Access</Text>

        <Text style={styles.sectionTitle}>
          Only aggregated, anonymized data is periodically transmitted to
          external services to aid the Service Provider in improving the
          Application and their service. The Service Provider may share your
          information with third parties in the ways that are described in this
          privacy statement.
        </Text>

        <Text style={styles.link}>- Google Play Services</Text>

        <Text style={styles.subtitle}>Opt-Out Rights</Text>

        <Text style={styles.sectionTitle}>
          You can stop all collection of information by the Application easily
          by uninstalling it. You may use the standard uninstall processes as
          may be available as part of your mobile device or via the mobile
          application marketplace or network.
        </Text>

        <Text style={styles.subtitle}>Data Retention Policy</Text>

        <Text style={styles.sectionTitle}>
          The Service Provider will retain User Provided data for as long as you
          use the Application and for a reasonable time thereafter. If you'd
          like them to delete User Provided Data that you have provided via the
          Application, please contact them at zeeshandogar101@gmail.com and they
          will respond in a reasonable time.
        </Text>

        <Text style={styles.subtitle}>Children</Text>

        <Text style={styles.sectionTitle}>
          The Service Provider does not use the Application to knowingly solicit
          data from or market to children under the age of 13.
        </Text>

        <Text style={styles.sectionTitle}>
          The Application does not address anyone under the age of 13. The
          Service Provider does not knowingly collect personally identifiable
          information from children under 13 years of age. In the case the
          Service Provider discover that a child under 13 has provided personal
          information, the Service Provider will immediately delete this from
          their servers. If you are a parent or guardian and you are aware that
          your child has provided us with personal information, please contact
          the Service Provider (zeeshandogar101@gmail.com) so that they will be
          able to take the necessary actions.
        </Text>

        <Text style={styles.subtitle}>Security</Text>

        <Text style={styles.sectionTitle}>
          The Service Provider is concerned about safeguarding the
          confidentiality of your information. The Service Provider provides
          physical, electronic, and procedural safeguards to protect information
          the Service Provider processes and maintains.
        </Text>

        <Text style={styles.subtitle}>Changes</Text>

        <Text style={styles.sectionTitle}>
          This Privacy Policy may be updated from time to time for any reason.
          The Service Provider will notify you of any changes to the Privacy
          Policy by updating this page with the new Privacy Policy. You are
          advised to consult this Privacy Policy regularly for any changes, as
          continued use is deemed approval of all changes.
        </Text>

        <Text style={styles.sectionTitle}>
          This privacy policy is effective as of 2024-05-10.
        </Text>

        <Text style={styles.subtitle}>Your Consent</Text>

        <Text style={styles.sectionTitle}>
          By using the Application, you are consenting to the processing of your
          information as set forth in this Privacy Policy now and as amended by
          us.
        </Text>

        <Text style={styles.subtitle}>Contact Us</Text>

        <Text style={styles.sectionTitle}>
          If you have any questions regarding privacy while using the
          Application, or have questions about the practices, please contact the
          Service Provider via email at zeeshandogar101@gmail.com.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 50,
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
    marginBottom: 20,
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

  link: {
    marginLeft: 20,
    color: 'blue',
    textAlign: 'justify',
  },
});

export default PrivacyPolicy;
