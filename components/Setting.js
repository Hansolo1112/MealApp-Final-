import React, { useState } from 'react'; // Import React and the useState hook
import { StyleSheet, Modal, Text, Pressable, View } from 'react-native'; // Import components from React Native for creating a modal

import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon library
import { Entypo } from '@expo/vector-icons'; // Import icons from Expo vector icons

const Setting = () => {
    // Define an array of settings data, each item having an id, title, content, and icon
    const settingData = [
        { id: 1, title: 'About', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur gravida imperdiet. Mauris venenatis dui neque, quis blandit elit semper vitae. Duis ut lacus quis sapien accumsan tempor. Mauris non.', icon: 'question-circle-o' },
        { id: 2, title: 'Terms and condition', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur gravida imperdiet. Mauris venenatis dui neque, quis blandit elit semper vitae. Duis ut lacus quis sapien accumsan tempor. Mauris non.', icon: 'file-o' },
        { id: 3, title: 'Help and Support', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur gravida imperdiet. Mauris venenatis dui neque, quis blandit elit semper vitae. Duis ut lacus quis sapien accumsan tempor. Mauris non.', icon: 'phone' },
    ];
    // Define state variable to keep track of the active modal index
    const [activeModalIndex, setActiveModalIndex] = useState(null);
    // Function to open a modal by setting the active index
    const openModal = (index) => {
        setActiveModalIndex(index);
    };
    // Function to close the active modal by resetting the active index to null
    const closeModal = () => {
        setActiveModalIndex(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.modalButtonContainer}>
                {settingData.map((settingData, index) => (
                    <Pressable style={styles.modalButtonStart} key={settingData.id} onPress={() => openModal(index)}>
                        <View style={styles.modalButton}>
                            <Icon name={settingData.icon} size={24} style={styles.icon} />
                            <Text style={styles.modalHeading}>{settingData.title}</Text>
                        </View>
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </Pressable>
                ))}
            </View>
            {settingData.map((settingData, index) => (
                <Modal
                    key={settingData.id}
                    visible={activeModalIndex === index}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBox}>
                            <Text style={styles.modalTitle}>{settingData.title}</Text>
                            <Text style={styles.modalContent}>{settingData.content}</Text>

                            <Pressable style={styles.buttonStart} onPress={closeModal}>
                                <Text style={styles.buttonText}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            ))}
        </View>
    );
};

export default Setting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    modalButtonContainer: {
        gap: 10,
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    modalButtonStart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalHeading: {
        fontSize: 20,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        width: '80%',
        borderWidth: 2,
        borderColor: '#F18404',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    modalContent: {
        fontSize: 16,
        textAlign: 'justify',
    },
    buttonStart: {
        marginTop: 10,
        backgroundColor: '#F18404',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        borderRadius: 10,
        elevation: 5,
        padding: 16,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});
