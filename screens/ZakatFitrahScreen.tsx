import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { previousZakatFitrah } from '../data/mockData';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { NavigationProp } from '@react-navigation/native';

export default function ZakatFitrahScreen({ navigation } : { navigation : NavigationProp<any>}) {
  const [familyMembers, setFamilyMembers] = useState(previousZakatFitrah.familyMembers.toString());
  const [ricePrice, setRicePrice] = useState(previousZakatFitrah.ricePrice.toString());
  const [zakatAmount, setZakatAmount] = useState<number | null>(null);
  const [riceWeight, setRiceWeight] = useState<number | null>(null);
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
    setLoading(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const familyMembersValue = parseInt(familyMembers || '0');
      const ricePriceValue = parseInt(parseFormattedNumber(ricePrice) || '0');
      
      if (familyMembersValue <= 0) {
        Alert.alert(
          "Input Error",
          "Jumlah anggota keluarga harus lebih dari 0",
          [{ text: "OK" }]
        );
        setLoading(false);
        return;
      }
      
      if (ricePriceValue <= 0) {
        Alert.alert(
          "Input Error",
          "Harga beras per kg harus lebih dari 0",
          [{ text: "OK" }]
        );
        setLoading(false);
        return;
      }
      
      // Each person must pay 2.5 kg of rice or its equivalent in money
      const riceWeightValue = familyMembersValue * 2.5;
      setRiceWeight(riceWeightValue);
      
      // Calculate total zakat amount
      const totalZakat = riceWeightValue * ricePriceValue;
      setZakatAmount(totalZakat);
      
      setLoading(false);
    }, 800);
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Zakat Fitrah</Text>
            <Text style={styles.headerSubtitle}>
              Hitung dan bayar zakat fitrah untuk keluarga Anda
            </Text>
          </View>

          {/* Explanation Section */}
          <Card>
            <Text style={styles.sectionTitle}>Tentang Zakat Fitrah</Text>
            <Text style={styles.explanationText}>
              Zakat Fitrah adalah zakat yang wajib dikeluarkan oleh setiap muslim di bulan Ramadhan 
              sebelum shalat Idul Fitri. Besarnya adalah 2.5 kg beras (atau makanan pokok) per orang 
              atau nilai uang yang setara. Zakat Fitrah bertujuan untuk membersihkan puasa kita dan 
              membantu orang yang kurang mampu agar dapat merayakan Idul Fitri.
            </Text>
          </Card>

          {/* Calculator Form */}
          <Card>
            <Text style={styles.sectionTitle}>Kalkulator Zakat Fitrah</Text>
            
            <Input
              label="Jumlah Anggota Keluarga"
              value={familyMembers}
              onChangeText={handleFamilyMembersChange}
              keyboardType="numeric"
              placeholder="Masukkan jumlah anggota keluarga"
              helper="Termasuk diri Anda dan semua anggota keluarga yang Anda tanggung."
              leftIcon={<FontAwesome5 name="users" size={18} color={Colors.light.primary} />}
            />
            
            <Input
              label="Harga Beras per Kg (Rp)"
              value={ricePrice}
              onChangeText={handleRicePriceChange}
              keyboardType="numeric"
              placeholder="Masukkan harga beras per kg"
              helper="Harga beras berkualitas menengah di daerah Anda."
              leftIcon={<FontAwesome5 name="wheat" size={18} color={Colors.light.primary} />}
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
              
              <View style={styles.zakatResult}>
                <Text style={styles.zakatResultLabel}>Total Zakat Fitrah</Text>
                <Text style={styles.zakatResultValue}>{formatCurrency(zakatAmount || 0)}</Text>
              </View>
              
              <Button
                title="Bayar Zakat Sekarang"
                onPress={handlePayZakat}
                size="large"
                style={{ marginTop: 16 }}
              />
            </Card>
          )}

          {/* Additional Information */}
          <Card>
            <Text style={styles.sectionTitle}>Informasi Tambahan</Text>
            
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <FontAwesome5 name="calendar-alt" size={18} color="#fff" />
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
              <View style={[styles.infoIconContainer, { backgroundColor: Colors.light.secondary }]}>
                <FontAwesome5 name="hands-helping" size={18} color="#fff" />
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
              <View style={[styles.infoIconContainer, { backgroundColor: Colors.light.success }]}>
                <FontAwesome5 name="balance-scale" size={18} color="#fff" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Jumlah yang Wajib</Text>
                <Text style={styles.infoText}>
                  Setiap muslim wajib mengeluarkan 2.5 kg beras atau makanan pokok yang setara 
                  dengan kualitas yang biasa dikonsumsi.
                </Text>
              </View>
            </View>
          </Card>
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
  infoItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: Colors.light.subtext,
    lineHeight: 20,
  },
});