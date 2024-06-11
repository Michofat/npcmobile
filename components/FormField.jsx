import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormField = ({
  keyboardType,
  maxLength,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">
        {placeholder}
      </Text>

      <TouchableOpacity style={{ width: "100%", height: 60 }}>
        <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
          <TextInput
            className="flex-1 text-white font-psemibold text-base"
            editable
            value={value}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            maxLength={maxLength}
            onChangeText={handleChangeText}
            secureTextEntry={placeholder === "Password" && !showPassword}
            {...props}
          />

          {placeholder === "Password" && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ padding: 10 }}
            >
              <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FormField;
