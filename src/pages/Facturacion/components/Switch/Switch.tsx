import "./switch.css"

type Props = {
  setTipo: React.Dispatch<React.SetStateAction<string>>
}

const Switch = ({setTipo}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked) setTipo("seriado")
    else setTipo("conductometria")
  }
  return (
    <label className="toggler-wrapper style-15">
      <input type="checkbox" onChange={(e)=>handleChange(e)}/>
      <div className="toggler-slider">
        <div className="toggler-knob"></div>
      </div>
    </label>
  );
};

export default Switch;
