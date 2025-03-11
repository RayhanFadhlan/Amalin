import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import { mockTemplates } from '../data/mockData';

interface Template {
  id: string;
  background: string;
}

export default function CreateDoaScreen({ navigation, route }) {
  const [doaText, setDoaText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(false);
  const isEditing = route.params?.doaId !== undefined;
  const editingDoa = route.params?.doa || null;

  // If editing, pre-fill the form
  React.useEffect(() => {
    if (editingDoa) {
      setDoaText(editingDoa.text);
      if (editingDoa.templateBackground) {
        const template = mockTemplates.find(t => t.background === editingDoa.templateBackground);
        if (template) {
          setSelectedTemplate(template);
        }
      }
    }
  }, [editingDoa]);

  const handleSubmit = () => {
    if (!doaText.trim()) {
      Alert.alert('Error', 'Silakan masukkan doa Anda');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      if (isEditing) {
        Alert.alert(
          'Berhasil',
          'Doa berhasil diperbarui',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert(
          'Berhasil',
          'Doa berhasil dibuat',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    }, 1000);
  };

  const handleSaveTemplate = () => {
    if (!doaText.trim()) {
      Alert.alert('Error', 'Silakan masukkan doa Anda');
      return;
    }
    
    Alert.alert(
      'Simpan Template',
      'Apakah Anda ingin menyimpan doa ini sebagai template?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Simpan',
          onPress: () => {
            // Simulate saving template
            Alert.alert('Berhasil', 'Template berhasil disimpan');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Edit Doa' : 'Buat Doa'}
          </Text>
          <TouchableOpacity
            style={styles.saveTemplateButton}
            onPress={handleSaveTemplate}
          >
            <Ionicons name="bookmark-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.formContainer}>
            <View
              style={[
                styles.textInputContainer,
                selectedTemplate ? {
                  backgroundColor: selectedTemplate.background,
                  borderRadius: 16,
                  padding: 16,
                } : null,
              ]}
            >
              <TextInput
                style={[
                  styles.textInput,
                  selectedTemplate ? { color: '#fff', textAlign: 'center' } : null,
                ]}
                placeholder="Tulis doa Anda di sini..."
                placeholderTextColor={selectedTemplate ? 'rgba(255, 255, 255, 0.7)' : Colors.light.lightText}
                value={doaText}
                onChangeText={setDoaText}
                multiline
                textAlignVertical="top"
              />
            </View>

            <Text style={styles.sectionTitle}>Pilih Template</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.templatesContainer}
            >
              <TouchableOpacity
                style={[
                  styles.templateItem,
                  !selectedTemplate ? styles.selectedTemplateItem : null,
                ]}
                onPress={() => setSelectedTemplate(null)}
              >
                <View style={styles.templatePreview}>
                  <Text style={styles.templatePreviewText}>Aa</Text>
                </View>
                <Text style={styles.templateName}>Default</Text>
              </TouchableOpacity>
              
              {mockTemplates.map((template) => (
                <TouchableOpacity
                  key={template.id}
                  style={[
                    styles.templateItem,
                    selectedTemplate?.id === template.id ? styles.selectedTemplateItem : null,
                  ]}
                  onPress={() => setSelectedTemplate(template)}
                >
                  <View
                    style={[
                      styles.templatePreview,
                      { backgroundColor: template.background },
                    ]}
                  >
                    <Text style={styles.templatePreviewText}>Aa</Text>
                  </View>
                  <Text style={styles.templateName}>Template {template.id}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Bagikan Ke</Text>
            <View style={styles.shareOptionsContainer}>
              <TouchableOpacity style={styles.shareOption}>
                <View style={[styles.shareOptionIcon, { backgroundColor: Colors.light.primary }]}>
                  <Ionicons name="globe-outline" size={20} color="#fff" />
                </View>
                <Text style={styles.shareOptionText}>Publik</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.shareOption}>
                <View style={[styles.shareOptionIcon, { backgroundColor: Colors.light.secondary }]}>
                  <Ionicons name="people-outline" size={20} color="#fff" />
                </View>
                <Text style={styles.shareOptionText}>Teman</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.shareOption}>
                <View style={[styles.shareOptionIcon, { backgroundColor: Colors.light.success }]}>
                  <Ionicons name="lock-closed-outline" size={20} color="#fff" />
                </View>
                <Text style={styles.shareOptionText}>Pribadi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={isEditing ? 'Perbarui Doa' : 'Bagikan Doa'}
            onPress={handleSubmit}
            loading={loading}
            size="large"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  keyboardAvoidingView: {
    flex: 1,
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
  saveTemplateButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  textInputContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    minHeight: 150,
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
  },
  templatesContainer: {
    paddingBottom: 16,
  },
  templateItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  selectedTemplateItem: {
    transform: [{ scale: 1.05 }],
  },
  templatePreview: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: Colors.light.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  templatePreviewText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  templateName: {
    fontSize: 12,
    color: Colors.light.subtext,
  },
  shareOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  shareOption: {
    alignItems: 'center',
    width: '30%',
  },
  shareOptionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  shareOptionText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    backgroundColor: Colors.light.card,
  },
});