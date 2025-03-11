import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Card from '../components/Card';

export default function AboutScreen() {
  const openMap = () => {
    const address = "Jl. Sudirman No. 123, Jakarta Pusat";
    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  const openEmail = () => {
    Linking.openURL('mailto:info@zakatapp.com');
  };

  const openPhone = () => {
    Linking.openURL('tel:+6281234567890');
  };

  const openWebsite = () => {
    Linking.openURL('https://zakatapp.com');
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tentang Kami</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Company Profile */}
        <Card style={styles.section}>
          <View style={styles.companyHeader}>
            <Image
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5894/5894697.png' }}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.companyName}>Zakat App</Text>
          </View>
          
          <Text style={styles.sectionTitle}>Profil Perusahaan</Text>
          <Text style={styles.companyDescription}>
            Zakat App adalah platform digital yang didedikasikan untuk memudahkan umat Muslim dalam 
            menunaikan zakat, infaq, dan sedekah. Didirikan pada tahun 2020, kami telah membantu 
            ribuan orang menyalurkan dana mereka kepada yang membutuhkan dengan cara yang aman, 
            transparan, dan sesuai syariat.
          </Text>
          <Text style={styles.companyDescription}>
            Dengan tim yang terdiri dari para profesional di bidang teknologi dan ahli syariah, 
            kami berkomitmen untuk terus berinovasi dan memberikan layanan terbaik bagi pengguna 
            kami dan masyarakat luas.
          </Text>
        </Card>

        {/* Vision & Mission */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Visi & Misi</Text>
          
          <View style={styles.visionMissionItem}>
            <View style={styles.visionMissionIcon}>
              <Ionicons name="eye" size={24} color="#fff" />
            </View>
            <View style={styles.visionMissionContent}>
              <Text style={styles.visionMissionTitle}>Visi</Text>
              <Text style={styles.visionMissionText}>
                Menjadi platform zakat digital terpercaya dan terdepan di Indonesia yang 
                memudahkan umat Muslim menunaikan kewajiban zakatnya dan berkontribusi 
                dalam pengentasan kemiskinan.
              </Text>
            </View>
          </View>
          
          <View style={styles.visionMissionItem}>
            <View style={[styles.visionMissionIcon, { backgroundColor: Colors.light.secondary }]}>
              <Ionicons name="flag" size={24} color="#fff" />
            </View>
            <View style={styles.visionMissionContent}>
              <Text style={styles.visionMissionTitle}>Misi</Text>
              <Text style={styles.visionMissionText}>
                1. Menyediakan platform digital yang aman, mudah, dan transparan untuk zakat, 
                infaq, dan sedekah.
              </Text>
              <Text style={styles.visionMissionText}>
                2. Mengedukasi masyarakat tentang pentingnya zakat dan pengaruhnya terhadap 
                kesejahteraan sosial.
              </Text>
              <Text style={styles.visionMissionText}>
                3. Membangun jaringan distribusi zakat yang efektif dan tepat sasaran.
              </Text>
              <Text style={styles.visionMissionText}>
                4. Mengembangkan program-program pemberdayaan ekonomi untuk penerima zakat.
              </Text>
            </View>
          </View>
        </Card>

        {/* Address & Contact */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Alamat & Kontak</Text>
          
          <TouchableOpacity style={styles.contactItem} onPress={openMap}>
            <View style={styles.contactIconContainer}>
              <Ionicons name="location" size={24} color="#fff" />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>Alamat Kantor</Text>
              <Text style={styles.contactText}>
                Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta, 10220
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.subtext} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactItem} onPress={openEmail}>
            <View style={[styles.contactIconContainer, { backgroundColor: Colors.light.secondary }]}>
              <Ionicons name="mail" size={24} color="#fff" />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>Email</Text>
              <Text style={styles.contactText}>info@zakatapp.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.subtext} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactItem} onPress={openPhone}>
            <View style={[styles.contactIconContainer, { backgroundColor: Colors.light.success }]}>
              <Ionicons name="call" size={24} color="#fff" />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>Telepon</Text>
              <Text style={styles.contactText}>+62 812 3456 7890</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.subtext} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.contactItem} onPress={openWebsite}>
            <View style={[styles.contactIconContainer, { backgroundColor: '#FB8C00' }]}>
              <Ionicons name="globe" size={24} color="#fff" />
            </View>
            <View style={styles.contactContent}>
              <Text style={styles.contactTitle}>Website</Text>
              <Text style={styles.contactText}>www.zakatapp.com</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.subtext} />
          </TouchableOpacity>
        </Card>

        {/* Social Media */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Media Sosial</Text>
          
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="instagram" size={24} color="#E1306C" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="twitter" size={24} color="#1DA1F2" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="youtube" size={24} color="#FF0000" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome5 name="linkedin" size={24} color="#0A66C2" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Zakat App v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2023 Zakat App. All rights reserved.</Text>
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
  header: {
    backgroundColor: Colors.light.primary,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  companyHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
  },
  companyDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.light.subtext,
    marginBottom: 12,
  },
  visionMissionItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  visionMissionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  visionMissionContent: {
    flex: 1,
  },
  visionMissionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  visionMissionText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.subtext,
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.card,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  versionText: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: Colors.light.lightText,
  },
});