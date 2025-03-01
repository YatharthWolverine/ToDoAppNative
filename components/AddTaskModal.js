import {
  Button,
  Modal,
  StyleSheet,
  TextInput,
  View,
  Image,
} from "react-native";

export const AddTaskModal = ({
  modalShow,
  setModalShow,
  inputValue,
  setInputValue,
  setMyTask,
}) => {
  const handleInputChange = (enterText) => {
    setInputValue(enterText);
  };
  const onTaskSubmit = () => {
    if (inputValue === "") {
      alert("Enter valid values");
    } else {
      alert(`Added ${inputValue}`);
      setMyTask((prev) => [
        ...prev,
        { key: inputValue?.length, task: inputValue, status: "pending" },
      ]);
      setInputValue("");
    }
  };
  return (
    <>
      <Modal visible={modalShow} animationType="slide">
        <View style={styles.inputWraapper}>
          <Image
            source={require("../assets/todo.png")}
            style={styles.imageWrapper}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter ToDo Tasks..."
            placeholderTextColor="white"
            onChangeText={handleInputChange}
            value={inputValue}
          />
          <View style={styles.btnWrapper}>
            <Button title="ADD TASK" onPress={onTaskSubmit} />
            <Button title="CANCEL" onPress={() => setModalShow(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  inputWraapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#302073",
    paddingHorizontal: 20,
    gap: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "white",
    height: 52,
    width: "100%",
    marginRight: 10,
    color: "white",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  btnWrapper: {
    flexDirection: "row",
    gap: 20,
    marginTop: 30,
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: 150,
  },
});
