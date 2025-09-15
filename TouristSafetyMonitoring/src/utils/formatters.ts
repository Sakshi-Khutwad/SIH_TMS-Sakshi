// Enhanced phone number formatter for Indian numbers
export const formatPhoneNumber = (text: string): string => {
  // Remove all non-digits
  const cleaned = text.replace(/\D/g, "");
  
  // Limit to 10 digits
  const limited = cleaned.slice(0, 10);
  
  // Format as XXXXX XXXXX for better readability
  if (limited.length >= 6) {
    return `${limited.slice(0, 5)} ${limited.slice(5)}`;
  }
  
  return limited;
};

// Enhanced document number formatter with better validation
export const formatDocumentNumber = (
  text: string,
  type: "aadhaar" | "pan" | "passport"
): string => {
  switch (type) {
    case "aadhaar": {
      // Remove all non-digits
      const cleaned = text.replace(/\D/g, "");
      // Limit to 12 digits
      const limited = cleaned.slice(0, 12);
      // Format as XXXX XXXX XXXX
      return limited.replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    
    case "pan": {
      // Remove invalid characters and convert to uppercase
      let cleaned = text.replace(/[^A-Z0-9]/gi, "").toUpperCase();
      // Limit to 10 characters
      cleaned = cleaned.slice(0, 10);
      
      // Ensure proper PAN format: 5 letters, 4 digits, 1 letter
      let formatted = "";
      for (let i = 0; i < cleaned.length; i++) {
        const char = cleaned[i];
        if (i < 5) {
          // First 5 positions should be letters
          if (/[A-Z]/.test(char)) {
            formatted += char;
          }
        } else if (i >= 5 && i < 9) {
          // Positions 6-9 should be digits
          if (/[0-9]/.test(char)) {
            formatted += char;
          }
        } else if (i === 9) {
          // Last position should be a letter
          if (/[A-Z]/.test(char)) {
            formatted += char;
          }
        }
      }
      return formatted;
    }
    
    case "passport": {
      // Indian Passport: 1 letter + 7 digits
      let cleaned = text.replace(/[^A-Z0-9]/gi, "").toUpperCase();
      // Limit to 8 characters
      cleaned = cleaned.slice(0, 8);
      
      // Ensure proper passport format: 1 letter + 7 digits
      let formatted = "";
      for (let i = 0; i < cleaned.length; i++) {
        const char = cleaned[i];
        if (i === 0) {
          // First position should be a letter (excluding I, O, Q, U, X, Z)
          if (/[A-HJ-NPR-WY]/.test(char)) {
            formatted += char;
          }
        } else {
          // Remaining positions should be digits
          if (/[0-9]/.test(char)) {
            formatted += char;
          }
        }
      }
      return formatted;
    }
    
    default:
      return text;
  }
};

// Utility function to format name (capitalize words properly)
export const formatName = (text: string): string => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/\s+/g, ' ') // Remove extra spaces
    .trim();
};

// Email formatter (convert to lowercase and trim)
export const formatEmail = (text: string): string => {
  return text.toLowerCase().trim();
};

// Currency formatter for Indian Rupees
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Date formatter
export const formatDate = (date: Date, format: 'short' | 'long' | 'numeric' = 'short'): string => {
  const formatOptions: Record<'short' | 'long' | 'numeric', Intl.DateTimeFormatOptions> = {
    short: { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    },
    long: { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    },
    numeric: { 
      day: '2-digit', 
      month: '2-digit', 
      year: '2-digit' 
    }
  };
  
  return new Intl.DateTimeFormat('en-IN', formatOptions[format]).format(date);
};

// Remove formatting from phone number (for API calls)
export const unformatPhoneNumber = (formattedPhone: string): string => {
  return formattedPhone.replace(/\s+/g, '');
};

// Remove formatting from Aadhaar number (for API calls)
export const unformatAadhaar = (formattedAadhaar: string): string => {
  return formattedAadhaar.replace(/\s+/g, '');
};

// Mask sensitive information for display
export const maskAadhaar = (aadhaar: string): string => {
  const cleaned = unformatAadhaar(aadhaar);
  if (cleaned.length === 12) {
    return `XXXX XXXX ${cleaned.slice(8)}`;
  }
  return aadhaar;
};

export const maskPAN = (pan: string): string => {
  if (pan.length === 10) {
    return `${pan.slice(0, 3)}XXXX${pan.slice(7)}`;
  }
  return pan;
};

export const maskPhone = (phone: string): string => {
  const cleaned = unformatPhoneNumber(phone);
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 2)}XXXXXX${cleaned.slice(8)}`;
  }
  return phone;
};

// Validation helpers
export const isValidPhoneFormat = (phone: string): boolean => {
  const cleaned = unformatPhoneNumber(phone);
  return /^[6-9]\d{9}$/.test(cleaned);
};

export const isValidEmailFormat = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Text processing utilities
export const capitalizeWords = (text: string): string => {
  return text.replace(/\b\w/g, l => l.toUpperCase());
};

export const removeExtraSpaces = (text: string): string => {
  return text.replace(/\s+/g, ' ').trim();
};

export const sanitizeInput = (text: string): string => {
  // Remove potentially harmful characters while preserving normal text
  return text.replace(/[<>\"'&]/g, '');
};