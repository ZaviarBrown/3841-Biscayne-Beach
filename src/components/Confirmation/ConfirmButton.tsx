const ConfirmButton = () => {
    return (
        <div className="flex justify-center">
            <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="button"
            >
                Confirm and Pay
            </button>
        </div>
    );
};

export default ConfirmButton;
