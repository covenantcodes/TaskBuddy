import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Octicons,
} from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import DateTimePicker from "@react-native-community/datetimepicker";

const TodoCard = ({ todo, deleteTodo, editTodo }) => {
  // statusText
  const [status, setStatus] = useState(todo.status);
  const [taskBtnText, setTaskBtnText] = useState("Start Task");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  // FOR TASK STATUS
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

  // DELETE TASK
  const handleDelete = () => {
    deleteTodo(todo.id);
    setIsPopupVisible(false);
  };

  // EDIT TASK
  const handleEdit = () => {
    editTodo(todo.id, editedText);
    setIsEditing(false);
  };

  // CLOSE POPUP
  const closemodal = () => {
    setIsPopupVisible(false);
  };

  // EDIT TASK
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setEditedText(todo.text);
  };

  // FOR DATE PICKER
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <View style={styles.taskBox}>
        <View style={styles.taskTextContainer}>
          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={editedText}
              onChangeText={setEditedText}
            />
          ) : (
            <Text style={styles.taskText}>{todo.text}</Text>
          )}

          {/* LOGIC TO CHANGE ICONS ON EDIT */}
          {isEditing ? (
            <TouchableOpacity style={styles.actionMenu} onPress={handleEdit}>
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
                // CHANGE STATUS TEXT COLOR
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
                // CHANGE STATUS BUTTON COLOR
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
        onRequestClose={() => setIsPopupVisible(crossfalse)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient colors={["#032a80", "#3d0373"]} style={styles.popup}>
            <View style={styles.closeContainer}>
              <MaterialCommunityIcons
                name="close"
                color="white"
                size={20}
                onPress={closemodal}
              />
            </View>
            {/* MODAL HEADER  */}
            <View style={styles.modalHeader}>
              <Text style={styles.todoModalText}>{todo.text}</Text>
              <View style={styles.actionIcons}>
                <TouchableOpacity>
                  <MaterialIcons
                    name="mode-edit"
                    color="white"
                    size={19}
                    style={styles.actionIcon}
                    onPress={() => {
                      toggleEdit();
                      setIsPopupVisible(false);
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <MaterialIcons
                    name="delete"
                    color="white"
                    size={19}
                    style={styles.actionIcon}
                    onPress={handleDelete}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* MODAL CONTENTS */}
            <TouchableOpacity style={styles.popupContent}>
              <MaterialIcons name="timer" color="white" size={20} />
              <Text style={styles.popupContentText}>Set Reminder</Text>
              <Text style={styles.popupContentText}>
                selected: {date.toLocaleString()}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
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

  taskTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "white",
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
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    width: "90%",
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

  todoModalText: {
    color: "white",
    fontSize: 18,
    fontFamily: "RalewayBold",
  },

  closeContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionIcons: {
    flexDirection: "row",
  },

  actionIcon: {
    marginHorizontal: 5,
  },

  popupContent: {
    // borderColor: "white",
    // borderWidth: 1,
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 10,
    flexDirection: "row",
  },

  popupContentText: {
    color: "white",
    fontFamily: "RalewaySemiBold",
    marginLeft: 10,
  },
});

export default TodoCard;
