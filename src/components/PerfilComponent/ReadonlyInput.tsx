interface Props {
  value: any;
  id?: string;
  label: string;
}

const ReadonlyInput = ({ value, id='', label }: Props) => {
  return (
    <>
      <label
        htmlFor={id}
        className="font-semibold text-gray-900 dark:text-gray-200 block pb-1"
      >
        {label}
      </label>
      <input
        disabled
        id={id}
        className="border-1 bg-transparent rounded-lg px-4 py-2 w-full dark:text-white font-normal"
        type="text"
        value={value}
      />
    </>
  );
};

export default ReadonlyInput;
