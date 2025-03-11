import React from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  Text, 
  ViewStyle,
  TextStyle,
  TextInputProps
} from 'react-native';
import Colors from '../constants/Colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({ 
  label,
  error,
  helper,
  containerStyle,
  labelStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      
      <View style={[
        styles.inputContainer, 
        error ? styles.inputError : null,
        inputStyle
      ]}>
        {leftIcon && (
          <View style={styles.iconContainer}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.light.lightText}
          {...props}
        />
        
        {rightIcon && (
          <View style={styles.iconContainer}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {(error || helper) && (
        <Text style={[
          styles.helperText,
          error ? styles.errorText : null
        ]}>
          {error || helper}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    backgroundColor: Colors.light.card,
    overflow: 'hidden',
  },
  inputError: {
    borderColor: Colors.light.error,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.light.text,
  },
  iconContainer: {
    paddingHorizontal: 12,
  },
  helperText: {
    fontSize: 12,
    color: Colors.light.lightText,
    marginTop: 4,
    marginLeft: 4,
  },
  errorText: {
    color: Colors.light.error,
  },
});