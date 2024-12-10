import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";

export default function TodoItem({ todo, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [editedDate, setEditedDate] = useState(new Date(todo.date));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSaveEdit = () => {
    const formattedDate = editedDate.toISOString().split("T")[0];
    onEdit(todo.id, editedText, formattedDate);
    setIsEditing(false);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setEditedDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.itemContainer}>
      {isEditing ? (
        <>
          <View style={styles.editContainer}>
            <TextInput
              style={styles.inputText}
              value={editedText}
              onChangeText={setEditedText}
            />

            {/* Tombol untuk memunculkan DateTimePicker */}
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.iconButton}
            >
              <Icon name="calendar" size={20} color="blue" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={editedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {/* Simpan perubahan */}
            <TouchableOpacity
              onPress={handleSaveEdit}
              style={styles.iconButton}
            >
              <Icon name="checkmark-circle" size={20} color="green" />
            </TouchableOpacity>

            {/* Batalkan edit */}
            <TouchableOpacity
              onPress={() => setIsEditing(false)}
              style={styles.iconButton}
            >
              <Icon name="close-circle" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {/* Tampilkan teks dan tanggal */}
          <View style={styles.textContainer}>
            <Text style={styles.text}>{todo.text}</Text>
            <Text style={styles.date}>{todo.date}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            style={styles.iconButton}
          >
            <Icon name="pencil" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(todo.id)}
            style={styles.iconButton}
          >
            <Icon name="trash" size={20} color="red" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  textContainer: {
    flex: 2,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
  inputText: {
    flex: 1,
    borderBottomWidth: 1,
    marginRight: 5,
  },
  iconButton: {
    marginLeft: 5,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});
