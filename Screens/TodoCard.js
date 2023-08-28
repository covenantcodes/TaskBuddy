import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import {
  Foundation,
  FontAwesome,
  MaterialIcons,
  AntDesign,
  Octicons,
} from "@expo/vector-icons";

const TodoCard = ({ todo, deleteTodo, editTodo }) => {
  const [status, setStatus] = useState(todo.status);
  const [taskBtnText, setTaskBtnText] = useState("Start Task");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleButtonPress = () => {
    if (status === "Pending") {
      setStatus("In-Progress");
      setTaskBtnText("Done With Task");
    } else if (status === "In-Progress") {
      setStatus("Completed");
      setTaskBtnText("Great Work - Well done");
      setIsButtonDisabled(true);
    }
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    setIsPopupVisible(false);
  };

  const handleEdit = () => {
    editTodo(todo.id, editedText);
    setIsEditing(false);
    setIsPopupVisible(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setEditedText(todo.text);
  };

  return (
    <View>
      <View style={styles.taskBox}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={editedText}
              onChangeText={setEditedText}
            />
          ) : (
            <Text style={styles.taskText}>{todo.text}</Text>
          )}

          {isEditing ? (
            <TouchableOpacity
              style={styles.actionMenu}
              onPress={handleEdit}
            >
              <MaterialIcons name="done" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.actionMenu}
              onPress={() => setIsPopupVisible(true)}
            >
              <AntDesign name="ellipsis1" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.taskStatusBox}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusText}>Status </Text>
            <Text
              style={[
                styles.btnText,
                status === "In-Progress"
                  ? { color: "#FF8C00" }
                  : status === "Completed"
                  ? { color: "#03C03C", fontFamily: "RalewayBold" }
                  : { color: "white" },
              ]}
            >
              {status}
            </Text>
          </View>
          <View style={styles.statusButtonContainer}>
            <TouchableOpacity
              style={[
                styles.statusButton,
                status === "In-Progress"
                  ? { backgroundColor: "#FF8C00" }
                  : status === "Completed"
                  ? { backgroundColor: "#03C03C" }
                  : { backgroundColor: "#256afe" },
              ]}
              onPress={handleButtonPress}
              disabled={isButtonDisabled}
            >
              <Text style={styles.btnText}>{taskBtnText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Pop-up Modal */}
      <Modal
        visible={isPopupVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setIsPopupVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.popup}>
            {isEditing ? (
              <TouchableOpacity style={styles.popupItem} onPress={handleEdit}>
                <Text style={styles.popupItemText}>Done</Text>
                {/* <FontAwesome5 name="clipboard-check" size={18} color="white" /> */}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.popupItem}
                onPress={() => {
                  toggleEdit();
                  setIsPopupVisible(false);
                }}
              >
                <Text style={styles.popupItemText}>Edit</Text>
                {/* <Foundation name="clipboard-pencil" size={18} color="white" /> */}
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.popupItem} onPress={handleDelete}>
              <Text style={styles.popupItemText}>Move to Trash</Text>
              {/* <Octicons name="trash" size={17} color="white" /> */}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.popupItem}
              onPress={() => setIsPopupVisible(false)}
            >
              <Text style={styles.popupItemText}>Close</Text>
              {/* <FontAwesome name="close" size={18} color="white" /> */}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  taskBox: {
    marginTop: 15,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },

  editInput: {
    width: "85%",
  },
  taskText: {
    fontFamily: "RalewayMedium",
    color: "white",
    width: "85%",
  },
  actionMenu: {
    paddingHorizontal: 2,
  },
  statusText: {
    fontFamily: "RalewayBold",
    color: "white",
  },
  taskStatusBox: {
    marginTop: 15,
  },
  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusButtonContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusButton: {
    paddingHorizontal: 10,
    textAlign: "center",
    padding: 10,
    borderRadius: 15,
  },
  btnText: {
    fontFamily: "RalewayMedium",
    textAlign: "center",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1B1B1B",
    padding: 10,
    borderRadius: 10,
    width: "55%",
  },
  popupItem: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "lightgray",
    justifyContent: "space-between",
    alignItems: "center",
  },

  popupItemText: {
    paddingRight: 10,
    color: "white",
    fontFamily: "RalewaySemiBold",
  },

  editInput: {
    fontFamily: "RalewayMedium",
    color: "white",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 5,
    marginBottom: 10,
  },
});

export default TodoCard;
