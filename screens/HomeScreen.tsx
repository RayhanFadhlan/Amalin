import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import { mockDoas, mockUsers, mockArticles, mockQuotes } from '../data/mockData';
import { NavigationProp } from "@react-navigation/native";
import { Article, Doa, Quote, User } from '../types';

const { width } = Dimensions.get('window');





export default function HomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [refreshing, setRefreshing] = useState(false);
  const [quote, setQuote] = useState<Quote>(mockQuotes[0]);
  const [doas, setDoas] = useState<Doa[]>(mockDoas.slice(0, 3));
  const [articles, setArticles] = useState<Article[]>(mockArticles.slice(0, 3));

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      // Get a random quote
      const randomQuote =
        mockQuotes[Math.floor(Math.random() * mockQuotes.length)];
      setQuote(randomQuote);
      setRefreshing(false);
    }, 1000);
  };

  const getUserById = (userId: string): User => {
    return mockUsers.find((user) => user.id === userId) || mockUsers[0];
  };

  const formatDate = (dateString: string): string => {
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

  const renderDoaItem = ({ item }: { item: Doa }) => {
    const user = getUserById(item.userId);

    return (
      <Card style={styles.doaCard} key={item.id}>
        <View style={styles.doaHeader}>
          <View style={styles.userInfo}>
            <Image source={{ uri: user.photoUrl }} style={styles.userAvatar} />
            <View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.doaTime}>{formatDate(item.updatedAt)}</Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.doaContent,
            item.templateBackground
              ? {
                  backgroundColor: item.templateBackground,
                  borderRadius: 12,
                  padding: 16,
                  marginVertical: 12,
                }
              : null,
          ]}
        >
          <Text
            style={[
              styles.doaText,
              item.templateBackground
                ? { color: "#fff", textAlign: "center" }
                : null,
            ]}
          >
            {item.text}
          </Text>
        </View>

        <View style={styles.doaActions}>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5
              name="hands-helping"
              size={16}
              color={Colors.light.subtext}
            />
            <Text style={styles.actionText}>Aamiin ({item.ameenCount})</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  const renderArticleItem = ({ item }: { item: Article }) => {
    return (
      <TouchableOpacity style={styles.articleCard} key={item.id}>
        <Image source={{ uri: item.imageUrl }} style={styles.articleImage} />
        <View style={styles.articleContent}>
          <Text style={styles.articleCategory}>{item.category}</Text>
          <Text style={styles.articleTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.articleDate}>{formatDate(item.publishedAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Assalamu'alaikum</Text>
          <Text style={styles.userName}>Ahmad Fauzi</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{ uri: mockUsers[0].photoUrl }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
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
        {/* Daily Quote */}
        <Card style={styles.quoteCard}>
          <View style={styles.quoteIconContainer}>
            <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
          </View>
          <Text style={styles.quoteText}>{quote.text}</Text>
          <Text style={styles.quoteAuthor}>— {quote.author}</Text>
        </Card>

        {/* Menu Icons */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("ZakatTab")}
          >
            <View
              style={[styles.menuIconContainer, { backgroundColor: "#1E88E5" }]}
            >
              <FontAwesome5 name="hand-holding-heart" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Zakat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[styles.menuIconContainer, { backgroundColor: "#43A047" }]}
            >
              <FontAwesome5 name="donate" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Infaq</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("DoaTab")}
          >
            <View
              style={[styles.menuIconContainer, { backgroundColor: "#7B1FA2" }]}
            >
              <Ionicons name="book" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Doa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[styles.menuIconContainer, { backgroundColor: "#FB8C00" }]}
            >
              <Ionicons name="newspaper" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Artikel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[styles.menuIconContainer, { backgroundColor: "#E53935" }]}
            >
              <Ionicons name="trophy" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Leaderboard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[styles.menuIconContainer, { backgroundColor: "#039BE5" }]}
            >
              <Ionicons name="globe" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Global</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[styles.menuIconContainer, { backgroundColor: "#00897B" }]}
            >
              <Ionicons name="calendar" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Jadwal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[styles.menuIconContainer, { backgroundColor: "#8E24AA" }]}
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>Lainnya</Text>
          </TouchableOpacity>
        </View>

        {/* Doa Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Doa Terbaru</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => navigation.navigate("DoaTab")}
          >
            <Text style={styles.seeAllText}>Lihat Semua</Text>
            <Feather
              name="chevron-right"
              size={16}
              color={Colors.light.primary}
            />
          </TouchableOpacity>
        </View>

        {doas.map((doa) => renderDoaItem({ item: doa }))}

        {/* Articles Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Artikel Terbaru</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
            <Feather
              name="chevron-right"
              size={16}
              color={Colors.light.primary}
            />
          </TouchableOpacity>
        </View>

        {articles.map((article) => renderArticleItem({ item: article }))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: 20, // Add padding to avoid notch
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    // paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  quoteCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
  },
  quoteIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
    fontStyle: "italic",
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "600",
    textAlign: "right",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  menuItem: {
    alignItems: "center",
    width: (width - 40) / 4,
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  menuText: {
    fontSize: 12,
    color: Colors.light.text,
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.light.primary,
    marginRight: 4,
  },
  doaCard: {
    marginHorizontal: 20,
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

  doaTime: {
    fontSize: 12,
    color: Colors.light.lightText,
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
  actionText: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginLeft: 6,
  },
  articleCard: {
    flexDirection: "row",
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  articleImage: {
    width: 100,
    height: 100,
  },
  articleContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  articleCategory: {
    fontSize: 12,
    color: Colors.light.primary,
    fontWeight: "600",
    marginBottom: 4,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 8,
  },
  articleDate: {
    fontSize: 12,
    color: Colors.light.lightText,
  },
});