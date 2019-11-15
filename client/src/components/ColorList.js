import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const handleChangesName = e => {
    setColorToEdit({
      ...colorToEdit,
      color: e.target.value
    });
  };
  const handleChangesCode = e => {
    setColorToEdit({
      ...colorToEdit,
      code: { hex: e.target.value }
    });
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res);
        setEditing(false);
        updateColors(
          colors.map(color => {
            return color.id === res.data.id ? res.data : color;
          })
        );
      });
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res);
        updateColors(
          colors.filter(color => {
            return color.id !== res.data;
          })
        );
      })
      .catch(err => console.log("yikes couldnt delete", err));
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors/", colorToEdit)
      .then(res => {
        console.log(res);

        updateColors(res.data);
      })
      .catch(err => {
        console.log("could not add color", err);
      });
    document.querySelector(".addColorForm").reset();
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer">
        {/* stretch - build another form here to add a color */}
        <form className="addColorForm" onSubmit={addColor}>
          <label>
            color:
            <input
              placeholder="color name"
              type="text"
              name="color"
              value={colorToEdit.color}
              onChange={handleChangesName}
            />
          </label>

          <label>
            hex code:
            <input
              placeholder="hex code"
              type="text"
              name="code"
              value={colorToEdit.code.hex}
              onChange={handleChangesCode}
            />
          </label>
          <button type="submit">add color</button>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
