import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import Button from '../components/Button';
import { NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function RegisterScreen({ navigation }: { navigation : NavigationProp<any>}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [registerMethod, setRegisterMethod] = useState<'phone' | 'email'>('phone');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const steps = [
    { title: 'Akun', description: 'Buat akun baru' },
    { title: 'Profil', description: 'Lengkapi data diri Anda' },
    { title: 'Verifikasi', description: 'Verifikasi akun Anda' },
  ];

  const handleGoogleRegister = () => {
    // Implement Google registration
    Alert.alert('Google Register', 'Google registration will be implemented here');
  };

  const toggleRegisterMethod = () => {
    setRegisterMethod(registerMethod === 'phone' ? 'email' : 'phone');
  };

  const goToNextStep = () => {
    // Validate current step
    if (currentStep === 0) {
      if (registerMethod === 'phone' && !phoneNumber) {
        Alert.alert('Error', 'Silakan masukkan nomor telepon Anda');
        return;
      }
      
      if (registerMethod === 'email' && !email) {
        Alert.alert('Error', 'Silakan masukkan email Anda');
        return;
      }
      
      if (!password) {
        Alert.alert('Error', 'Silakan masukkan password Anda');
        return;
      }
      
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Password dan konfirmasi password tidak cocok');
        return;
      }
    }
    
    if (currentStep === 1) {
      if (!name) {
        Alert.alert('Error', 'Silakan masukkan nama Anda');
        return;
      }
    }
    
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollViewRef.current?.scrollTo({ x: nextStep * width, animated: true });
    } else {
      // Final step, complete registration
      handleCompleteRegistration();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      scrollViewRef.current?.scrollTo({ x: prevStep * width, animated: true });
    } else {
      navigation.goBack();
    }
  };

  const handleCompleteRegistration = () => {
    setLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Registrasi Berhasil',
        'Akun Anda telah berhasil dibuat. Silakan masuk dengan akun baru Anda.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    }, 1500);
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicatorContainer}>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <View key={index} style={styles.stepItem}>
              <View
                style={[
                  styles.stepLine,
                  index === 0 ? { backgroundColor: 'transparent' } : null,
                  isCompleted ? styles.completedStepLine : null,
                ]}
              />
              <View
                style={[
                  styles.stepCircle,
                  isActive ? styles.activeStepCircle : null,
                  isCompleted ? styles.completedStepCircle : null,
                ]}
              >
                {isCompleted ? (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                ) : (
                  <Text
                    style={[
                      styles.stepNumber,
                      isActive ? styles.activeStepNumber : null,
                    ]}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <View
                style={[
                  styles.stepLine,
                  index === steps.length - 1 ? { backgroundColor: 'transparent' } : null,
                  isCompleted ? styles.completedStepLine : null,
                ]}
              />
              <View style={styles.stepTextContainer}>
                <Text
                  style={[
                    styles.stepTitle,
                    isActive || isCompleted ? styles.activeStepTitle : null,
                  ]}
                >
                  {step.title}
                </Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderStepContent = () => {
    return (
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.stepContentContainer}
      >
        {/* Step 1: Account Information */}
        <View style={[styles.stepContent, { width }]}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                registerMethod === 'phone' && styles.activeTabButton,
              ]}
              onPress={() => setRegisterMethod('phone')}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  registerMethod === 'phone' && styles.activeTabButtonText,
                ]}
              >
                Nomor Telepon
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                registerMethod === 'email' && styles.activeTabButton,
              ]}
              onPress={() => setRegisterMethod('email')}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  registerMethod === 'email' && styles.activeTabButtonText,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
          </View>

          {registerMethod === 'phone' ? (
            <Input
              label="Nomor Telepon"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Masukkan nomor telepon"
              keyboardType="phone-pad"
              leftIcon={<Ionicons name="call-outline" size={20} color={Colors.light.primary} />}
            />
          ) : (
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Masukkan email"
              keyboardType="email-address"
              autoCapitalize="none"
              
              leftIcon={<Ionicons name="mail-outline" size={20} color={Colors.light.primary} />}
            />
          )}

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Masukkan password"
            secureTextEntry={secureTextEntry}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={Colors.light.primary} />}
            rightIcon={
              <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                <Ionicons
                  name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={Colors.light.subtext}
                />
              </TouchableOpacity>
            }
          />

          <Input
            label="Konfirmasi Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Masukkan konfirmasi password"
            secureTextEntry={secureConfirmTextEntry}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={Colors.light.primary} />}
            rightIcon={
              <TouchableOpacity onPress={() => setSecureConfirmTextEntry(!secureConfirmTextEntry)}>
                <Ionicons
                  name={secureConfirmTextEntry ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={Colors.light.subtext}
                />
              </TouchableOpacity>
            }
          />

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>atau</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleRegister}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
              style={styles.googleIcon}
              resizeMode="contain"
            />
            <Text style={styles.googleButtonText}>Daftar dengan Google</Text>
          </TouchableOpacity>
        </View>

        {/* Step 2: Personal Information */}
        <View style={[styles.stepContent, { width }]}>
          <Input
            label="Nama Lengkap"
            value={name}
            onChangeText={setName}
            placeholder="Masukkan nama lengkap"
            leftIcon={<Ionicons name="person-outline" size={20} color={Colors.light.primary} />}
          />
          
          <Input
            label="Tanggal Lahir (Opsional)"
            placeholder="DD/MM/YYYY"
            leftIcon={<Ionicons name="calendar-outline" size={20} color={Colors.light.primary} />}
          />
          
          <Input
            label="Jenis Kelamin (Opsional)"
            placeholder="Pilih jenis kelamin"
            leftIcon={<Ionicons name="people-outline" size={20} color={Colors.light.primary} />}
            rightIcon={<MaterialIcons name="arrow-drop-down" size={24} color={Colors.light.subtext} />}
          />
          
          <Input
            label="Alamat (Opsional)"
            placeholder="Masukkan alamat"
            leftIcon={<Ionicons name="location-outline" size={20} color={Colors.light.primary} />}
          />
        </View>

        {/* Step 3: Verification */}
        <View style={[styles.stepContent, { width }]}>
          <View style={styles.verificationContainer}>
            <Ionicons name="checkmark-circle" size={80} color={Colors.light.success} style={styles.verificationIcon} />
            <Text style={styles.verificationTitle}>Verifikasi Akun</Text>
            <Text style={styles.verificationText}>
              Kami telah mengirimkan kode verifikasi ke {registerMethod === 'phone' ? phoneNumber : email} Anda. 
              Silakan masukkan kode tersebut untuk menyelesaikan proses pendaftaran.
            </Text>
            
            <View style={styles.otpContainer}>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <View key={index} style={styles.otpInput}>
                  <Text style={styles.otpText}>{index === 0 ? '1' : ''}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity style={styles.resendButton}>
              <Text style={styles.resendText}>Kirim Ulang Kode</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={goToPreviousStep}>
              <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
            </TouchableOpacity>
            <Text style={styles.title}>Daftar Akun</Text>
            <View style={styles.backButtonPlaceholder} />
          </View>

          {renderStepIndicator()}

          <View style={styles.formContainer}>
            {renderStepContent()}

            <View style={styles.buttonContainer}>
              <Button
                title={currentStep === steps.length - 1 ? 'Selesai' : 'Lanjut'}
                onPress={goToNextStep}
                loading={loading}
                size="large"
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonPlaceholder: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  stepIndicatorContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.light.background,
    borderWidth: 2,
    borderColor: Colors.light.border,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  activeStepCircle: {
    borderColor: Colors.light.primary,
  },
  completedStepCircle: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.subtext,
  },
  activeStepNumber: {
    color: Colors.light.primary,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.light.border,
  },
  completedStepLine: {
    backgroundColor: Colors.light.primary,
  },
  stepTextContainer: {
    marginLeft: 12,
    flex: 5,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.subtext,
    marginBottom: 2,
  },
  activeStepTitle: {
    color: Colors.light.text,
    fontWeight: 'bold',
  },
  stepDescription: {
    fontSize: 12,
    color: Colors.light.lightText,
  },
  formContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    marginHorizontal: 20,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
    overflow: 'hidden',
  },
  stepContentContainer: {
    width: '100%',
  },
  stepContent: {
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: Colors.light.card,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.subtext,
  },
  activeTabButtonText: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.border,
  },
  dividerText: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginHorizontal: 10,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  verificationContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  verificationIcon: {
    marginBottom: 20,
  },
  verificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
  verificationText: {
    fontSize: 14,
    color: Colors.light.subtext,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  otpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  resendButton: {
    marginTop: 10,
  },
  resendText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '600',
  },
});