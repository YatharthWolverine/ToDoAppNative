import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import { AddTaskModal } from "./components/AddTaskModal";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [modalShow, setModalShow] = useState(false);
  const [myTask, setMyTask] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [myTask]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setMyTask(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(myTask));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const handleModalOpen = () => {
    setModalShow(true);
  };

  const removeSelectedTask = (task) => {
    const updatedItems = myTask.filter((item) => item.task !== task);
    setMyTask(updatedItems);
  };

  const markStatus = (task, status) => {
    setMyTask((prevTasks) =>
      prevTasks.map((item) => (item.task === task ? { ...item, status } : item))
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.headStyle}>
        <Text style={styles.headText}>ToDo Tracker</Text>
      </View>
      <Button title="ADD TASK" onPress={handleModalOpen} />
      {modalShow && (
        <AddTaskModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setMyTask={setMyTask}
        />
      )}
      <View style={styles.viewWrapper}>
        <FlatList
          data={myTask}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.CardWrapper}>
                <Pressable onPress={() => removeSelectedTask(item.task)}>
                  <Text
                    style={[
                      styles.taskWrapper,
                      item.status === "complete" && styles.completedTask,
                    ]}
                  >
                    {item?.task}
                  </Text>
                </Pressable>
                <View style={styles.iconWrapper}>
                  {/* Mark as Complete Icon */}
                  {item.status === "pending" ? (
                    <Pressable
                      onPress={() => markStatus(item?.task, "complete")}
                    >
                      <MaterialIcons
                        name="check-circle"
                        size={24}
                        color="green"
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => markStatus(item?.task, "pending")}
                    >
                      <MaterialIcons name="cancel" size={24} color="gray" />
                    </Pressable>
                  )}

                  {/* Delete Icon */}
                  <Pressable onPress={() => removeSelectedTask(item.task)}>
                    <MaterialIcons name="delete" size={24} color="red" />
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#302073",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  viewWrapper: {
    flex: 12,
    marginTop: 20,
  },
  ScrollView: {},
  CardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
  },
  taskWrapper: {
    fontSize: 20,
    fontWeight: "600",
    color: "#302073",
  },
  iconWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  headStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headText: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
