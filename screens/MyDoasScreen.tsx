import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import { mockDoas, mockUsers } from '../data/mockData';

// Filter doas to only show the current user's doas
const currentUserId = mockUsers[0].id;
const myDoas = mockDoas.filter(doa => doa.userId === currentUserId);

export default function MyDoasScreen({ navigation }) {
  const [doas, setDoas] = useState(myDoas);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'doas' | 'templates'>('doas');

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleEdit = (doa) => {
    navigation.navigate('CreateDoa', { doaId: doa.id, doa });
  };

  const handleDelete = (doaId) => {
    Alert.alert(
      'Hapus Doa',
      'Apakah Anda yakin ingin menghapus doa ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            // Remove the doa from the list
            setDoas(doas.filter(doa => doa.id !== doaId));
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderDoaItem = ({ item }) => {
    return (
      <Card style={styles.doaCard}>
        <View style={styles.doaHeader}>
          <Text style={styles.doaTime}>{formatDate(item.updatedAt)}</Text>
          <View style={styles.doaActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleEdit(item)}
            >
              <Ionicons name="pencil" size={18} color={Colors.light.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDelete(item.id)}
            >
              <Ionicons name="trash-outline" size={18} color={Colors.light.error} />
            </TouchableOpacity>
          </View>
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
        
        <View style={styles.doaFooter}>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={16} color={Colors.light.primary} />
              <Text style={styles.statText}>{item.ameenCount} Aamiin</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };

  const renderTemplateItem = ({ item }) => {
    // For templates, we'll show a simplified version
    return (
      <Card style={styles.templateCard}>
        <View 
          style={[
            styles.templateContent,
            item.templateBackground ? {
              backgroundColor: item.templateBackground,
              borderRadius: 12,
              padding: 16,
            } : null
          ]}
        >
          <Text style={[
            styles.templateText,
            item.templateBackground ? { color: '#fff', textAlign: 'center' } : null
          ]}>
            {item.text}
          </Text>
        </View>
        
        <View style={styles.templateFooter}>
          <TouchableOpacity
            style={styles.templateButton}
            onPress={() => handleEdit(item)}
          >
            <Ionicons name="pencil" size={16} color={Colors.light.primary} />
            <Text style={styles.templateButtonText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.templateButton}
            onPress={() => {
              // Use template to create a new doa
              navigation.navigate('CreateDoa', { 
                template: {
                  text: item.text,
                  templateBackground: item.templateBackground
                }
              });
            }}
          >
            <Ionicons name="add-circle-outline" size={16} color={Colors.light.primary} />
            <Text style={styles.templateButtonText}>Gunakan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.templateButton}
            onPress={() => handleDelete(item.id)}
          >
            <Ionicons name="trash-outline" size={16} color={Colors.light.error} />
            <Text style={[styles.templateButtonText, { color: Colors.light.error }]}>Hapus</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  // Filter templates (doas with templateId)
  const templates = doas.filter(doa => doa.templateId);
  const regularDoas = doas.filter(doa => !doa.templateId);

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doa Saya</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'doas' ? styles.activeTab : null]}
          onPress={() => setActiveTab('doas')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'doas' ? styles.activeTabText : null,
            ]}
          >
            Doa Saya
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'templates' ? styles.activeTab : null]}
          onPress={() => setActiveTab('templates')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'templates' ? styles.activeTabText : null,
            ]}
          >
            Template
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={activeTab === 'doas' ? regularDoas : templates}
        renderItem={activeTab === 'doas' ? renderDoaItem : renderTemplateItem}
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
            <Ionicons
              name={activeTab === 'doas' ? 'document-text-outline' : 'bookmark-outline'}
              size={60}
              color={Colors.light.lightText}
            />
            <Text style={styles.emptyText}>
              {activeTab === 'doas'
                ? 'Anda belum membuat doa'
                : 'Anda belum memiliki template'}
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('CreateDoa')}
            >
              <Text style={styles.emptyButtonText}>
                {activeTab === 'doas' ? 'Buat Doa' : 'Buat Template'}
              </Text>
            </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.light.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
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
    fontWeight: '500',
    color: Colors.light.subtext,
  },
  activeTabText: {
    color: '#fff',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  doaCard: {
    marginBottom: 16,
  },
  doaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  doaTime: {
    fontSize: 12,
    color: Colors.light.lightText,
  },
  doaActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  doaContent: {
    marginBottom: 12,
  },
  doaText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  doaFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 12,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginLeft: 6,
  },
  templateCard: {
    marginBottom: 16,
  },
  templateContent: {
    marginBottom: 12,
  },
  templateText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  templateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 12,
  },
  templateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  templateButtonText: {
    fontSize: 14,
    color: Colors.light.primary,
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.lightText,
    marginTop: 16,
    marginBottom: 20,
  },
  emptyButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});