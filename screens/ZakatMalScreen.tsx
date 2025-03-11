import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { goldPricePerGram, nisabThreshold, previousZakatMal } from '../data/mockData';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

export default function ZakatMalScreen({ navigation }) {
  const [assets, setAssets] = useState(previousZakatMal.assets.toString());
  const [debts, setDebts] = useState(previousZakatMal.debts.toString());
  const [zakatAmount, setZakatAmount] = useState<number | null>(null);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [netAssets, setNetAssets] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    
    // Simulate calculation delay
    setTimeout(() => {
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
      
      setLoading(false);
    }, 800);
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Zakat Mal</Text>
            <Text style={styles.headerSubtitle}>
              Hitung dan bayar zakat harta Anda
            </Text>
          </View>

          {/* Explanation Section */}
          <Card>
            <Text style={styles.sectionTitle}>Tentang Zakat Mal</Text>
            <Text style={styles.explanationText}>
              Zakat Mal adalah zakat yang dikeluarkan atas harta yang dimiliki selama satu tahun 
              dan telah mencapai nisab. Nisab Zakat Mal adalah setara dengan 85 gram emas 
              ({formatCurrency(nisabThreshold)}). Jumlah yang wajib dikeluarkan adalah 2.5% dari 
              total harta bersih (harta dikurangi hutang).
            </Text>
          </Card>

          {/* Calculator Form */}
          <Card>
            <Text style={styles.sectionTitle}>Kalkulator Zakat Mal</Text>
            
            <Input
              label="Total Harta (Rp)"
              value={assets}
              onChangeText={handleAssetsChange}
              keyboardType="numeric"
              placeholder="Masukkan total harta"
              helper="Termasuk uang tunai, tabungan, investasi, emas, properti, dll."
              leftIcon={<MaterialCommunityIcons name="cash-multiple" size={20} color={Colors.light.primary} />}
            />
            
            <Input
              label="Total Hutang (Rp)"
              value={debts}
              onChangeText={handleDebtsChange}
              keyboardType="numeric"
              placeholder="Masukkan total hutang"
              helper="Hutang yang harus dibayar dalam waktu dekat."
              leftIcon={<MaterialCommunityIcons name="cash-remove" size={20} color={Colors.light.primary} />}
            />
            
            <Button
              title="Hitung Zakat"
              onPress={calculateZakat}
              loading={loading}
              size="large"
              style={{ marginTop: 8 }}
            />
          </Card>

          {/* Results Section */}
          {zakatAmount !== null && (
            <Card>
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
                <View style={styles.statusContainer}>
                  <View style={[
                    styles.statusIndicator, 
                    { backgroundColor: isEligible ? Colors.light.success : Colors.light.error }
                  ]} />
                  <Text style={[
                    styles.statusText, 
                    { color: isEligible ? Colors.light.success : Colors.light.error }
                  ]}>
                    {isEligible ? 'Wajib Zakat' : 'Tidak Wajib Zakat'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.zakatResult}>
                <Text style={styles.zakatResultLabel}>Zakat yang Harus Dibayar (2.5%)</Text>
                <Text style={styles.zakatResultValue}>{formatCurrency(zakatAmount)}</Text>
              </View>
              
              <Button
                title={isEligible ? 'Bayar Zakat Sekarang' : 'Tidak Wajib Zakat'}
                onPress={handlePayZakat}
                disabled={!isEligible}
                size="large"
                style={{ marginTop: 16 }}
              />
            </Card>
          )}
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
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: Colors.light.primary,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.light.subtext,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  resultLabel: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  zakatResult: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  zakatResultLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.text,
    flex: 1,
  },
  zakatResultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
});