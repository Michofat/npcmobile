import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ title, handlePress, containerStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
      accessible={true}
      accessibilityLabel={title} // Provide a meaningful label for accessibility
    >
      <Text className={"text-white font-psemibold text-lg"}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
