import React, { useState } from "react";
// import { BASE_URL } from '@env'
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FormInput from "../components/FormInput";
import PhotoUploader from "../components/PhotoUploader";
import DocumentPicker from "../components/DocumentPicker";
import {
  formatPhoneNumber,
  formatDocumentNumber,
} from "../utils/formatters";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateDocument,
} from "../utils/validators";
import { registerUser } from "../utils/api";
import MaterialIcons from "@react-native-vector-icons/material-icons";

interface FormData {
  name: string;
  email: string;
  phone: string;
  documentNumber: string;
  photo: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  documentNumber?: string;
  photo?: string;
}

const RegisterScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    documentNumber: "",
    photo: "",
  });

  const [docType, setDocType] = useState<"aadhaar" | "pan" | "passport">("aadhaar");
  const [showDocPicker, setShowDocPicker] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      documentNumber: validateDocument(formData.documentNumber, docType),
    };

    if (!formData.photo) {
      newErrors.photo = "Photo is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      documentNumber: "",
      photo: "",
    });
    setDocType("aadhaar");
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fix the errors and try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        docType: docType,
        document_number: formData.documentNumber,
        photo: formData.photo
      };
      const response = await registerUser(payload);

      if (response.success) {
        Alert.alert(
          "Registration Successful!",
          "Your account has been created successfully.",
          [{ text: "OK", onPress: resetForm }]
        );
      } else {
        Alert.alert("Registration Failed", response.message || "Something went wrong");
      }
      // navigation.replace('Home')
    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert(
        "Error",
        error.message || "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDocumentTypeLabel = () => {
    switch (docType) {
      case "aadhaar": return "Aadhaar Card";
      case "pan": return "PAN Card";
      case "passport": return "Passport";
      default: return "Select Document";
    }
  };

  const getDocumentPlaceholder = () => {
    switch (docType) {
      case "aadhaar": return "Enter Aadhaar Number";
      case "pan": return "Enter PAN Card Number";
      case "passport": return "Enter Passport Number";
      default: return "";
    }
  };

  const getDocumentLabel = () => {
    switch (docType) {
      case "aadhaar": return "Aadhaar Number";
      case "pan": return "PAN Number";
      case "passport": return "Passport Number";
      default: return "Document Number";
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#e7f2f8ff" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <View style={styles.header}>
            <Text style={styles.title}>Join Tourguard</Text>
          </View>
          <View style={[styles.header]}>
            <Text style={{ fontFamily: 'Outfit-Thin' }}>Your Safety Journey begins here!</Text>
          </View>

          {/* Full Name */}
          <FormInput
            label=""
            icon={<MaterialIcons name="person" size={20} color="#c9ced7ff" />}
            value={formData.name}
            onChangeText={(text) => updateFormData('name', text)}
            placeholder="Enter your full name"
            error={errors.name}
            autoCapitalize="words"
          />

          {/* Email */}
          <FormInput
            label="Email Address"
            icon={<MaterialIcons name="email" size={20} color="#c9ced7ff" />}
            value={formData.email}
            onChangeText={(text) => updateFormData('email', text)}
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          {/* Phone */}
          <FormInput
            label="Phone Number"
            icon={<MaterialIcons name="phone" size={20} color="#c9ced7ff" />}
            value={formData.phone}
            onChangeText={(text) => updateFormData('phone', formatPhoneNumber(text))}
            placeholder="Enter 10-digit phone number"
            keyboardType="phone-pad"
            // maxLength={11}
            error={errors.phone}
          />

          {/* Document type selector */}
          <View style={styles.inputGroup}>
            {/* <Text style={styles.label}>Document Type</Text> */}
            <TouchableOpacity
              style={[styles.dropdown, errors.documentNumber && styles.dropdownError]}
              onPress={() => setShowDocPicker(true)}
            >
              <Text style={styles.dropdownText}>
                {getDocumentTypeLabel()}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Document Number */}
          <FormInput
            label={getDocumentLabel()}
            value={formData.documentNumber}
            onChangeText={(text) =>
              updateFormData('documentNumber', formatDocumentNumber(text, docType))
            }
            placeholder={getDocumentPlaceholder()}
            autoCapitalize={
              docType === "pan" || docType === "passport" ? "characters" : "none"
            }
            error={errors.documentNumber}
          />

          {/* Photo Uploader */}
          <PhotoUploader
            onPhotoSelected={(base64) => updateFormData('photo', base64)}
          />
          {errors.photo && (
            <Text style={styles.errorText}>{errors.photo}</Text>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By registering, you agree to our Terms of Service and Privacy Policy.{"\n"}
            Your information is encrypted and secure.
          </Text>
        </View>
      </ScrollView>

      {/* Document Picker Modal */}
      <DocumentPicker
        visible={showDocPicker}
        selected={docType}
        onSelect={(val) => {
          setDocType(val);
          // Clear document number when changing type
          updateFormData('documentNumber', '');
        }}
        onClose={() => setShowDocPicker(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e7f2f8ff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  form: {
    backgroundColor: "#f9fafb",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    alignItems: "center",
    marginBottom: 8,
    marginTop: 6,
  },
  title: {
    fontSize: 24,
    // fontWeight: "bold",
    // fontStyle: "normal",
    fontFamily: 'Outfit-Bold',
    color: "#374151",
    // marginBottom: 2,
  },
  subtitle: {
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    color: "#6b7280",
  },
  inputGroup: {
    marginBottom: 14
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownError: {
    fontFamily: 'Outfit-Regular',
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  dropdownText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    color: "#374151",
  },
  dropdownIcon: {
    fontSize: 12,
    color: "#6b7280",
  },
  submitButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: "#9ca3af",
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
    color: "#fff"
  },
  disclaimer: {
    fontFamily: 'Outfit-Thin',
    fontSize: 9,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 16,
    lineHeight: 14,
  },
  errorText: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: -16,
    marginBottom: 16,
    marginLeft: 4,
  },
});

export default RegisterScreen;