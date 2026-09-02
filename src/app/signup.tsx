import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../api/firebase';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!fullName || !email || !password) return alert("Fill all fields");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      router.replace('/home');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Back' }} />
      <Text style={styles.title}>Create account </Text>

      <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} style={styles.input} />
      <TextInput placeholder="Email Address" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
      
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
      
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 5 },
  subText: { color: '#666', marginBottom: 40 },
  input: { backgroundColor: '#f4f4f4', padding: 18, borderRadius: 12, marginBottom: 15, fontSize: 16 },
  passwordWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f4f4f4', borderRadius: 12, marginBottom: 25 },
  passwordInput: { flex: 1, padding: 18, fontSize: 16 },
  eyeIcon: { paddingRight: 15 },
  button: { backgroundColor: '#1d0392', padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  footerText: { color: '#666', fontSize: 15 },
  loginLink: { color: '#1d0392', fontSize: 15, fontWeight: 'bold' }
});