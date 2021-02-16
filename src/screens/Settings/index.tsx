import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '@components/atoms/Header';
import Layout from '@components/atoms/Layout';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors, Mixins, Typography } from '@styles/index';
import { version } from '../../../package.json';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    ...Mixins.padding(10, 10, 10, 10),
  },
  settingsItemContainer: {
    width: '100%',
    alignItems: 'center',
  },
  settingsItem: {
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
  },
  separator: {
    height: 1,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: Colors.BORDER_COLOR,
    ...Mixins.margin(5, 0, 5, 0),
  },
  version: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    alignSelf: 'center',
  },
});

const Settings = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const openTwitter = () => {
    Linking.openURL('https://twitter.com/tavvfiq');
  };

  const openProjectAPI = () => {
    Linking.openURL(
      'https://github.com/tavvfiq/unofficial-kecapbango-resep-api',
    );
  };

  const openProjectApp = () => {
    Linking.openURL('https://github.com/tavvfiq/masakapaya');
  };

  return (
    <Layout>
      <Header
        title="Pengaturan"
        leftIcon={<Icon name="arrow-left" color={Colors.SECONDARY} size={32} />}
        leftIconOnpress={goBack}
      />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={openTwitter}
          style={styles.settingsItemContainer}>
          <Text style={styles.settingsItem}>🐦 follow on Twitter!</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={openProjectApp}
          style={styles.settingsItemContainer}>
          <Text style={styles.settingsItem}>👾 contribute to this project</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={openProjectAPI}
          style={styles.settingsItemContainer}>
          <Text style={styles.settingsItem}>🚧 check the API</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <Text style={styles.version}>App version v{version} </Text>
      </View>
    </Layout>
  );
};

export default Settings;
