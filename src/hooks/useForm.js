import {useState} from "react";

export default function useSearchForm() {
  const [input, setInput] = useState('');
  const [isShort, setIsShort] = useState(false);

  function handleChange(e) {
    setInput(() => (e.target.value))
  }

  function handleCheckboxChange(e) {
    setIsShort(() => (e.target.checked))
  }

  return {input, setInput, isShort, setIsShort, handleChange, handleCheckboxChange}
}
