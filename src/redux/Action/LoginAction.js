import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../Type';

export const login = (email, password, navigation) => async dispatch => {
  console.log('Login process started');

  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(
      'http://3.7.81.243/projects/plie-api/public/api/login',
      {
        email: email,
        password: password,
      }
    );

    console.log('Login Response:', response.data);

    if (response.data.success) {
      const { token, data } = response.data;

      // Store token in AsyncStorage
      await AsyncStorage.setItem('token', response?.data?.data?.token);

console.log(response?.data?.data?.token,'afcinjedsirjkgmldv');


      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token,
          user: data.user,
        },
      });


      // await AsyncStorage.setItem('user',data.user);
      //Navigate to Home after successful login
      // console.log(data.user,'dttrfgfcsdfcsdfc');
      await AsyncStorage.setItem('userData', JSON.stringify(data.user));

      
      navigation.navigate('BottomTabScreen');
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: response.data.message || 'Login failed',
      });
    }
  } catch (error) {
    console.error('Login Request Failed:', error);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || 'Something went wrong',
    });
  }
};
