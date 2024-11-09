import { useState, useEffect } from 'react';
import Inventory from '../SideBar/human_resource/inventory/Inventory';

const RefreshComponent = (key) => {
    console.log('key value:', key);
    const [componentKey, setComponentKey] = useState(1); // Use a state variable to track the key
    useEffect(() => {
        if (key) {
            setComponentKey((prev) => prev+1)
        }
    }, [key])
    console.log('component key (refresh:', componentKey)

    // const handleRefresh = () => {
    //     // Change the key to a new value, triggering unmount/remount
    //     setComponentKey(prevKey => prevKey + 1);
    //     };

    return (
        <div>
        {/* <button onClick={handleRefresh}>Refresh Component</button> */}
        {/* Pass the key to the component you want to unmount/remount */}
        <Inventory key={componentKey} />
        </div>
    );
};

// const MyChildComponent = () => {
// // Your child component logic goes here
// return <div>My Child Component</div>;
// };

export default RefreshComponent;
