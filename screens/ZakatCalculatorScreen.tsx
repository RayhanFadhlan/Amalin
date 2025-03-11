import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { goldPricePerGram, nisabThreshold } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function ZakatCalculatorScreen({ navigation }) {
  // Format currency to Indonesian Rupiah
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Kalkulator Zakat</Text>
          <Text style={styles.headerSubtitle}>
            Hitung zakat Anda dengan mudah
          </Text>
        </View>

        {/* Explanation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentang Kalkulator Zakat</Text>
          <Text style={styles.explanationText}>
            Kalkulator ini membantu Anda menghitung jumlah zakat yang perlu dikeluarkan 
            berdasarkan jenis zakat dan nilai harta Anda. Nisab (batas minimum) untuk Zakat Mal 
            adalah setara dengan 85 gram emas ({formatCurrency(nisabThreshold)}).
          </Text>
        </View>

        {/* Zakat Types Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pilih Jenis Zakat</Text>
          
          <TouchableOpacity 
            style={styles.zakatTypeCard}
            onPress={() => navigation.navigate('ZakatMal')}
          >
            <View style={styles.zakatTypeIconContainer}>
              <MaterialCommunityIcons name="cash-multiple" size={30} color="#fff" />
            </View>
            <View style={styles.zakatTypeContent}>
              <Text style={styles.zakatTypeTitle}>Zakat Mal (Harta)</Text>
              <Text style={styles.zakatTypeDescription}>
                Zakat atas harta yang dimiliki selama satu tahun dengan nilai mencapai nisab.
              </Text>
              <View style={styles.zakatTypeDetails}>
                <Text style={styles.zakatTypeDetailText}>
                  <Text style={styles.boldText}>Nisab:</Text> {formatCurrency(nisabThreshold)}
                </Text>
                <Text style={styles.zakatTypeDetailText}>
                  <Text style={styles.boldText}>Persentase:</Text> 2.5%
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#888" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.zakatTypeCard}
            onPress={() => navigation.navigate('ZakatFitrah')}
          >
            <View style={[styles.zakatTypeIconContainer, { backgroundColor: '#FF9800' }]}>
              <FontAwesome5 name="hand-holding-heart" size={24} color="#fff" />
            </View>
            <View style={styles.zakatTypeContent}>
              <Text style={styles.zakatTypeTitle}>Zakat Fitrah</Text>
              <Text style={styles.zakatTypeDescription}>
                Zakat yang wajib dikeluarkan oleh setiap muslim di bulan Ramadhan sebelum Idul Fitri.
              </Text>
              <View style={styles.zakatTypeDetails}>
                <Text style={styles.zakatTypeDetailText}>
                  <Text style={styles.boldText}>Jumlah:</Text> 2.5 kg beras per orang
                </Text>
                <Text style={styles.zakatTypeDetailText}>
                  <Text style={styles.boldText}>Alternatif:</Text> Nilai uang setara
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Gold Price Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Harga Emas</Text>
          <View style={styles.goldPriceContainer}>
            <View style={styles.goldPriceItem}>
              <Text style={styles.goldPriceLabel}>Harga Emas per Gram</Text>
              <Text style={styles.goldPriceValue}>{formatCurrency(goldPricePerGram)}</Text>
            </View>
            <View style={styles.goldPriceItem}>
              <Text style={styles.goldPriceLabel}>Nisab (85 gram emas)</Text>
              <Text style={styles.goldPriceValue}>{formatCurrency(nisabThreshold)}</Text>
            </View>
          </View>
          <Text style={styles.goldPriceNote}>
            *Harga emas dapat berubah setiap hari. Nilai di atas adalah perkiraan.
          </Text>
        </View>
      </ScrollView>
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
  zakatTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  zakatTypeIconContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  zakatTypeContent: {
    flex: 1,
  },
  zakatTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  zakatTypeDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  zakatTypeDetails: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 8,
  },
  zakatTypeDetailText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 3,
  },
  boldText: {
    fontWeight: 'bold',
  },
  goldPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  goldPriceItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  goldPriceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  goldPriceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  goldPriceNote: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
  },
});