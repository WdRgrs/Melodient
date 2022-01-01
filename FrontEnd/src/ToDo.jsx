import React from "react";

export default function ToDo({ id, item, onCheck }) {
    return (
            <li onClick={() => {onCheck(id)}}>
                {item}  
            </li>
    )
};