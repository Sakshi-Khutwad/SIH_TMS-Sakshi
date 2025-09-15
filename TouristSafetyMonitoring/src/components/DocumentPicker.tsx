import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface DocumentOption {
  id: "aadhaar" | "pan" | "passport";
  label: string;
  format: string;
  description: string;
  icon: string;
}

const options: DocumentOption[] = [
  { 
    id: "aadhaar", 
    label: "Aadhaar Card", 
    format: "XXXX XXXX XXXX", 
    description: "12-digit unique identity number",
    icon: "🆔"
  },
  { 
    id: "pan", 
    label: "PAN Card", 
    format: "ABCDE1234F", 
    description: "Permanent Account Number for tax purposes",
    icon: "💳"
  },
  { 
    id: "passport", 
    label: "Passport", 
    format: "A1234567", 
    description: "Indian passport for international travel",
    icon: "📘"
  },
];

interface Props {
  visible: boolean;
  onClose: () => void;
  selected: "aadhaar" | "pan" | "passport";
  onSelect: (value: "aadhaar" | "pan" | "passport") => void;
}

const DocumentPicker: React.FC<Props> = ({
  visible,
  onClose,
  selected,
  onSelect,
}) => {
  const handleSelect = (docType: "aadhaar" | "pan" | "passport") => {
    onSelect(docType);
    onClose();
  };

  const renderDocumentOption = ({ item }: { item: DocumentOption }) => (
    <TouchableOpacity
      style={[
        styles.option,
        selected === item.id && styles.optionSelected,
      ]}
      onPress={() => handleSelect(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.optionContent}>
        <Text style={styles.optionIcon}>{item.icon}</Text>
        <View style={styles.optionTextContainer}>
          <Text
            style={[
              styles.optionLabel,
              selected === item.id && styles.optionLabelSelected,
            ]}
          >
            {item.label}
          </Text>
          <Text style={styles.optionFormat}>Format: {item.format}</Text>
          <Text style={styles.optionDescription}>{item.description}</Text>
        </View>
        {selected === item.id && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal 
      visible={visible} 
      transparent 
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Document Type</Text>
            <Text style={styles.subtitle}>Choose the document you want to use for verification</Text>
          </View>
          
          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={renderDocumentOption}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.optionsList}
          />
          
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    width: "90%",
    maxWidth: 400,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  title: { 
    fontFamily: 'Outfit-Bold',
    fontSize: 20, 
    // fontWeight: "bold", 
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  optionsList: {
    padding: 16,
  },
  option: { 
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 0.6,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  optionSelected: { 
    backgroundColor: "#ecfdf5",
    borderColor: "#10b981",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: { 
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
    color: "#374151",
    marginBottom: 2,
  },
  optionLabelSelected: { 
    color: "#10b981",
  },
  optionFormat: {
    fontSize: 13,
    color: "#6b7280",
    fontFamily: "Outfit-Regular",
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 12,
    fontFamily: "Outfit-Regular",
    color: "#9ca3af",
    lineHeight: 16,
  },
  checkmark: {
    fontSize: 20,
    color: "#10b981",
    fontWeight: "bold",
    marginLeft: 8,
  },
  cancelButton: { 
    // fontFamily: 'Outfit-Regular',
    margin: 16,
    marginTop: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cancelButtonText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    // fontWeight: "600",
    color: "#6b7280",
  },
});

export default DocumentPicker;