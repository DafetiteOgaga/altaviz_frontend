import { isMobile, isTablet, isDesktop } from 'react-device-detect';

function useDeviceType() {
	let deviceType;

	if (isMobile) {
		deviceType = 'Mobile';
	} else if (isTablet) {
		deviceType = 'Tablet';
	} else if (isDesktop) {
		deviceType = 'PC';
	}

	// Additional Features
	// The react-device-detect library also provides more specific checks, such as:

	// isAndroid, isIOS
	// isWindows, isMacOs
	// isChrome, isSafari, isFirefox, etc.
	// You can combine these to detect specific operating systems or browsers if needed.

	return deviceType
}

export default useDeviceType;
