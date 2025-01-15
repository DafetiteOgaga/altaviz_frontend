import toast from 'react-hot-toast';

function Exampletoast() {
	return (
		<button onClick={() => toast('Hello, World!')}>Show Toast</button>
	);
}
export { Exampletoast };



// types:

// toast.success('Operation Successful!');
// toast.error('Something went wrong!');
// const loadingToast = toast.loading('Processing...');
// toast.dismiss(loadingToast);



// promises
// toast.promise(
// 	fetchData(),
// 	{
// 	  loading: 'Loading...',
// 	  success: 'Data fetched successfully!',
// 	  error: 'Failed to fetch data.',
// 	}
//   );


// styling:
// {/* <Toaster */}
//   toastOptions={{
//     success: {
//       style: {
//         background: 'green',
//         color: 'white',
//       },
//     },
//     error: {
//       style: {
//         background: 'red',
//         color: 'white',
//       },
//     },
//   }}
// />
