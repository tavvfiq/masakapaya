import { Colors } from '@styles/index';
import React from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});

const Layout = ({ children }: Props) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
      <SafeAreaView style={styles.layout}>{children}</SafeAreaView>
    </>
  );
};

export default Layout;
