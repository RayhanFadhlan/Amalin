import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl,
  Dimensions,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { mockTransactions, mockDonorDistribution } from '../data/mockData';
import { Transaction } from '../types';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

export default function ZakatScreen({ navigation }) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [mapView, setMapView] = useState(true); // Toggle between map and chart view

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
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[Colors.light.primary]} 
            tintColor={Colors.light.primary}
          />
        }
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Zakat</Text>
          <Text style={styles.headerSubtitle}>
            Terakhir diperbarui: {lastUpdated.toLocaleTimeString('id-ID')}
          </Text>
        </View>

        {/* Statistics Section */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name="people" size={20} color="#fff" />
            </View>
            <Text style={styles.statValue}>{totalDonors}</Text>
            <Text style={styles.statLabel}>Total Donatur</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: Colors.light.success }]}>
              <MaterialCommunityIcons name="cash-multiple" size={20} color="#fff" />
            </View>
            <Text style={styles.statValue}>{formatCurrency(totalDonations)}</Text>
            <Text style={styles.statLabel}>Total Donasi</Text>
          </Card>
        </View>

        {/* Explanation Section */}
        <Card>
          <Text style={styles.sectionTitle}>Tentang Zakat</Text>
          <Text style={styles.explanationText}>
            Zakat adalah salah satu rukun Islam yang wajib dikeluarkan oleh setiap muslim yang 
            hartanya telah mencapai nisab. Zakat membersihkan harta dan jiwa, serta membantu 
            mereka yang membutuhkan. Ada beberapa jenis zakat, termasuk Zakat Mal (harta) 
            dan Zakat Fitrah yang dikeluarkan di bulan Ramadhan.
          </Text>
        </Card>

        {/* Donor Distribution Section */}
        <Card>
          <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Persebaran Donatur</Text>
            <View style={styles.viewToggleContainer}>
              <TouchableOpacity 
                style={[
                  styles.viewToggleButton, 
                  mapView ? styles.viewToggleActive : null
                ]}
                onPress={() => setMapView(true)}
              >
                <Feather 
                  name="map" 
                  size={16} 
                  color={mapView ? Colors.light.primary : Colors.light.subtext} 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.viewToggleButton, 
                  !mapView ? styles.viewToggleActive : null
                ]}
                onPress={() => setMapView(false)}
              >
                <Feather 
                  name="bar-chart-2" 
                  size={16} 
                  color={!mapView ? Colors.light.primary : Colors.light.subtext} 
                />
              </TouchableOpacity>
            </View>
          </View>
          
          {mapView ? (
            <View style={styles.mapContainer}>
              {/* Map mockup */}
              <View style={styles.mapWrapper}>
                <View style={styles.map}>
                  {/* Indonesia map mockup */}
                  <View style={styles.mapBackground}>
                    {/* Map markers for each region */}
                    {mockDonorDistribution.map((region, index) => {
                      // Calculate random positions for markers
                      const top = 20 + Math.random() * 60;
                      const left = 10 + Math.random() * 80;
                      const size = Math.max(20, (region.count / 50) * 10);
                      
                      return (
                        <View 
                          key={index}
                          style={[
                            styles.mapMarker,
                            { 
                              top: `${top}%`, 
                              left: `${left}%`,
                              width: size,
                              height: size,
                              backgroundColor: `rgba(0, 102, 204, ${0.4 + (region.count / 500)})`
                            }
                          ]}
                        >
                          <Text style={styles.mapMarkerText}>{region.count}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
                <View style={styles.mapLegend}>
                  <View style={styles.mapLegendItem}>
                    <View style={[styles.mapLegendDot, { backgroundColor: 'rgba(0, 102, 204, 0.4)' }]} />
                    <Text style={styles.mapLegendText}>{'< 100 Donatur'}</Text>
                  </View>
                  <View style={styles.mapLegendItem}>
                    <View style={[styles.mapLegendDot, { backgroundColor: 'rgba(0, 102, 204, 0.6)' }]} />
                    <Text style={styles.mapLegendText}>100-200 Donatur</Text>
                  </View>
                  <View style={styles.mapLegendItem}>
                    <View style={[styles.mapLegendDot, { backgroundColor: 'rgba(0, 102, 204, 0.8)' }]} />
                    <Text style={styles.mapLegendText}>{'> 200 Donatur'}</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.distributionContainer}>
              {mockDonorDistribution.map((region, index) => (
                <View key={index} style={styles.regionItem}>
                  <View style={styles.regionNameContainer}>
                    <Text style={styles.regionName}>{region.region}</Text>
                    <Text style={styles.regionCount}>{region.count}</Text>
                  </View>
                  <View style={styles.barContainer}>
                    <View 
                      style={[
                        styles.bar, 
                        { 
                          width: `${(region.count / Math.max(...mockDonorDistribution.map(r => r.count))) * 100}%`,
                        }
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </View>
          )}
        </Card>

        {/* Real-time Transactions Section */}
        <Card>
          <Text style={styles.sectionTitle}>Transaksi Terbaru</Text>
          <View style={styles.transactionsContainer}>
            {transactions.slice(0, 5).map((transaction, index) => (
              <View key={transaction.id} style={[
                styles.transactionItem,
                index === transactions.slice(0, 5).length - 1 ? { borderBottomWidth: 0 } : null
              ]}>
                <View style={[
                  styles.transactionIcon,
                  { backgroundColor: transaction.type === 'mal' ? Colors.light.primary : Colors.light.warning }
                ]}>
                  <FontAwesome5 
                    name={transaction.type === 'mal' ? 'money-bill-wave' : 'hand-holding-heart'} 
                    size={16} 
                    color="#fff" 
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
          
          {transactions.length > 5 && (
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>Lihat Semua Transaksi</Text>
              <Feather name="chevron-right" size={16} color={Colors.light.primary} />
            </TouchableOpacity>
          )}
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Button
            title="Kalkulator Zakat"
            onPress={() => navigation.navigate('ZakatCalculator')}
            icon={<Ionicons name="calculator-outline" size={20} color="#fff" style={{ marginRight: 8 }} />}
            style={styles.actionButton}
          />
          
          <Button
            title="Zakat Mal"
            onPress={() => navigation.navigate('ZakatMal')}
            variant="secondary"
            icon={<MaterialCommunityIcons name="cash" size={20} color="#fff" style={{ marginRight: 8 }} />}
            style={styles.actionButton}
          />
          
          <Button
            title="Zakat Fitrah"
            onPress={() => navigation.navigate('ZakatFitrah')}
            variant="outline"
            icon={<FontAwesome5 name="hand-holding-heart" size={20} color={Colors.light.primary} style={{ marginRight: 8 }} />}
            style={styles.actionButton}
            textStyle={{ color: Colors.light.primary }}
          />
        </View>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.subtext,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  viewToggleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    borderRadius: 8,
    padding: 2,
  },
  viewToggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  viewToggleActive: {
    backgroundColor: '#fff',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mapContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  mapWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    height: 200,
    backgroundColor: '#E8F4FC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapBackground: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  mapMarker: {
    position: 'absolute',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  mapMarkerText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mapLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#fff',
  },
  mapLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapLegendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  mapLegendText: {
    fontSize: 12,
    color: Colors.light.subtext,
  },
  distributionContainer: {
    marginTop: 8,
  },
  regionItem: {
    marginBottom: 16,
  },
  regionNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  regionName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
  regionCount: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.primary,
  },
  barContainer: {
    height: 8,
    backgroundColor: Colors.light.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: Colors.light.primary,
    borderRadius: 4,
  },
  transactionsContainer: {
    marginTop: 4,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.light.lightText,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  viewAllButtonText: {
    fontSize: 14,
    color: Colors.light.primary,
    marginRight: 4,
  },
  actionContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  actionButton: {
    marginBottom: 12,
  },
});