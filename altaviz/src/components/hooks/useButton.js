
const toSentenceCase = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const useButton = (btn) => {
	btn = btn.toLowerCase();
	return <button
		type={btn}
		className={btn}
		>
			{toSentenceCase(btn)}
		</button>
};

export default useButton;
