import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    Platform
} from "react-native";
import MaterialIcons from '@react-native-vector-icons/material-icons';

import {
    launchCamera,
    CameraOptions,
    MediaType,
    ImagePickerResponse
} from "react-native-image-picker";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import { requestCameraPermission } from '../utils/permissions';

interface Props {
    onPhotoSelected: (base64: string) => void;
}

const PhotoUploader: React.FC<Props> = ({ onPhotoSelected }) => {
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const requestCameraPermission = async (): Promise<boolean> => {
        try {
            const permission = Platform.OS === 'ios'
                ? PERMISSIONS.IOS.CAMERA
                : PERMISSIONS.ANDROID.CAMERA;

            const result = await request(permission);
            return result === RESULTS.GRANTED;
        } catch (error) {
            console.error('Permission request error:', error);
            return false;
        }
    };

    const takePhoto = async () => {
        try {
            setIsLoading(true);

            // Request camera permission
            const hasPermission = await requestCameraPermission();
            if (!hasPermission) {
                setIsLoading(false);
                return;
            }

            const options: CameraOptions = {
                mediaType: 'photo' as MediaType,
                includeBase64: true,
                quality: 0.7,
                maxWidth: 1000,
                maxHeight: 1000,
            };

            launchCamera(options, (response: ImagePickerResponse) => {
                setIsLoading(false);

                if (response.didCancel) {
                    return;
                }

                if (response.errorMessage) {
                    Alert.alert('Error', response.errorMessage);
                    return;
                }

                const asset = response.assets && response.assets[0];
                if (asset && asset.base64) {
                    const dataUri = `data:${asset.type || "image/jpeg"};base64,${asset.base64}`;
                    setPhotoUri(asset.uri || null);
                    onPhotoSelected(dataUri);
                } else {
                    Alert.alert('Error', 'Failed to capture photo. Please try again.');
                }
            });
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Error', 'Failed to access camera. Please try again.');
            console.error('Camera error:', error);
        }
    };

    const clearPhoto = () => {
        setPhotoUri(null);
        onPhotoSelected('');
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.label}>Take Your Photo</Text> */}
            <Text style={styles.subtitle}>Please take a clear photo of yourself</Text>

            {photoUri ? (
                <View style={styles.photoContainer}>
                    <Image source={{ uri: photoUri }} style={styles.preview} />
                    <View style={styles.photoActions}>
                        <TouchableOpacity style={styles.retakeButton} onPress={takePhoto}>
                            <Text style={styles.retakeButtonText}>Retake Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.clearButton} onPress={clearPhoto}>
                            <Text style={styles.clearButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <TouchableOpacity
                    style={[styles.cameraButton, isLoading && styles.cameraButtonDisabled]}
                    onPress={takePhoto}
                    disabled={isLoading}
                >
                    <MaterialIcons name="camera-alt" style={styles.cameraIcon} color="black" />
                    <Text style={styles.cameraButtonText}>
                        {isLoading ? 'Opening Camera...' : 'Take Photo'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    label: {
        fontFamily: 'Outfit-Regular',
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 4
    },
    subtitle: {
        fontFamily: 'Outfit-Thin',
        fontSize: 14,
        color: "#6b7280",
        marginBottom: 12,
        alignContent: "center",
        textAlign: "center"
    },
    cameraButton: {
        // backgroundColor: "#000",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 1,
        maxHeight: 50,
        // borderColor: "#dbeafe",
        // borderStyle: "dashed"
    },
    cameraButtonDisabled: {
        backgroundColor: "#9ca3af",
        borderColor: "#d1d5db"
    },
    cameraIcon: {
        fontSize: 22,
        marginRight: 8
    },
    cameraButtonText: {
        fontFamily: 'Outfit-Bold',
        fontSize: 16,
        color: "#000"
    },
    photoContainer: {
        alignItems: "center"
    },
    preview: {
        width: 150,
        height: 150,
        borderRadius: 12,
        marginBottom: 12
    },
    photoActions: {
        flexDirection: "row",
        gap: 10
    },
    retakeButton: {
        backgroundColor: "#f9fafb",
        borderColor: "#ef4444",
        borderWidth: 0.5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8
    },
    retakeButtonText: {
        fontFamily: 'Outfit-Bold',
        color: "#000"
    },
    clearButton: {
        backgroundColor: "#f9fafb",
        borderColor: "#ef4444",
        borderWidth: 0.5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8
    },
    clearButtonText: {
        color: "#000",
        fontFamily: 'Outfit-Bold'
    }
});

export default PhotoUploader;