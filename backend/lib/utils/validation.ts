interface ValidationResult {
  valid: boolean;
  errors?: Record<string, string>;
}

export const validate = (data: Record<string, any>): ValidationResult => {
  const errors: Record<string, string> = {};
  
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (data.password && data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
};