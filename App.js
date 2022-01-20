import * as React from 'react';

import {StyleSheet, View, Text, Button} from 'react-native';
import OpenloginReactNativeSdk, {
  LoginProvider,
  OpenloginNetwork,
} from 'openlogin-react-native-sdk';

export default function App() {
  const [authState, setAuthState] = React.useState({});

  React.useEffect(() => {
    OpenloginReactNativeSdk.addOpenloginAuthStateChangedEventListener(state => {
      console.log(state);
      setAuthState(state);
    });
    OpenloginReactNativeSdk.init({
      clientId:
        'BB8yp84sQY7jSMxcvR0B8UGWMd-474_njAr5fgtZmGep7p2y-a0gunM2_IGYf-4ZegFFa4_0IX_dpCLcxoNjjb8',
      network: OpenloginNetwork.TESTNET,
      redirectUrl: 'com.web3auhttest://auth',
    })
      .then(result => console.log(`success: ${result}`))
      .catch(err => console.log(`error: ${err}`));
  }, []);

  // React.useEffect(() => {
  //   // OpenloginReactNativeSdk.multiply(3, 7).then(setResult);
  // }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() =>
          OpenloginReactNativeSdk.login({
            provider: LoginProvider.GOOGLE,
          })
            .then(result => console.log(`success: ${result}`))
            .catch(err => console.log(`error: ${err}`))
        }
      />
      <Button
        title="Logout"
        onPress={() =>
          OpenloginReactNativeSdk.logout({
            provider: LoginProvider.GOOGLE,
          })
            .then(result => console.log(`success: ${result}`))
            .catch(err => console.log(`error: ${err}`))
        }
      />
      <Text style={styles.authStateText}>
        Result: {JSON.stringify(authState)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  authStateText: {
    color: 'white',
  },
});