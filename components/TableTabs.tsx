const TableTabs = ({
  options,
  ...restProps
}: Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "className"
> & {
  options: {
    defaultChecked?: boolean;
    [key: string]: string | boolean | undefined;
  }[];
}) => {
  return (
    <div className="shadow-sm rounded-md flex justify-between items-center gap-3 p-2 bg-white" data-testid="table-tabs">
      {options.map((option) => (
        <label
          key={option.value?.toString()}
          className="capitalize rounded-2xl text-center flex-1 p-2 cursor-pointer [&:has(input:checked)]:bg-bold-gray-light hover:bg-bold-gray-light/50"
          data-testid={`table-tab-label-${option.value}`}
        >
          {option.label}
          <input
            {...restProps}
            className="hidden"
            type="radio"
            value={option.value?.toString()}
            defaultChecked={option?.value === restProps.defaultValue}
            data-testid={`table-tab-input-${option.value}`}
          />
        </label>
      ))}
    </div>
  );
};

export default TableTabs;
