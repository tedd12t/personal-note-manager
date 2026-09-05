import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold, useFonts } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

const MOCK_NOTES = [
  { text: 'Grocery list for the weekend trip 🛒' },
  { text: 'Q3 planning — follow up with design team' },
  { text: 'Ideas for mom\'s birthday gift' },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const { theme, isDark } = useTheme();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
  });

  const cardBg = isDark ? '#1e1e2a' : '#ffffff';
  const cardBorder = isDark ? '#2a2a38' : '#eee8fa';
  const mutedText = isDark ? '#8a8a9a' : '#999';
  const noteText = isDark ? '#e4e4ec' : '#333';

  if (!fontsLoaded) return null;

  const renderCardContent = () => (
    <>
      <View style={[styles.mockInputRow, { borderColor: cardBorder }]}>
        <Text style={[styles.mockInputPlaceholder, { color: mutedText }]}>Write a note...</Text>
        <View style={styles.mockAddBtn}>
          <Ionicons name="add" size={16} color="#fff" />
        </View>
      </View>

      {MOCK_NOTES.map((note, i) => (
        <View
          key={i}
          style={[
            styles.mockNoteRow,
            { borderColor: cardBorder },
            i === MOCK_NOTES.length - 1 && styles.mockNoteRowLast,
          ]}
        >
          <Text style={[styles.mockNoteText, { color: noteText }]} numberOfLines={1}>
            {note.text}
          </Text>
          <View style={styles.mockActionsRow}>
            <Text style={styles.mockEdit}>Edit</Text>
            <Text style={styles.mockDelete}>Delete</Text>
          </View>
        </View>
      ))}
    </>
  );

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={[styles.bgCircleTop, { backgroundColor: isDark ? '#241b38' : '#f0eaff' }]} />
      <View style={[styles.bgCircleBottom, { backgroundColor: isDark ? '#1c1530' : '#f7f3ff' }]} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.topBar}>
            <View style={styles.logoRow}>
              <View style={styles.logoIconWrap}>
                <Ionicons name="journal" size={18} color="#fff" />
              </View>
              <Text style={[styles.logoText, { color: theme.text }]}>MyNotes</Text>
            </View>
          </View>
          <View style={styles.illustrationArea}>
            <View
              style={[
                styles.appMockCard,
                styles.appMockCardBack,
                styles.appMockCardBehindRight,
                { backgroundColor: cardBg, borderColor: cardBorder },
              ]}
            >
              {renderCardContent()}
            </View>

            <View
              style={[
                styles.appMockCard,
                styles.appMockCardBack,
                styles.appMockCardBehindLeft,
                { backgroundColor: cardBg, borderColor: cardBorder },
              ]}
            >
              {renderCardContent()}
            </View>

            <View
              style={[
                styles.appMockCard,
                { backgroundColor: cardBg, borderColor: cardBorder },
              ]}
            >
              {renderCardContent()}
            </View>
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.mainBtn}
              activeOpacity={0.85}
              onPress={() => router.push('/signup')}
            >
              <LinearGradient
                colors={['#9b4dff', '#7a1fe0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.mainBtnGradient}
              >
                <Text style={styles.btnText}>Get Started</Text>
                <Ionicons name="arrow-forward" size={17} color="#fff" style={{ marginLeft: 8 }} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomSpacer} />

        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1 },
  bgCircleTop: {
    position: 'absolute',
    top: -width * 0.35,
    right: -width * 0.3,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
  },
  bgCircleBottom: {
    position: 'absolute',
    bottom: -width * 0.4,
    left: -width * 0.35,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: height * 0.025,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#8b3dff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: { fontSize: 16, fontFamily: 'Poppins_700Bold', letterSpacing: -0.2 },

  illustrationArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.08,
  },
  appMockCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  appMockCardBack: {
    position: 'absolute',
    opacity: 0.55,
  },
  appMockCardBehindRight: {
    transform: [{ rotate: '6deg' }, { translateX: 14 }, { translateY: 8 }],
  },
  appMockCardBehindLeft: {
    transform: [{ rotate: '-6deg' }, { translateX: -14 }, { translateY: 8 }],
  },

  mockInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  mockInputPlaceholder: { fontSize: 13, fontFamily: 'Poppins_400Regular' },
  mockAddBtn: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#8b3dff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockNoteRow: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  mockNoteRowLast: { marginBottom: 0 },
  mockNoteText: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 12,
  },
  mockActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 14,
  },
  mockEdit: { color: '#5b8def', fontSize: 11.5, fontFamily: 'Poppins_600SemiBold' },
  mockDelete: { color: '#e0525f', fontSize: 11.5, fontFamily: 'Poppins_600SemiBold' },

  buttonArea: {
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0.06,
  },
  mainBtn: {
    alignSelf: 'center',
    borderRadius: 100,
    shadowColor: '#8b3dff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  mainBtnGradient: {
    paddingVertical: 13,
    paddingHorizontal: 36,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 15, fontFamily: 'Poppins_600SemiBold', letterSpacing: 0.3 },

  bottomSpacer: { flex: 1 },
});