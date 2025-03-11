import React, { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Input from '../components/Input';
import Button from '../components/Button';

import { NavigationProp } from '@react-navigation/native';


export default function LoginScreen({ navigation }: { navigation : NavigationProp<any>}) {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = async () => {
    setLoading(true);
    
    // Validate inputs
    if (loginMethod === 'phone' && !phoneNumber) {
      Alert.alert('Error', 'Silakan masukkan nomor telepon Anda');
      setLoading(false);
      return;
    }
    
    if (loginMethod === 'email' && !email) {
      Alert.alert('Error', 'Silakan masukkan email Anda');
      setLoading(false);
      return;
    }
    
    if (!password) {
      Alert.alert('Error', 'Silakan masukkan password Anda');
      setLoading(false);
      return;
    }
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // Implement Google login
    Alert.alert('Google Login', 'Google login will be implemented here');
  };

  const toggleLoginMethod = () => {
    setLoginMethod(loginMethod === 'phone' ? 'email' : 'phone');
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Image
              source={require("../assets/images/salman-landscape.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Selamat Datang</Text>
            <Text style={styles.subtitle}>
              Masuk ke akun Anda untuk melanjutkan
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  loginMethod === "phone" && styles.activeTabButton,
                ]}
                onPress={() => setLoginMethod("phone")}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    loginMethod === "phone" && styles.activeTabButtonText,
                  ]}
                >
                  Nomor Telepon
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  loginMethod === "email" && styles.activeTabButton,
                ]}
                onPress={() => setLoginMethod("email")}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    loginMethod === "email" && styles.activeTabButtonText,
                  ]}
                >
                  Email
                </Text>
              </TouchableOpacity>
            </View>

            {loginMethod === "phone" ? (
              <Input
                label="Nomor Telepon"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Masukkan nomor telepon"
                keyboardType="phone-pad"
                leftIcon={
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color={Colors.light.primary}
                  />
                }
              />
            ) : (
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Masukkan email"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={Colors.light.primary}
                  />
                }
              />
            )}

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Masukkan password"
              secureTextEntry={secureTextEntry}
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={Colors.light.primary}
                />
              }
              rightIcon={
                <TouchableOpacity
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                >
                  <Ionicons
                    name={secureTextEntry ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={Colors.light.subtext}
                  />
                </TouchableOpacity>
              }
            />

            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
            </TouchableOpacity>

            <Button
              title="Masuk"
              onPress={handleLogin}
              loading={loading}
              size="large"
              style={styles.loginButton}
            />

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>atau</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleLogin}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
                }}
                style={styles.googleIcon}
                resizeMode="contain"
              />
              <Text style={styles.googleButtonText}>Masuk dengan Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerText}>Daftar</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.subtext,
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
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
    fontWeight: "500",
    color: Colors.light.subtext,
  },
  activeTabButtonText: {
    color: Colors.light.primary,
    fontWeight: "600",
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 4,
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "500",
  },
  loginButton: {
    marginBottom: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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
    fontWeight: "600",
    color: Colors.light.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  registerText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.primary,
  },
});