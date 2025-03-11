import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import Button from '../components/Button';
import { mockDoas, mockUsers } from '../data/mockData';



import { NavigationProp } from '@react-navigation/native';
import { Doa, User } from '../types';



export default function DoaScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [doas, setDoas] = useState<Doa[]>(mockDoas);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'following'>('all');
  const currentUser = mockUsers[0]; // Assume first user is current user

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleAmeen = (doaId: string) => {
    setDoas(
      doas.map((doa) => {
        if (doa.id === doaId) {
          const isAmeen = !doa.isAmeen;
          return {
            ...doa,
            isAmeen,
            ameenCount: isAmeen ? doa.ameenCount + 1 : doa.ameenCount - 1,
          };
        }
        return doa;
      })
    );
  };

  const handleShare = (doaId: string) => {
    Alert.alert('Share', 'Sharing functionality will be implemented here');
  };

  const handleReport = (doaId: string) => {
    Alert.alert(
      'Laporkan Doa',
      'Apakah Anda yakin ingin melaporkan doa ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Laporkan',
          onPress: () => {
            Alert.alert('Terima kasih', 'Laporan Anda telah kami terima dan akan segera ditindaklanjuti.');
          },
        },
      ]
    );
  };

  const getUserById = (userId: string): User => {
    return mockUsers.find((user) => user.id === userId) || mockUsers[0];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} detik yang lalu`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} hari yang lalu`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} bulan yang lalu`;
    }
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} tahun yang lalu`;
  };

  const filteredDoas = doas.filter((doa) => {
    const user = getUserById(doa.userId);
    const matchesSearch = 
      doa.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'following') {
      // In a real app, you would check if the user is following the doa creator
      // For now, let's just show a subset of doas for the "Following" tab
      return matchesSearch && parseInt(doa.userId.slice(4)) % 2 === 0;
    }
    
    return matchesSearch;
  });

  const renderDoaItem = ({ item }: { item: Doa }) => {
    const user = getUserById(item.userId);
    
    return (
      <Card style={styles.doaCard}>
        <View style={styles.doaHeader}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: user.photoUrl }}
              style={styles.userAvatar}
            />
            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.doaTime}>{formatDate(item.updatedAt)}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => {
              Alert.alert(
                'Opsi',
                'Pilih tindakan',
                [
                  {
                    text: 'Bagikan',
                    onPress: () => handleShare(item.id),
                  },
                  {
                    text: 'Laporkan',
                    onPress: () => handleReport(item.id),
                  },
                  {
                    text: 'Batal',
                    style: 'cancel',
                  },
                ]
              );
            }}
          >
            <Ionicons name="ellipsis-vertical" size={20} color={Colors.light.subtext} />
          </TouchableOpacity>
        </View>
        
        <View 
          style={[
            styles.doaContent,
            item.templateBackground ? {
              backgroundColor: item.templateBackground,
              borderRadius: 12,
              padding: 16,
              marginVertical: 12,
            } : null
          ]}
        >
          <Text style={[
            styles.doaText,
            item.templateBackground ? { color: '#fff', textAlign: 'center' } : null
          ]}>
            {item.text}
          </Text>
        </View>
        
        <View style={styles.doaActions}>
          <TouchableOpacity
            style={[styles.actionButton, item.isAmeen ? styles.activeActionButton : null]}
            onPress={() => handleAmeen(item.id)}
          >
            <FontAwesome5
              name="hands-helping"
              size={16}
              color={item.isAmeen ? Colors.light.primary : Colors.light.subtext}
            />
            <Text
              style={[
                styles.actionText,
                item.isAmeen ? styles.activeActionText : null,
              ]}
            >
              Aamiin ({item.ameenCount})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleShare(item.id)}
          >
            <Ionicons name="share-social-outline" size={18} color={Colors.light.subtext} />
            <Text style={styles.actionText}>Bagikan</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doa</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('MyDoas')}
          >
            <Ionicons name="bookmark-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('CreateDoa')}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={Colors.light.subtext} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari doa..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.light.lightText}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.light.subtext} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' ? styles.activeTab : null]}
          onPress={() => setActiveTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'all' ? styles.activeTabText : null,
            ]}
          >
            Semua
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'following' ? styles.activeTab : null]}
          onPress={() => setActiveTab('following')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'following' ? styles.activeTabText : null,
            ]}
          >
            Mengikuti
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredDoas}
        renderItem={renderDoaItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.light.primary]}
            tintColor={Colors.light.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={60} color={Colors.light.lightText} />
            <Text style={styles.emptyText}>Tidak ada doa yang ditemukan</Text>
          </View>
        }
      />
      
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('CreateDoa')}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    backgroundColor: Colors.light.primary,
    padding: 20,
    paddingTop: 40, // Add top padding
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  headerButtons: {
    flexDirection: "row",
  },
  headerButton: {
    marginLeft: 16,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: -20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: Colors.light.text,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  activeTab: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.subtext,
  },
  activeTabText: {
    color: "#fff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  doaCard: {
    marginBottom: 16,
  },
  doaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 2,
  },
  doaTime: {
    fontSize: 12,
    color: Colors.light.lightText,
  },
  moreButton: {
    padding: 8,
  },
  doaContent: {
    marginBottom: 12,
  },
  doaText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  doaActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  activeActionButton: {
    backgroundColor: Colors.light.primary + "20",
  },
  actionText: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginLeft: 6,
  },
  activeActionText: {
    color: Colors.light.primary,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.lightText,
    marginTop: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});