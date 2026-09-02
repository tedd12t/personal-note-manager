import { useRouter } from 'expo-router';
import {
  addDoc,
  collection,
  deleteDoc, doc,
  onSnapshot,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView, Platform,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { auth, db } from '../api/firebase';

export default function HomeScreen() {
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();

  // for reading
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "notes"), 
      where("userId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(notesList);
    });

    return unsubscribe;
  }, []);

  // creating and updating
  const handleSaveNote = async () => {
    if (noteText.trim() === '') return;

    try {
      if (editingId) {
        // update logic
        const noteRef = doc(db, "notes", editingId);
        await updateDoc(noteRef, { text: noteText });
        setEditingId(null);
      } else {
        // create logic
        await addDoc(collection(db, "notes"), {
          text: noteText,
          userId: auth.currentUser?.uid,
          createdAt: new Date()
        });
      }
      setNoteText('');
    } catch (error) {
      console.error("Error saving note: ", error);
    }
  };

  // delete logic
  const handleDeleteNote = async (id: string) => {
    if (Platform.OS === 'web') {
      const confirmDelete = window.confirm("Are you sure you want to delete this note?");
      if (confirmDelete) {
        await deleteDoc(doc(db, "notes", id));
      }
      return;
    }

    Alert.alert("Delete Note", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
          await deleteDoc(doc(db, "notes", id));
        } 
      }
    ]);
  };
  const startEdit = (id: string, currentText: string) => {
    setNoteText(currentText);
    setEditingId(id);
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.replace('/');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello,</Text>
          <Text style={styles.userName}>{auth.currentUser?.displayName || "User"}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputRow}>
        <TextInput 
          placeholder="Write a note..." 
          value={noteText} 
          onChangeText={setNoteText} 
          style={styles.input}
        />
        <TouchableOpacity style={styles.saveBtn} onPress={handleSaveNote}>
          <Text style={styles.saveBtnText}>{editingId ? "✓" : "+"}</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteText}>{item.text}</Text>
            
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={() => startEdit(item.id, item.text)}>
                <Text style={styles.editBtn}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteNote(item.id)}>
                <Text style={styles.deleteBtn}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet.</Text>}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9', paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  welcomeText: { fontSize: 16, color: '#666' },
  userName: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a' },
  logoutText: { color: '#1d0392', fontWeight: 'bold' },
  inputRow: { flexDirection: 'row', marginBottom: 25 },
  input: { 
    flex: 1, backgroundColor: '#fff', padding: 18, borderRadius: 12, 
    fontSize: 16, borderWidth: 1, borderColor: '#eee' 
  },
  saveBtn: { 
    backgroundColor: '#007AFF', width: 60, height: 60, 
    borderRadius: 12, marginLeft: 10, justifyContent: 'center', alignItems: 'center' 
  },
  saveBtnText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  noteCard: { 
    backgroundColor: '#fff', padding: 20, borderRadius: 15, 
    marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.05, 
    shadowRadius: 10, elevation: 2 
  },
  noteText: { fontSize: 16, color: '#333', lineHeight: 22 },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15, borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10 },
  editBtn: { color: '#007AFF', marginRight: 20, fontWeight: 'bold' },
  deleteBtn: { color: '#FF3B30', fontWeight: 'bold' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40 }
});