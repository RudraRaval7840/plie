import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {login} from '../../redux/Action/LoginAction';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('token');
        console.log('tok11111en', token);
        
        if (token) {
          navigation.navigate('BottomTabScreen');

        }
      };

      checkLoginStatus();
    }, [])
  );

  const handleLogin = () => {
    dispatch(login(email, password, navigation));
    console.log(email, password);
  };



  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>Pliē</Text>
        <View style={styles.imagePlaceholder}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.socialIcon}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="email@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.inputpass, {flex: 1}]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Text style={styles.toggleText}>
              {secureText ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={()=>handleLogin()}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.signUpText}>
        Not a member? <Text style={styles.signUpLink}>Sign Up Here</Text>
      </Text>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or Sign In with:</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../../assets/google.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../../assets/apple.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../../assets/facebook.png')}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.guestText}>Enter as Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingLeft: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    paddingLeft: 15,
    paddingRight: 10,
    marginBottom: 15,
  },
  toggleText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  forgotText: {
    color: '#888',
    textAlign: 'right',
    marginBottom: 20,
  },
  inputpass: {
    height: 50,
  },
  signInButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  signUpLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#777',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    padding: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  guestText: {
    textAlign: 'center',
    color: '#666',
  },
});

export default LoginScreen;
