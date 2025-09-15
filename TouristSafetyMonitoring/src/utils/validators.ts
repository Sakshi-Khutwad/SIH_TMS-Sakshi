// Name validation with improved checks
export const validateName = (name: string): string => {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return "Name is required";
  }
  
  if (trimmedName.length < 2) {
    return "Name must be at least 2 characters";
  }
  
  if (trimmedName.length > 50) {
    return "Name cannot exceed 50 characters";
  }
  
  // Check for invalid characters (allow letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(trimmedName)) {
    return "Name can only contain letters, spaces, hyphens, and apostrophes";
  }
  
  // Check for consecutive spaces
  if (trimmedName.includes('  ')) {
    return "Name cannot contain consecutive spaces";
  }
  
  return "";
};

// Email validation with comprehensive regex
export const validateEmail = (email: string): string => {
  const trimmedEmail = email.trim().toLowerCase();
  
  if (!trimmedEmail) {
    return "Email is required";
  }
  
  if (trimmedEmail.length > 254) {
    return "Email address is too long";
  }
  
  // More comprehensive email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return "Please enter a valid email address";
  }
  
  return "";
};

// Enhanced phone validation for Indian numbers
export const validatePhone = (phone: string): string => {
  const cleanedPhone = phone.replace(/\s+/g, '');
  
  if (!cleanedPhone) {
    return "Phone number is required";
  }
  
  // Indian mobile numbers start with 6, 7, 8, or 9 and have 10 digits
  const phoneRegex = /^[6-9]\d{9}$/;
  
  if (!phoneRegex.test(cleanedPhone)) {
    if (cleanedPhone.length !== 10) {
      return "Phone number must be exactly 10 digits";
    } else if (!/^[6-9]/.test(cleanedPhone)) {
      return "Phone number must start with 6, 7, 8, or 9";
    } else {
      return "Please enter a valid Indian mobile number";
    }
  }
  
  return "";
};

// Enhanced document validation
export const validateDocument = (
  doc: string,
  type: "aadhaar" | "pan" | "passport"
): string => {
  const trimmedDoc = doc.trim();
  
  if (!trimmedDoc) {
    const docName = type === "aadhaar" ? "Aadhaar" : 
                   type === "pan" ? "PAN" : "Passport";
    return `${docName} number is required`;
  }

  if (type === "aadhaar") {
    const cleaned = trimmedDoc.replace(/\s+/g, '');
    const aadhaarRegex = /^\d{12}$/;
    
    if (!aadhaarRegex.test(cleaned)) {
      if (cleaned.length !== 12) {
        return "Aadhaar number must be exactly 12 digits";
      } else if (!/^\d+$/.test(cleaned)) {
        return "Aadhaar number can only contain digits";
      } else {
        return "Please enter a valid Aadhaar number";
      }
    }
    
    // Additional Aadhaar validation - check for invalid patterns
    if (/^0{12}$/.test(cleaned) || /^1{12}$/.test(cleaned)) {
      return "Please enter a valid Aadhaar number";
    }
    
  } else if (type === "pan") {
    const upperDoc = trimmedDoc.toUpperCase();
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    
    if (!panRegex.test(upperDoc)) {
      if (upperDoc.length !== 10) {
        return "PAN number must be exactly 10 characters";
      } else {
        return "PAN format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)";
      }
    }
    
    // Check for invalid PAN patterns
    const invalidPatterns = ['AAAAA0000A', 'BBBBB1111B'];
    if (invalidPatterns.includes(upperDoc)) {
      return "Please enter a valid PAN number";
    }
    
  } else if (type === "passport") {
    const upperDoc = trimmedDoc.toUpperCase();
    // Indian Passport format: 1 letter + 7 digits (e.g., A1234567)
    // Updated to exclude I, O, Q, U, X, Z as first letters (as per Indian passport rules)
    const passportRegex = /^[A-HJ-NPR-WY][1-9]\d{6}$/;
    
    if (!passportRegex.test(upperDoc)) {
      if (upperDoc.length !== 8) {
        return "Passport number must be exactly 8 characters";
      } else if (!/^[A-Z]/.test(upperDoc)) {
        return "Passport number must start with a letter";
      } else if (!/^[A-Z]\d{7}$/.test(upperDoc)) {
        return "Passport format: 1 letter + 7 digits (e.g., A1234567)";
      } else if (/^[IOQUXZ]/.test(upperDoc)) {
        return "Passport number cannot start with I, O, Q, U, X, or Z";
      } else if (/^[A-Z]0/.test(upperDoc)) {
        return "Passport number cannot have 0 as the second character";
      } else {
        return "Please enter a valid Indian passport number";
      }
    }
  }
  
  return "";
};

// Utility function to validate all fields at once
export const validateAllFields = (
  name: string,
  email: string,
  phone: string,
  documentNumber: string,
  docType: "aadhaar" | "pan" | "passport",
  photo: string
) => {
  return {
    name: validateName(name),
    email: validateEmail(email),
    phone: validatePhone(phone),
    documentNumber: validateDocument(documentNumber, docType),
    photo: photo ? "" : "Photo is required"
  };
};