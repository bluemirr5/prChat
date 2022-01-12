import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const IdSelect = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('')
  const onNext = () => {
    console.log(navigate)
    navigate('/room', {state: {id}})
  }
  return (
    <>
      <input
        type="text"
        value={id}
        onChange={(text) => {
          console.log(text.target.value)
          setId(text.target.value)
        }}/>
      <button onClick={onNext}>다음</button>
    </>
  );
};
export default IdSelect;
