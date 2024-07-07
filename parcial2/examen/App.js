import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB38BO-bLHK2E_ElwW6tD-sEwL4DWp9LbE",
  authDomain: "fir-bf8a6.firebaseapp.com",
  databaseURL: "https://fir-bf8a6-default-rtdb.firebaseio.com",
  projectId: "fir-bf8a6",
  storageBucket: "fir-bf8a6.appspot.com",
  messagingSenderId: "148577263085",
  appId: "1:148577263085:web:e803bfc922e70d24ff1be4",
  measurementId: "G-D1YZ92MNYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignInForm = ({ email, setEmail, password, setPassword, handleSignIn }) => (
  <View style={styles.formContainer}>
    <Text style={styles.title}>Sign In</Text>
    <TextInput
      style={styles.input}
      placeholder='Email'
      placeholderTextColor="#00ff00"
      value={email}
      onChangeText={setEmail}
      autoCapitalize='none'
    />
    <TextInput
      style={styles.input}
      placeholder='Password'
      placeholderTextColor="#00ff00"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />
    <TouchableOpacity style={styles.button} onPress={handleSignIn}>
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
  </View>
);

const SignUpForm = ({ email, setEmail, password, setPassword, handleSignUp }) => (
  <View style={styles.formContainer}>
    <Text style={styles.title}>Sign Up</Text>
    <TextInput
      style={styles.input}
      placeholder='Email'
      placeholderTextColor="#00ff00"
      value={email}
      onChangeText={setEmail}
      autoCapitalize='none'
    />
    <TextInput
      style={styles.input}
      placeholder='Password'
      placeholderTextColor="#00ff00"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />
    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
  </View>
);

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.authContainer}>
          <Text style={styles.title}>Welcome, {user.email}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {isLogin ? (
            <SignInForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSignIn={handleSignIn}
            />
          ) : (
            <SignUpForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSignUp={handleSignUp}
            />
          )}
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleText}>
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  formContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#111111',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  authContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#00ff00',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#00ff00',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    color: '#00ff00',
  },
  button: {
    backgroundColor: '#00ff00',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#00ff00',
    marginTop: 15,
  },
});