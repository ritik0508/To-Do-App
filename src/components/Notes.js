import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";

// to get data from local storage

const getLocalItems = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
const Notes = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [EditButton, setEditButton] = useState(false);
  const [editId, setEditId] = useState(0);

  // Add items
  const addItem = () => {
    if (inputData) {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
      toast.success("To-Do added successfully!", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };
  const updateItem = () => {
    if (inputData) {
      // eslint-disable-next-line array-callback-return
      items.filter((data) => {
        if (data.id === editId) {
          data.name = inputData;
          setItems([...items]);
          setInputData("");
          setEditId(0);
        }
      });
    }
    setEditButton(false);
    toast.info("To-Do Updated successfully!", {
      position: "bottom-center",
      autoClose: 3000,
    });
  };
  // delete items

  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
    setInputData("");
    setEditButton(false);
    toast.error("To-Do Deleted successfully!", {
      position: "bottom-center",
      autoClose: 3000,
    });
  };

  const editItem = (elementId) => {
    setEditButton(true);
    // eslint-disable-next-line array-callback-return
    items.map((data) => {
      if (data.id === elementId) {
        setInputData(data.name);
        setEditId(data.id);
      }
    });
  };
  // remove all items

  const removeallItems = () => {
    setEditButton(false);
    setInputData("");
    setItems([]);
    toast.error("All To-Dos Deleted Succesfully", {
      position: "bottom-center",
      autoClose: 3000,
    });
  };

  // add items to local storage

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <div className="title-input-div shadow-lg p-3 mb-5 rounded d-flex p-2 bd-highlight">
            <h1 className="todo-title">MY NOTES</h1>
            <ListAltIcon
              sx={{
                fontSize: 42,
                paddingBottom: 1,
                backgroundColor: "#041d43",
                color: "white",
              }}
            />
          </div>
          <div className="add-items">
            <TextField
              className="text-Field"
              id="outlined-basic"
              label="Add Notes"
              variant="outlined"
              fullWidth
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {EditButton ? (
                      <Tooltip title="Edit Notes">
                        <EditNoteIcon
                          onClick={updateItem}
                          sx={{ fontSize: 32, color: "#3498db" }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Add Notes">
                        <AddIcon
                          onClick={addItem}
                          title={"Add Notes"}
                          sx={{
                            fontSize: 34,
                            color: "green",
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="show-items">
            {items.map((elem) => {
              return (
                <div className="each-item shadow-lg rounded" key={elem.id}>
                  <h3 className="text-Note">{elem.name}</h3>
                  <div className="text-icons">
                    <Tooltip title="Edit Note">
                      <EditNoteIcon
                        onClick={() => editItem(elem.id)}
                        sx={{
                          color: "#3498db",
                          fontSize: 40,
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete Note">
                      <DeleteIcon
                        onClick={() => deleteItem(elem.id)}
                        sx={{
                          color: "#f23d3d",
                          fontSize: 28,
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              );
            })}
            <DeleteForeverIcon
              onClick={removeallItems}
              sx={{ color: "red", fontSize: 40 }}
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Notes;
