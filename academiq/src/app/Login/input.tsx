function Input(props) {
    return (
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
         <p className="font-semibold text-2xl">{props.heading}</p> 
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder={props.placeholder}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    );
  }
  
  export default Input;
  