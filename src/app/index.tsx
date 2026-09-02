import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../api/firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return alert("Please enter email and password");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/home'); 
    } catch (error: any) {
      alert("Invalid email or password.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return alert("Please enter your email address first.");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Reset email sent! Check your inbox.");
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.subText}>Login to manage your notes</Text>
      </View>

      <View style={styles.form}>
        <TextInput 
          placeholder="Email Address" 
          value={email} 
          onChangeText={setEmail} 
          style={styles.input} 
          autoCapitalize="none" 
        />

        <View style={styles.passwordWrapper}>
          <TextInput 
            placeholder="Password" 
            value={password} 
            onChangeText={setPassword} 
            style={styles.passwordInput} 
            secureTextEntry={!showPassword} 
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#666" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>New to the app? </Text>
          <Link href="/signup" asChild>
            <TouchableOpacity><Text style={styles.signupLink}>Sign Up</Text></TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', padding: 25, justifyContent: 'center' },
  headerArea: { marginBottom: 40 },
  welcomeText: { fontSize: 32, fontWeight: '800', color: '#1a1a1a' },
  subText: { fontSize: 16, color: '#666', marginTop: 5 },
  form: { width: '100%' },
  input: { backgroundColor: '#fff', padding: 18, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#eee', fontSize: 16 },
  passwordWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#eee', marginBottom: 10 },
  passwordInput: { flex: 1, padding: 18, fontSize: 16 },
  eyeIcon: { paddingRight: 15 },
  forgotText: { color: '#007AFF', textAlign: 'right', marginBottom: 20, fontWeight: '600' },
  loginBtn: { backgroundColor: '#1d0392', padding: 18, borderRadius: 12, alignItems: 'center' },
  loginBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  footerText: { color: '#666', fontSize: 15 },
  signupLink: { color: '#1d0392', fontSize: 15, fontWeight: 'bold' }
});