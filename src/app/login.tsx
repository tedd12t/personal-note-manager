import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../api/firebase';
import { useTheme } from '../context/ThemeContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const router = useRouter();
  const { theme } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill all fields");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/home'); 
    } catch (error: any) {
      alert("Invalid email or password.");
    }
  };

  const handleReset = async () => {
    if (!email) return alert("Please type your email address first.");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.authCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.form}>
          
          <Text style={styles.label}>Email address</Text>
          <View style={[styles.inputWrapper, { borderColor: focusedField === 'email' ? '#8b3dff' : theme.border }]}>
            <Ionicons name="mail-outline" size={18} color="#999" style={styles.inputIcon} />
            <TextInput 
              placeholder="you@mail.com" 
              placeholderTextColor="#ccc"
              value={email} 
              onChangeText={setEmail} 
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              style={[styles.input, { color: theme.text }, Platform.OS === 'web' && { outlineStyle: 'none' } as any]} 
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={[styles.inputWrapper, { borderColor: focusedField === 'password' ? '#8b3dff' : theme.border }]}>
            <Ionicons name="key-outline" size={18} color="#999" style={styles.inputIcon} />
            <TextInput 
              placeholder="Password" 
              placeholderTextColor="#ccc"
              value={password} 
              onChangeText={setPassword} 
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              style={[styles.input, { color: theme.text }, Platform.OS === 'web' && { outlineStyle: 'none' } as any]} 
              secureTextEntry={!showPassword} 
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={18} color="#999" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={handleReset}>
             <Text style={styles.forgotLink}>Forgot your password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Sign in</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={{ color: '#666' }}>New to the app? </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity><Text style={styles.bottomLink}>Sign up</Text></TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  authCard: { width: '100%', maxWidth: 400, padding: 40, borderRadius: 15, borderWidth: 1, elevation: 3 },
  form: { width: '100%' },
  label: { fontSize: 13, fontWeight: '700', color: '#705454', marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderRadius: 8, marginBottom: 20, paddingHorizontal: 12, height: 45 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: '100%', fontSize: 14 },
  eyeIcon: { padding: 5 },
  forgotLink: { color: '#3a04fffd', fontSize: 13, marginBottom: 30, fontWeight: '600' },
  loginBtn: { backgroundColor: '#3a04fffd', padding: 14, borderRadius: 8, alignItems: 'center' },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  bottomLink: { color: '#3a04fffd', fontWeight: 'bold' }
});