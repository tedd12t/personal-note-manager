import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../api/firebase';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(db, "notes"), where("userId", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const handleSaveNote = async () => {
    if (noteText.trim() === '') return;
    try {
      if (editingId) {
        await updateDoc(doc(db, "notes", editingId), { text: noteText });
        setEditingId(null);
      } else {
        await addDoc(collection(db, "notes"), { text: noteText, userId: auth.currentUser?.uid, createdAt: new Date() });
      }
      setNoteText('');
    } catch (error) { console.error(error); }
  };

  const handleDeleteNote = async (id: string) => {
    if (Platform.OS === 'web') {
      if (window.confirm("Delete note?")) await deleteDoc(doc(db, "notes", id));
      return;
    }
    await deleteDoc(doc(db, "notes", id));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 20 }}>
              <Ionicons name={isDark ? "sunny" : "moon"} size={20} color={theme.text} />
            </TouchableOpacity>
      
            <TouchableOpacity onPress={() => { auth.signOut(); router.replace('/'); }}>
              <Text style={{ color: '#FF3B30', fontWeight: 'bold', fontSize: 14 }}>Logout</Text>
            </TouchableOpacity>
          </View>
        )
      }} />

      <View style={styles.headerInfo}>
        <Text style={{ color: isDark ? '#aaa' : '#666' }}>Hello,</Text>
        <Text style={[styles.userName, { color: theme.text }]}>{auth.currentUser?.displayName || "User"}</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput 
          placeholder="Write a note..." 
          placeholderTextColor={isDark ? '#777' : '#999'}
          value={noteText} 
          onChangeText={setNoteText} 
          style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
        />
        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveNote}>
          <Text style={styles.saveBtnText}>{editingId ? "✓" : "+"}</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.noteCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.noteText, { color: theme.text }]}>{item.text}</Text>
            <View style={[styles.actionRow, { borderTopColor: theme.border }]}>
              <TouchableOpacity onPress={() => { setNoteText(item.text); setEditingId(item.id); }}>
                <Text style={styles.editBtn}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
                <Text style={styles.deleteBtn}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerInfo: { marginBottom: 25 },
  userName: { fontSize: 28, fontWeight: 'bold' },
  inputRow: { flexDirection: 'row', marginBottom: 25 },
  input: { flex: 1, padding: 18, borderRadius: 12, borderWidth: 1, fontSize: 16 },
  saveBtn: { backgroundColor: '#007AFF', width: 60, borderRadius: 12, marginLeft: 10, justifyContent: 'center', alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  noteCard: { padding: 20, borderRadius: 15, marginBottom: 15, borderWidth: 1 },
  noteText: { fontSize: 16, lineHeight: 22 },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15, borderTopWidth: 1, paddingTop: 10 },
  editBtn: { color: '#007AFF', marginRight: 20, fontWeight: 'bold' },
  deleteBtn: { color: '#FF3B30', fontWeight: 'bold' }
});