import { Text, StyleSheet, TextInput } from "react-native";

const InputField = ({ title, value, onChangeText }) => (
  <>
    <Text style={styles.inputtitle}>{title}</Text>
    <TextInput
      maxLength={65}
      onChangeText={onChangeText}
      autoCapitalize="none"
      value={value}
      style={styles.input}
      selectTextOnFocus={false}
    />
  </>
);

export default InputField;

const styles = StyleSheet.create({
  inputtitle: {
    marginBottom: 10,
    fontSize: 18,
  },
  input: {
    marginBottom: 30,
    borderWidth: 0.5,
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
});
