const Input = ({ type, name, value, label, placeholder, onChange }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-[Poppins] text-[14px] text-teal-700">
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="border-2 text-[12px] border-teal-700 p-2 rounded font-[Poppins]"
      />
    </div>
  );
};

const Options = ({ option, onChange, name, value, label }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-[Poppins] text-[14px] text-teal-700">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border-2 border-teal-700 min-h-[37.2px] text-[12px] rounded text-gray-500"
      >
        <option value=""></option>
        {option.map((item, index) => (
          <option key={index} value={item.value} className="text-gray-500 py-5">
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const Button = ({ children, type }) => {
  return (
    <button
      type={type}
      className="border-2 border-teal-700 bg-white text-teal-700 px-8 py-3 gap-3 font-[Poppins] text-[16px] font-medium rounded-md hover:bg-teal-700 hover:text-white flex items-center justify-center hover:"
    >
      {children}
    </button>
  );
};

function Form({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col pb-10">
      {children}
    </form>
  );
}

Form.Input = Input;
Form.Options = Options;
Form.Button = Button;

export default Form;
