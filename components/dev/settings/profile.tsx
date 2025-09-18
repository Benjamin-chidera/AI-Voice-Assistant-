import { useAuthStore } from "@/store/auth.store";
import { profileTypes } from "@/types/settings.types";
import { Image } from "expo-image";
import { Upload } from "lucide-react-native";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Profile = ({ image, pickImage }: profileTypes) => {
  const { user, getUser} = useAuthStore();

  console.log(user); 

  useEffect(() => {  
    getUser() ;
  }, []) 
  

  return ( 
    <View>
      <View className="mt-5">
        <TouchableOpacity
          onPress={pickImage}
          className="justify-center items-center rounded-full w-40 h-40 mx-auto bg-gray-800 border-2 border-gray-600"
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ 
                width: 160,
                height: 160,
                borderRadius: 80,
              }}
              contentFit="cover"
            />
          ) : (
            <View className="justify-center items-center">
              <Upload size={30} color="white" />
              <Text className="text-white text-sm mt-2">Upload Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text className="mt-4 text-white font-bold text-lg text-center capitalize">
          {user.fullname}
        </Text>
      </View>
    </View>
  );
};

export default Profile;
