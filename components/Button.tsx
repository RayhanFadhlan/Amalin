import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator,
  ViewStyle,
  TextStyle
} from 'react-native';
import Colors from '../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon
}: ButtonProps) {
  
  const getButtonStyle = () => {
    let buttonStyle = [styles.button];
    
    // Add variant style
    switch (variant) {
      case 'primary':
        buttonStyle.push({ ...styles.button, ...styles.primaryButton });
        break;
      case 'secondary':
        buttonStyle.push({ ...styles.button, ...styles.secondaryButton });
        break;
      case 'outline':
        buttonStyle.push({ ...styles.button, ...styles.outlineButton });
        break;
    }
    
    // Add size style
    switch (size) {
      case 'small':
        buttonStyle.push({ ...styles.button, ...styles.smallButton });
        break;
      case 'medium':
        buttonStyle.push({ ...styles.button, ...styles.mediumButton });
        break;
      case 'large':
        buttonStyle.push({ ...styles.button, ...styles.largeButton });
        break;
    }
    
    // Add disabled style
    if (disabled || loading) {
      buttonStyle.push({ ...styles.button, ...styles.disabledButton });
    }
    
    // Add custom style
    return [...buttonStyle, style || {}];
  };
  
  const getTextStyle = () => {
    let textStyleArray = [styles.buttonText];
    
    // Add variant text style
    switch (variant) {
      case 'primary':
        textStyleArray.push({ ...styles.buttonText, ...styles.primaryButtonText });
        break;
      case 'secondary':
        textStyleArray.push({ ...styles.buttonText, ...styles.secondaryButtonText });
        break;
      case 'outline':
        textStyleArray.push({ ...styles.buttonText, ...styles.outlineButtonText });
        break;
    }
    
    // Add size text style
    switch (size) {
      case 'small':
        textStyleArray.push({ ...styles.buttonText, ...styles.smallButtonText });
        break;
      case 'medium':
        textStyleArray.push({ ...styles.buttonText, ...styles.mediumButtonText });
        break;
      case 'large':
        textStyleArray.push({ ...styles.buttonText, ...styles.largeButtonText });
        break;
    }
    
    // Add disabled text style
    if (disabled || loading) {
      textStyleArray.push({ ...styles.buttonText, ...styles.disabledButtonText });
    }
    
    
    
    return [...textStyleArray, textStyle || {}]
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? Colors.light.primary : '#fff'} 
          size="small" 
        />
      ) : (
        <>
          {icon}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.light.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: 8,
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#fff',
  },
  outlineButtonText: {
    color: Colors.light.primary,
  },
  smallButtonText: {
    fontSize: 12,
  },
  mediumButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 16,
  },
  disabledButtonText: {
    opacity: 0.8,
  },
});