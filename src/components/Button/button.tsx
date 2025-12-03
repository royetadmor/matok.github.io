// import React from "react";
import "./button.css";


type StartButtonProps = {
onClick?: () => void;
};


export default function StartButton({ onClick }: StartButtonProps) {
return (
<button className="start-button" onClick={onClick}>
התחל
</button>
);
}