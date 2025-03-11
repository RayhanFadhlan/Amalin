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
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { goldPricePerGram, nisabThreshold } from '../data/mockData';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import { NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function ZakatCalculatorScreen({ navigation } : { navigation : NavigationProp<any>}) {
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Kalkulator Zakat</Text>
          <Text style={styles.headerSubtitle}>
            Hitung zakat Anda dengan mudah
          </Text>
        </View>

        {/* Explanation Section */}
        <Card>
          <Text style={styles.sectionTitle}>Tentang Kalkulator Zakat</Text>
          <Text style={styles.explanationText}>
            Kalkulator ini membantu Anda menghitung jumlah zakat yang perlu dikeluarkan 
            berdasarkan jenis zakat dan nilai harta Anda. Nisab (batas minimum) untuk Zakat Mal 
            adalah setara dengan 85 gram emas ({formatCurrency(nisabThreshold)}).
          </Text>
        </Card>

        {/* Zakat Types Section */}
        <Card>
          <Text style={styles.sectionTitle}>Pilih Jenis Zakat</Text>
          
          <TouchableOpacity 
            style={styles.zakatTypeCard}
            onPress={() => navigation.navigate('ZakatMal')}
          >
            <View style={styles.zakatTypeIconContainer}>
              <MaterialCommunityIcons name="cash-multiple" size={24} color="#fff" />
            </View>
            <View style={styles.zakatTypeContent}>
              <Text style={styles.zakatTypeTitle}>Zakat Mal (Harta)</Text>
              <Text style={styles.zakatTypeDescription}>
                Zakat atas harta yang dimiliki selama satu tahun dengan nilai mencapai nisab.
              </Text>
              <View style={styles.zakatTypeDetails}>
                <View style={styles.zakatTypeDetailItem}>
                  <Text style={styles.zakatTypeDetailLabel}>Nisab:</Text>
                  <Text style={styles.zakatTypeDetailValue}>{formatCurrency(nisabThreshold)}</Text>
                </View>
                <View style={styles.zakatTypeDetailItem}>
                  <Text style={styles.zakatTypeDetailLabel}>Persentase:</Text>
                  <Text style={styles.zakatTypeDetailValue}>2.5%</Text>
                </View>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color={Colors.light.lightText} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.zakatTypeCard}
            onPress={() => navigation.navigate('ZakatFitrah')}
          >
            <View style={[styles.zakatTypeIconContainer, { backgroundColor: Colors.light.secondary }]}>
              <FontAwesome5 name="hand-holding-heart" size={20} color="#fff" />
            </View>
            <View style={styles.zakatTypeContent}>
              <Text style={styles.zakatTypeTitle}>Zakat Fitrah</Text>
              <Text style={styles.zakatTypeDescription}>
                Zakat yang wajib dikeluarkan oleh setiap muslim di bulan Ramadhan sebelum Idul Fitri.
              </Text>
              <View style={styles.zakatTypeDetails}>
                <View style={styles.zakatTypeDetailItem}>
                  <Text style={styles.zakatTypeDetailLabel}>Jumlah:</Text>
                  <Text style={styles.zakatTypeDetailValue}>2.5 kg beras per orang</Text>
                </View>
                <View style={styles.zakatTypeDetailItem}>
                  <Text style={styles.zakatTypeDetailLabel}>Alternatif:</Text>
                  <Text style={styles.zakatTypeDetailValue}>Nilai uang setara</Text>
                </View>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color={Colors.light.lightText} />
          </TouchableOpacity>
        </Card>

        {/* Gold Price Information */}
        <Card>
          <Text style={styles.sectionTitle}>Informasi Harga Emas</Text>
          <View style={styles.goldPriceContainer}>
            <View style={styles.goldPriceItem}>
              <View style={styles.goldPriceIconContainer}>
                <FontAwesome5 name="coins" size={16} color="#fff" />
              </View>
              <Text style={styles.goldPriceLabel}>Harga Emas per Gram</Text>
              <Text style={styles.goldPriceValue}>{formatCurrency(goldPricePerGram)}</Text>
            </View>
            <View style={styles.goldPriceItem}>
              <View style={[styles.goldPriceIconContainer, { backgroundColor: Colors.light.warning }]}>
                <MaterialCommunityIcons name="scale-balance" size={16} color="#fff" />
              </View>
              <Text style={styles.goldPriceLabel}>Nisab (85 gram emas)</Text>
              <Text style={styles.goldPriceValue}>{formatCurrency(nisabThreshold)}</Text>
            </View>
          </View>
          <Text style={styles.goldPriceNote}>
            *Harga emas dapat berubah setiap hari. Nilai di atas adalah perkiraan.
          </Text>
        </Card>
      </ScrollView>
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
  zakatTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  zakatTypeIconContainer: {
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  zakatTypeContent: {
    flex: 1,
    marginRight: 8,
  },
  zakatTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  zakatTypeDescription: {
    fontSize: 13,
    color: Colors.light.subtext,
    marginBottom: 8,
    lineHeight: 18,
  },
  zakatTypeDetails: {
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 8,
  },
  zakatTypeDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  zakatTypeDetailLabel: {
    fontSize: 12,
    color: Colors.light.subtext,
    fontWeight: '500',
  },
  zakatTypeDetailValue: {
    fontSize: 12,
    color: Colors.light.text,
    fontWeight: '600',
  },
  goldPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  goldPriceItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  goldPriceIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  goldPriceLabel: {
    fontSize: 12,
    color: Colors.light.subtext,
    marginBottom: 4,
    textAlign: 'center',
  },
  goldPriceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  goldPriceNote: {
    fontSize: 12,
    color: Colors.light.lightText,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
  },
});