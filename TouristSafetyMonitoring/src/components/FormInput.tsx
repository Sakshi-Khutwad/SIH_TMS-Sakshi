import MaterialIcons from "@react-native-vector-icons/material-icons";
import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Animated,
} from "react-native";

interface Props {
  label: string;
  icon?: React.ReactNode;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: "default" | "email-address" | "phone-pad" | "numeric";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  maxLength?: number;
  secureTextEntry?: boolean;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  autoCorrect?: boolean;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
}

const FormInput: React.FC<Props> = ({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = "default",
  autoCapitalize = "none",
  maxLength,
  secureTextEntry = false,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  onFocus,
  onBlur,
  autoCorrect = false,
  returnKeyType = "done",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const animatedValue = new Animated.Value(0);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
    
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
    
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const getBorderColor = () => {
    if (error) return "#ef4444";
    if (isFocused) return "#5c5a5aff";
    return "#e5e7eb";
  };

  const getBackgroundColor = () => {
    if (error) return "#fef2f2";
    // if (isFocused) return "#ffffffff";
    if (!editable) return "#f9fafb";
    return "#f9fafb";
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getCharacterCount = () => {
    if (!maxLength) return null;
    
    const isNearLimit = value.length > maxLength * 0.8;
    return (
      <Text style={[
        styles.characterCount,
        {fontFamily: 'Outfit-Regular'},
        isNearLimit && styles.characterCountWarning,
        value.length >= maxLength && styles.characterCountError
      ]}>
        {value.length}/{maxLength}
      </Text>
    );
  };

  return (
    <View style={styles.inputGroup}>
      <View style={styles.labelContainer}>
        {/* <Text style={styles.label}>{label}</Text> */}
        {getCharacterCount()}
      </View>
      
      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
          },
          multiline && styles.multilineContainer,
        ]}
      >
        {icon && (
          <Text style={[
            styles.inputIcon,
            !editable && styles.inputIconDisabled
          ]}>
            {icon}
          </Text>
        )}
        
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
            !editable && styles.inputDisabled,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#c9ced7ff"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCorrect={autoCorrect}
          returnKeyType={returnKeyType}
          textAlignVertical={multiline ? "top" : "center"}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            <Text style={styles.passwordToggleText}>
              {isPasswordVisible ? "👁️" : "🙈"}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
      
      {error && (
        <View style={styles.errorContainer}>
          <MaterialIcons
            name="error-outline"
            size={20}
            color="red"
            style={styles.errorIcon}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {!error && isFocused && placeholder && (
        <Text style={styles.helperText}>
          {placeholder}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: { 
    marginBottom: 14,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  label: { 
    fontSize: 16, 
    fontFamily: 'Outfit-Regular', 
    color: "#374151",
  },
  characterCount: {
    fontFamily: 'Outfit-Regular', 
    fontSize: 12,
    color: "#9ca3af",
  },
  characterCountWarning: {
    color: "#f59e0b",
  },
  characterCountError: {
    color: "#ef4444",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 0.6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 50,
    fontFamily: 'Outfit-Regular',
    // backgroundColor: "rgb(241 245 249)",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 1,
  },
  multilineContainer: {
    alignItems: "flex-start",
    minHeight: 100,
  },
  inputIcon: { 
    fontSize: 20, 
    marginRight: 12,
    marginTop: 2,
  },
  inputIconDisabled: {
    opacity: 0.5,
  },
  input: { 
    flex: 1, 
    fontSize: 12, 
    fontFamily: 'Outfit-Regular',
    color: "#374151",
    paddingVertical: 0,
  },
  multilineInput: {
    minHeight: 80,
    paddingTop: 4,
  },
  inputDisabled: {
    color: "#9ca3af",
  },
  passwordToggle: {
    padding: 4,
    marginLeft: 8,
    marginTop: -2,
  },
  passwordToggleText: {
    fontSize: 18,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: 4,
  },
  errorIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  errorText: { 
    fontFamily: 'Outfit-Regular',
    fontSize: 12, 
    color: "#ef4444",
    flex: 1,
    lineHeight: 16,
  },
  helperText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
    marginLeft: 4,
    fontStyle: "italic",
  },
});

export default FormInput;