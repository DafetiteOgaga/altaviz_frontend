import { useContext } from "react";
import NotificationDropdownMenu from "./NotificationDropdownMenu";
import styled from "styled-components";
import usePullNotification from "../../paginationComp/usePullNotification";
// import { FetchContext } from "../../context/FetchContext";
import { AuthContext } from "../../context/checkAuth/AuthContext";
// import useGetTotalWEncryption from "../../paginationComp/delete/useGetTotalWEncryption";
// import usePaginationWithEncryption from "../../paginationComp/usePaginationWithEncryption";

const MainContainer = styled.div`
	display: flex;
	margin: 0;
`
const Paragraph = styled.p`
	white-space: pre;
	margin: 0;
	// color: #2b2929;
	// text-decoration: none;
`
function Notification ({
	urlPath,
	variableContext,
	// totalArrayContext,
	titleKey,
	titleValue,
	patchUrl,
    postUrl,
    putUrl,
    putData,
    deleteUrl,
	handler,
	listPageUrl,
	detailPageUrl,
	button,
	secondButton,
	refreshComponent,
}) {
	// const { useGetDataAPI } = useContext(FetchContext);
	const { authData } = useContext(AuthContext);

	const notification = usePullNotification(
		urlPath, authData.id,
		variableContext,
	)

	console.log(
		'\nurlPath:', urlPath,
		'\nnotification.arrayData:', notification?.arrayData,
		// '\nnotification.arrayLoading:', notification.arrayLoading,
		// '\nnotification.arrayError:', notification.arrayError,
		// '\nnotification.totalData:', notification.totalData,
		// '\nnotification.totaLoading:', notification.totaLoading,
		// '\nnotification.totalError:', notification.totalError,
	)
	return (
		<>
			<MainContainer>
				<Paragraph><strong>{titleKey}: </strong></Paragraph>
				{(notification?.arrayLoading&&(!notification?.arrayData&&!notification.arrayError)) ?
				// if loading ...
				(<Paragraph style={{
					color: '#B5B5BD',
					// fontSize: '1.2rem',
					textAlign: 'center',
				}}>Loading ...</Paragraph>):
				((!notification?.totalData?.total) ?
					// if there is no data for notification
					<Paragraph>{titleValue}</Paragraph> :
					// <Paragraph>shett!</Paragraph>
					// else if there is data for notification
					<NotificationDropdownMenu
					notiList={notification.arrayData}
					totalData={notification.totalData}
					variableContext={variableContext}
					// totalArrayContext={totalArrayContext}
					urlPath={urlPath}
					patchUrl={patchUrl}
					postUrl={postUrl}
					putUrl={putUrl}
					putData={putData}
					deleteUrl={deleteUrl}
					handler={handler}
					listPageUrl={listPageUrl}
					detailPageUrl={detailPageUrl}
					button={button}
					secondButton={secondButton}
					// extraDisplayLocalKeys={extraDisplayLocalKeys}
					refreshComponent={refreshComponent}
					// setRefresh={setRefresh}
					/>
					)}
			</MainContainer>
		</>
	)
}
export default Notification;