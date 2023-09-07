import React from 'react';
function useChangePage() {
	const [pageSize, setPageSize] = React.useState(pageData());
	React.useEffect(() => {
		function chandeSize() {
			setPageSize(pageData());
		}
		window.addEventListener('resize', chandeSize);
		return () => window.removeEventListener('resize', chandeSize);
	}, []);
	return pageSize;
	
function pageData() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}
}
export default useChangePage;
