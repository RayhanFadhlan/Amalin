import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { mockTransactions, mockDonorDistribution } from '../data/mockData';
import { Transaction } from '../types';

const { width } = Dimensions.get('window');

export default function ZakatScreen({ navigation }) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      // Add a new random transaction
      const newTransaction = {
        id: `${transactions.length + 1}`,
        type: Math.random() > 0.5 ? 'mal' : 'fitrah',
        amount: Math.floor(Math.random() * 5000000) + 30000,
        date: new Date().toISOString(),
        userId: `user${Math.floor(Math.random() * 100)}`,
      };
      
      setTransactions([newTransaction, ...transactions]);
      setLastUpdated(new Date());
      setRefreshing(false);
    }, 1000);
  };

  // Format currency to Indonesian Rupiah
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate total donations
  const totalDonations = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  
  // Calculate total donors
  const totalDonors = mockDonorDistribution.reduce((sum, region) => sum + region.count, 0);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Zakat</Text>
          <Text style={styles.headerSubtitle}>
            Terakhir diperbarui: {lastUpdated.toLocaleTimeString('id-ID')}
          </Text>
        </View>

        {/* Explanation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentang Zakat</Text>
          <Text style={styles.explanationText}>
            Zakat adalah salah satu rukun Islam yang wajib dikeluarkan oleh setiap muslim yang 
            hartanya telah mencapai nisab. Zakat membersihkan harta dan jiwa, serta membantu 
            mereka yang membutuhkan. Ada beberapa jenis zakat, termasuk Zakat Mal (harta) 
            dan Zakat Fitrah yang dikeluarkan di bulan Ramadhan.
          </Text>
        </View>

        {/* Statistics Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{totalDonors}</Text>
            <Text style={styles.statLabel}>Total Donatur</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="cash-multiple" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>{formatCurrency(totalDonations)}</Text>
            <Text style={styles.statLabel}>Total Donasi</Text>
          </View>
        </View>

        {/* Donor Distribution Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Persebaran Donatur</Text>
          <View style={styles.distributionContainer}>
            {mockDonorDistribution.map((region, index) => (
              <View key={index} style={styles.regionItem}>
                <Text style={styles.regionName}>{region.region}</Text>
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        width: `${(region.count / Math.max(...mockDonorDistribution.map(r => r.count))) * 100}%`,
                        backgroundColor: `hsl(${120 + index * 30}, 70%, 45%)` 
                      }
                    ]} 
                  />
                  <Text style={styles.regionCount}>{region.count}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Real-time Transactions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaksi Terbaru</Text>
          <View style={styles.transactionsContainer}>
            {transactions.slice(0, 5).map((transaction, index) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <FontAwesome5 
                    name={transaction.type === 'mal' ? 'money-bill-wave' : 'hand-holding-heart'} 
                    size={20} 
                    color="#fff" 
                    style={{ backgroundColor: transaction.type === 'mal' ? '#4CAF50' : '#FF9800', padding: 10, borderRadius: 25 }}
                  />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>
                    Zakat {transaction.type === 'mal' ? 'Mal' : 'Fitrah'}
                  </Text>
                  <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
                </View>
                <Text style={styles.transactionAmount}>
                  {formatCurrency(transaction.amount)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('ZakatCalculator')}
          >
            <Ionicons name="calculator-outline" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Kalkulator Zakat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#FF9800' }]}
            onPress={() => navigation.navigate('ZakatMal')}
          >
            <MaterialCommunityIcons name="cash" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Zakat Mal</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
            onPress={() => navigation.navigate('ZakatFitrah')}
          >
            <FontAwesome5 name="hand-holding-heart" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Zakat Fitrah</Text>
          </TouchableOpacity>
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
    marginBottom: 10,
    color: '#333',
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  distributionContainer: {
    marginTop: 10,
  },
  regionItem: {
    marginBottom: 12,
  },
  regionName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
  bar: {
    height: 10,
    borderRadius: 5,
  },
  regionCount: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
  },
  transactionsContainer: {
    marginTop: 5,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionIcon: {
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: 15,
    marginTop: 5,
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    width: '31%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '500',
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
});