import React, { useState, useEffect } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { goldPricePerGram, nisabThreshold, previousZakatMal } from '../data/mockData';

export default function ZakatMalScreen({ navigation }) {
  const [assets, setAssets] = useState(previousZakatMal.assets.toString());
  const [debts, setDebts] = useState(previousZakatMal.debts.toString());
  const [zakatAmount, setZakatAmount] = useState<number | null>(null);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [netAssets, setNetAssets] = useState<number | null>(null);

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

  const handleAssetsChange = (text: string) => {
    const numericValue = parseFormattedNumber(text);
    setAssets(formatNumber(numericValue));
  };

  const handleDebtsChange = (text: string) => {
    const numericValue = parseFormattedNumber(text);
    setDebts(formatNumber(numericValue));
  };

  const calculateZakat = () => {
    const assetsValue = parseInt(parseFormattedNumber(assets) || '0');
    const debtsValue = parseInt(parseFormattedNumber(debts) || '0');
    
    const netAssetsValue = assetsValue - debtsValue;
    setNetAssets(netAssetsValue);
    
    // Check if net assets reach nisab threshold
    const eligible = netAssetsValue >= nisabThreshold;
    setIsEligible(eligible);
    
    if (eligible) {
      // Calculate zakat at 2.5% of net assets
      const zakat = netAssetsValue * 0.025;
      setZakatAmount(zakat);
    } else {
      setZakatAmount(0);
    }
  };

  const handlePayZakat = () => {
    if (!isEligible) {
      Alert.alert(
        "Tidak Wajib Zakat",
        "Harta Anda belum mencapai nisab. Anda tidak wajib membayar zakat mal saat ini.",
        [{ text: "OK" }]
      );
      return;
    }
    
    if (zakatAmount) {
      Alert.alert(
        "Konfirmasi Pembayaran",
        `Anda akan membayar zakat mal sebesar ${formatCurrency(zakatAmount)}. Lanjutkan?`,
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
                "Terima kasih telah menunaikan zakat. Semoga menjadi berkah bagi Anda.",
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
            <Text style={styles.headerTitle}>Zakat Mal</Text>
            <Text style={styles.headerSubtitle}>
              Hitung dan bayar zakat harta Anda
            </Text>
          </View>

          {/* Explanation Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tentang Zakat Mal</Text>
            <Text style={styles.explanationText}>
              Zakat Mal adalah zakat yang dikeluarkan atas harta yang dimiliki selama satu tahun 
              dan telah mencapai nisab. Nisab Zakat Mal adalah setara dengan 85 gram emas 
              ({formatCurrency(nisabThreshold)}). Jumlah yang wajib dikeluarkan adalah 2.5% dari 
              total harta bersih (harta dikurangi hutang).
            </Text>
          </View>

          {/* Calculator Form */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kalkulator Zakat Mal</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Total Harta (Rp)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={assets}
                  onChangeText={handleAssetsChange}
                  keyboardType="numeric"
                  placeholder="Masukkan total harta"
                />
              </View>
              <Text style={styles.inputHelper}>
                Termasuk uang tunai, tabungan, investasi, emas, properti, dll.
              </Text>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Total Hutang (Rp)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={debts}
                  onChangeText={handleDebtsChange}
                  keyboardType="numeric"
                  placeholder="Masukkan total hutang"
                />
              </View>
              <Text style={styles.inputHelper}>
                Hutang yang harus dibayar dalam waktu dekat.
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
                <Text style={styles.resultLabel}>Total Harta</Text>
                <Text style={styles.resultValue}>{formatCurrency(parseInt(parseFormattedNumber(assets) || '0'))}</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Total Hutang</Text>
                <Text style={styles.resultValue}>{formatCurrency(parseInt(parseFormattedNumber(debts) || '0'))}</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Harta Bersih</Text>
                <Text style={styles.resultValue}>{formatCurrency(netAssets || 0)}</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Nisab (85g Emas)</Text>
                <Text style={styles.resultValue}>{formatCurrency(nisabThreshold)}</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Status Kewajiban</Text>
                <Text style={[
                  styles.resultValue, 
                  { color: isEligible ? '#4CAF50' : '#F44336' }
                ]}>
                  {isEligible ? 'Wajib Zakat' : 'Tidak Wajib Zakat'}
                </Text>
              </View>
              
              <View style={[styles.resultItem, styles.zakatResult]}>
                <Text style={styles.zakatResultLabel}>Zakat yang Harus Dibayar (2.5%)</Text>
                <Text style={styles.zakatResultValue}>{formatCurrency(zakatAmount)}</Text>
              </View>
              
              <TouchableOpacity 
                style={[
                  styles.payButton,
                  !isEligible && { backgroundColor: '#9E9E9E' }
                ]}
                onPress={handlePayZakat}
              >
                <Text style={styles.payButtonText}>
                  {isEligible ? 'Bayar Zakat Sekarang' : 'Tidak Wajib Zakat'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
});