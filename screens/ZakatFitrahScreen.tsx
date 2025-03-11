import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { previousZakatFitrah } from '../data/mockData';

export default function ZakatFitrahScreen({ navigation }) {
  const [familyMembers, setFamilyMembers] = useState(previousZakatFitrah.familyMembers.toString());
  const [ricePrice, setRicePrice] = useState(previousZakatFitrah.ricePrice.toString());
  const [zakatAmount, setZakatAmount] = useState<number | null>(null);
  const [riceWeight, setRiceWeight] = useState<number | null>(null);

  // Format currency to Indonesian Rupiah
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format input with thousand separators
  const formatNumber = (text: string) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    
    // Format with thousand separators
    if (numericValue === '') {
      return '';
    }
    
    return new Intl.NumberFormat('id-ID').format(parseInt(numericValue));
  };

  // Parse formatted number back to numeric string
  const parseFormattedNumber = (formattedText: string) => {
    return formattedText.replace(/[^0-9]/g, '');
  };

  const handleFamilyMembersChange = (text: string) => {
    // Only allow numbers for family members
    const numericValue = text.replace(/[^0-9]/g, '');
    setFamilyMembers(numericValue);
  };

  const handleRicePriceChange = (text: string) => {
    const numericValue = parseFormattedNumber(text);
    setRicePrice(formatNumber(numericValue));
  };

  const calculateZakat = () => {
    const familyMembersValue = parseInt(familyMembers || '0');
    const ricePriceValue = parseInt(parseFormattedNumber(ricePrice) || '0');
    
    if (familyMembersValue <= 0) {
      Alert.alert(
        "Input Error",
        "Jumlah anggota keluarga harus lebih dari 0",
        [{ text: "OK" }]
      );
      return;
    }
    
    if (ricePriceValue <= 0) {
      Alert.alert(
        "Input Error",
        "Harga beras per kg harus lebih dari 0",
        [{ text: "OK" }]
      );
      return;
    }
    
    // Each person must pay 2.5 kg of rice or its equivalent in money
    const riceWeightValue = familyMembersValue * 2.5;
    setRiceWeight(riceWeightValue);
    
    // Calculate total zakat amount
    const totalZakat = riceWeightValue * ricePriceValue;
    setZakatAmount(totalZakat);
  };

  const handlePayZakat = () => {
    if (zakatAmount) {
      Alert.alert(
        "Konfirmasi Pembayaran",
        `Anda akan membayar zakat fitrah sebesar ${formatCurrency(zakatAmount)} untuk ${familyMembers} anggota keluarga. Lanjutkan?`,
        [
          {
            text: "Batal",
            style: "cancel"
          },
          { 
            text: "Bayar", 
            onPress: () => {
              // Simulate payment process
              Alert.alert(
                "Pembayaran Berhasil",
                "Terima kasih telah menunaikan zakat fitrah. Semoga menjadi berkah bagi Anda dan keluarga.",
                [
                  { 
                    text: "OK", 
                    onPress: () => navigation.navigate('Zakat')
                  }
                ]
              );
            }
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Zakat Fitrah</Text>
            <Text style={styles.headerSubtitle}>
              Hitung dan bayar zakat fitrah untuk keluarga Anda
            </Text>
          </View>

          {/* Explanation Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tentang Zakat Fitrah</Text>
            <Text style={styles.explanationText}>
              Zakat Fitrah adalah zakat yang wajib dikeluarkan oleh setiap muslim di bulan Ramadhan 
              sebelum shalat Idul Fitri. Besarnya adalah 2.5 kg beras (atau makanan pokok) per orang 
              atau nilai uang yang setara. Zakat Fitrah bertujuan untuk membersihkan puasa kita dan 
              membantu orang yang kurang mampu agar dapat merayakan Idul Fitri.
            </Text>
          </View>

          {/* Calculator Form */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kalkulator Zakat Fitrah</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Jumlah Anggota Keluarga</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={familyMembers}
                  onChangeText={handleFamilyMembersChange}
                  keyboardType="numeric"
                  placeholder="Masukkan jumlah anggota keluarga"
                />
              </View>
              <Text style={styles.inputHelper}>
                Termasuk diri Anda dan semua anggota keluarga yang Anda tanggung.
              </Text>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Harga Beras per Kg (Rp)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={ricePrice}
                  onChangeText={handleRicePriceChange}
                  keyboardType="numeric"
                  placeholder="Masukkan harga beras per kg"
                />
              </View>
              <Text style={styles.inputHelper}>
                Harga beras berkualitas menengah di daerah Anda.
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.calculateButton}
              onPress={calculateZakat}
            >
              <Text style={styles.calculateButtonText}>Hitung Zakat</Text>
            </TouchableOpacity>
          </View>

          {/* Results Section */}
          {zakatAmount !== null && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hasil Perhitungan</Text>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Jumlah Anggota Keluarga</Text>
                <Text style={styles.resultValue}>{familyMembers} orang</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Harga Beras per Kg</Text>
                <Text style={styles.resultValue}>{formatCurrency(parseInt(parseFormattedNumber(ricePrice) || '0'))}</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Total Berat Beras</Text>
                <Text style={styles.resultValue}>{riceWeight?.toFixed(1)} kg</Text>
              </View>
              
              <View style={[styles.resultItem, styles.zakatResult]}>
                <Text style={styles.zakatResultLabel}>Total Zakat Fitrah</Text>
                <Text style={styles.zakatResultValue}>{formatCurrency(zakatAmount || 0)}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.payButton}
                onPress={handlePayZakat}
              >
                <Text style={styles.payButtonText}>Bayar Zakat Sekarang</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Additional Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informasi Tambahan</Text>
            
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <FontAwesome5 name="calendar-alt" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Waktu Pembayaran</Text>
                <Text style={styles.infoText}>
                  Zakat Fitrah sebaiknya dibayarkan sebelum shalat Idul Fitri. Namun, diperbolehkan 
                  juga untuk membayarnya sejak awal Ramadhan.
                </Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <FontAwesome5 name="hands-helping" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Penerima Zakat</Text>
                <Text style={styles.infoText}>
                  Zakat Fitrah diberikan kepada fakir miskin dan 8 golongan penerima zakat (asnaf) 
                  lainnya agar mereka dapat memenuhi kebutuhan di hari raya.
                </Text>
              </View>
            </View>
            
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <FontAwesome5 name="balance-scale" size={20} color="#4CAF50" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Jumlah yang Wajib</Text>
                <Text style={styles.infoText}>
                  Setiap muslim wajib mengeluarkan 2.5 kg beras atau makanan pokok yang setara 
                  dengan kualitas yang biasa dikonsumsi.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  input: {
    padding: 12,
    fontSize: 16,
  },
  inputHelper: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  calculateButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  calculateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultLabel: {
    fontSize: 14,
    color: '#555',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  zakatResult: {
    marginTop: 10,
    paddingVertical: 15,
    backgroundColor: '#f0f8f0',
    borderRadius: 8,
    borderBottomWidth: 0,
  },
  zakatResultLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  zakatResultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
});