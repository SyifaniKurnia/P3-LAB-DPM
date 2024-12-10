import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TodoItem from "../components/TodoItems";
import Icon from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [inputDate, setInputDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = () => {
    setTodos([
      { id: "1", text: "Belajar React Native", date: "2024-12-10" },
      { id: "2", text: "Belajar Lifecycle", date: "2024-12-15" },
    ]);
  };

  const addTodo = () => {
    const formattedDate = inputDate.toISOString().split("T")[0]; 
    if (inputText.trim() === "") return;

    const newTodo = {
      id: Date.now().toString(),
      text: inputText,
      date: formattedDate,
    };

    setTodos([...todos, newTodo]);
    setInputText("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText, newDate) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, date: newDate } : todo
      )
    );
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || inputDate;
    setShowDatePicker(false);
    setInputDate(currentDate);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>To-Do List</Text>
      </View>

      {/* Input area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tambah Todo..."
          value={inputText}
          onChangeText={setInputText}
        />

        {/* Tanggal picker */}
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateButton}
        >
          <Text style={styles.dateText}>
            {inputDate.toISOString().split("T")[0]}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={inputDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

<TouchableOpacity onPress={addTodo} style={styles.addButton}>
  <Icon name="add-circle" size={30} color="#0288d1" />
</TouchableOpacity>

      </View>

      {/* List area */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onDelete={deleteTodo} onEdit={editTodo} />
        )}
        style={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tidak ada data</Text>
          </View>
        }
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 To-Do App</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#77B0AA",
  },
  header: {
    paddingTop: 50,
    backgroundColor: "#003c43",
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
    marginBottom :5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 14,
    marginHorizontal: 5,
  },
  dateButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "#0288d1",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dateText: {
    color: "#fff",
    fontSize: 14,
  },
  addButton: {
    marginLeft: 5,
    padding: 5,
    backgroundColor:"fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    flex: 1,
    marginBottom: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
  },

  footer: {
    paddingVertical: 10,
    backgroundColor: "#003c43",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
  },
});
