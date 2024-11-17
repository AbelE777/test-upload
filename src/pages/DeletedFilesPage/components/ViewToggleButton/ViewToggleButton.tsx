import "./ViewToggleButton.css";

interface Props {
  checked: boolean;
  handleChange: (e: any) => void
}

const ViewToggleButton = ({checked, handleChange} : Props) => {
  
  return (
    <div className="checkbox-wrapper-35">
      <input
        onChange={handleChange}
        className="switch"
        type="checkbox"
        id="switch"
        name="switch"
        checked={checked}
      />
      <label htmlFor="switch">
        <span className="switch-x-text">Vista </span>
        <span className="switch-x-toggletext">
          <span className="switch-x-unchecked">
            <span className="switch-x-hiddenlabel">Unchecked: </span>Grupos
          </span>
          <span className="switch-x-checked">
            <span className="switch-x-hiddenlabel">Checked: </span>Detalles
          </span>
        </span>
      </label>
    </div>
  );
};

export default ViewToggleButton;
