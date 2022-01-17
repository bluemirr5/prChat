import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import InfoContext from "../contexts/InfoContext";

const IdSelect = () => {
  const {id, setId} = useContext(InfoContext)
  const navigate = useNavigate();

  // const [id, setId] = useState('')
  const onNext = () => {
    navigate('/room')
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
