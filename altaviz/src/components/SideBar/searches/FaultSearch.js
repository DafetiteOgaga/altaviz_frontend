import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import _ from 'lodash'; // Import lodash for debounce (npm install lodash)
import FaultBarGen from '../faults/GenFaults/FaultBarGen';
import RequestBar from '../Requests/RequestBar';
import { RotContext } from '../../context/RotContext';
// import { useLocationonarams}
// import PendingPartRequestNotifi from '../engineer/delete/bbbbbbbbbbbbnotificationsEngineer/PendingPartRequestNotifi';
// import { useLocationon } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
console.log('\napiBaseUrl:', apiBaseUrl)
const FaultSearch = () => {
    const department = useLocation().pathname.split('/')[1];
    const { RotCipher, encrypt } = useContext(RotContext);
    const refInput = useRef(null);
    const [faultPage, setFaultPage] = useState(0);
    const [requestPage, setRequestPage] = useState(0);
    const [faultsResp, setFaultsResp] = useState([]); // Holds the list of search results
    const [requestsResp, setRequestsResp] = useState([]);
    const [faultLoading, setFaultLoading] = useState(false); // Loading indicator
    const [requestLoading, setRequestLoading] = useState(false);
    // const [refresh, setRefresh] = useState(false); //

    // Filter states
    const [searchTerm, setSearchTerm] = useState(''); // Holds the current search input
    const [confirmResolve, setConfirmResolve] = useState(''); // Toggle between true/false/null
    const [verifyResolve, setVerifyResolve] = useState('');
    const [approvedRequest, setApprovedRequest] = useState('');
    const [rejectedRequest, setRejectedRequest] = useState('');
    const [dateFrom, setDateFrom] = useState(''); // Date range start
    const [dateTo, setDateTo] = useState(''); // Date range end

    const [searchParams, setSearchParams] = useState(new URLSearchParams({
        search: searchTerm,
        confirm_resolve: confirmResolve,
        verify_resolve: verifyResolve,
        approved: approvedRequest,
        rejected: rejectedRequest,
        start_date: dateFrom,
        end_date: dateTo,
        department: department,
    }));
    // const [updatedSearchParams, setUpdatedSearchParams] = useState(searchParams)
    // useEffect(() => {
    //     setSearchParams((prev) => {})
    // }, [])

    // Debounced search function
    const searchFaults = useCallback(
        _.debounce(async (term) => {
        // _.debounce(async () => {
            // console.log(
            //     'term:', term,
            //     'search value:', term.get('search')
            // );
            if (searchParams.get('search') === '') {
                console.log('no search term found');
                setFaultsResp([])
                setRequestsResp([])
                console.log('1111111111111111111')
                return;
            }
            console.log('2222222222222222222222')
            let searchQuery = searchParams.toString();
            if (term) searchQuery = term;

            setFaultLoading(true); // Show loading
            // fault search
            try {
                const faultUrl = `${apiBaseUrl}/fault-search/?${searchQuery}`;
                console.log(
                    // 'term', term.toString(),
                    '\nsearchParams(string):', searchParams.toString(),
                    '\n99999999999999999999999999999999999999',
                    '\nfaultUrl:', faultUrl,
                    // 'updatedSearchParams:', updatedSearchParams,
                )
                // fetch code
                const faultResponse = await fetch(faultUrl); // Send the search request
                if (!faultResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const faultData = await faultResponse.json(); // Parse the response data
                setFaultsResp(faultData); // Update the faults list

                // encode and save a copy of the response
                const encodedFaultData = RotCipher(JSON.stringify(faultData.results), encrypt)
                // console.log('encoded:', encodedData)
                localStorage.setItem('searchData', encodedFaultData);

            } catch (error) {
                console.error('Error searching faults:', error); // Handle errors
            }

            // request search
            if (department==='human-resource') {
                setRequestLoading(true)
                try {
                    const requestUrl = `${apiBaseUrl}/request-search/?${searchQuery}`;
                    console.log(
                        // 'term', term.toString(),
                        '\nsearchParams(string):', searchParams.toString(),
                        '\n777777777777777777777777777777777777777777',
                        '\nrequestUrl:', requestUrl,
                        // 'updatedSearchParams:', updatedSearchParams,
                    )
                    // fetch code
                    const requestResponse = await fetch(requestUrl); // Send the search request
                    if (!requestResponse.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const requestData = await requestResponse.json(); // Parse the response data
                    setRequestsResp(requestData); // Update the faults list
    
                    // encode and save a copy of the response
                    const encodedRequestData = RotCipher(JSON.stringify(requestData.results), encrypt)
                    // console.log('encoded:', encodedData)
                    localStorage.setItem('searchRequestData', encodedRequestData);
    
                } catch (error) {
                    console.error('Error searching requests:', error); // Handle errors
                }
            }

            setFaultLoading(false); // Hide loading
            setRequestLoading(false)
        }, 1000),
        [searchTerm, confirmResolve, verifyResolve, approvedRequest, rejectedRequest, dateFrom, dateTo] //, resolvedFrom, resolvedTo] // Empty dependency array, meaning this function is created only once
    );

    // // refresh state
    // useEffect(() => {
    //     setUpdatedSearchParams(searchParams);
    // }, [searchParams])

    // Cleanup debounce on unmount to avoid memory leaks
    useEffect(() => {
        if (searchParams.get('search') === '')
            // if (faults?.results.length) setFaultsResp([])
        // if (isSearchOpen)
        return () => {
            // setFaultsResp([])
            localStorage.removeItem('searchData');
            searchFaults.cancel(); // Clean up the debounce when the component unmounts
            // setFaultsResp([])
        };
    }, [searchFaults]);

    // Updates the search term and triggers debounced search
    const handleInputChange = (e) => {
        console.log('33333333333333333')
        const value = e.target.value; // Get the value typed in the input field
        setSearchTerm(value); // Update the searchTerm state

       // Update searchParams using the previous state
        console.log('searchParams:', searchParams.toString())
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev); // Create a new instance to update
            newParams.set('search', value); // Update the search field
            return newParams; // Return the new URLSearchParams object
        });
        if (value === '') setFaultsResp([]);
        // setRefresh(true);
        // Trigger the debounced search function with the correct search parameters
        const updatedParams = new URLSearchParams({ ...searchParams, search: value });
        console.log('updatedParams:', updatedParams.toString());
        // searchFaults(updatedParams.toString()); // Pass the correct query string
        // searchFaults(updatedParams); // Pass the correct query string
        console.log('444444444444444444444')
    };

    useEffect(() => searchFaults(searchParams), [searchParams])

    console.log('faultsResp:', faultsResp);
    console.log('requestsResp:', requestsResp);
    useEffect(() => {
        refInput.current.focus();
    }, [])
    console.log('faultPage:', faultPage)
    console.log('requestPage:', requestPage)
    const loadingStyle = {
        padding: '0 2.5rem',
        color: '#888',
        fontSize: '1.2rem',
        textAlign: 'center',
    }
    const paddingStyle = {
        padding: '0 2.5rem',
    }
    // const buttonTextColor = 'green'
    const searchButtonStyle = (key) => {if (key) {return {color: '#B5B5BD'}}}
    console.log(
        'verifyResolve:', verifyResolve,
        '\nconfirmResolve:', confirmResolve,
        '\napprovedRequest:', approvedRequest,
        '\nrejectedRequest:', rejectedRequest,
    );
    return (
        <>
            <hr style={{width: '80%'}} />
            <div>
                <div
                style={{
                    ...paddingStyle,
                    display: 'flex',
                    justifyContent: 'space-between'
                    // justifyContent: 'center',
                    // gap: '2rem',
                }}>
                    {/* input field */}
                    <input
                    style={{
                        width: '18%',
                    }}
                    ref={refInput}
                    type="search"
                    placeholder={`Search faults${department==='human-resource'&&'/requests'}...`} // Input field for typing search terms
                    value={searchTerm} // Controlled input field
                    onChange={handleInputChange} // Calls handleInputChange on every input change
                    />

                    {/* resolved resolution and Approved requests button */}
                    <button onClick={() => {
                        let confirmResolution = confirmResolve === 'true' ? '' : 'true';
                        let approved = approvedRequest === 'true' ? '' : 'true';
                        const buttonType = department === 'human-resource' ?
                        {type: 'approved', value: approved} : {type: 'confirm_resolve', value: confirmResolution}
                        if (department === 'supervisor' || department === 'help-desk') setConfirmResolve(confirmResolution)
                        if (department === 'human-resource') setApprovedRequest(approved)
                        setSearchParams((prev) => {
                            const newParams = new URLSearchParams(prev); // Create a new instance to update
                            console.log('buttontype:', buttonType)
                            newParams.set(buttonType.type, buttonType.value); // Update the search field
                            return newParams; // Return the new URLSearchParams object
                        });
                        // setRefresh(true);
                        // if (value === '') setFaultsResp([]);
                        // Trigger the debounced search function with the correct search parameters
                        const updatedParams = new URLSearchParams({ ...searchParams, confirm_resolve: confirmResolution, approved: approved });
                        console.log('updatedParams:', updatedParams.toString());
                        // searchFaults(updatedParams.toString()); // Pass the correct query string
                        // searchFaults(updatedParams); // Pass the correct query string
                        console.log('5555555555555555555')
                        }}>
                            {department !== 'human-resource' && <span style={searchButtonStyle(confirmResolve)}>Resolved: {confirmResolve === 'true' ? 'True' : 'False'}</span>}
                            {department === 'human-resource' && <span style={searchButtonStyle(approvedRequest)}>Approved: {approvedRequest === 'true' ? 'True' : 'False'}</span>}
                    </button>

                    {/* unconfirmed resolution and Rejected requests button */}
                    <button onClick={() => {
                        let verifyResolution = verifyResolve === 'true' ? '' : 'true';
                        let rejected = rejectedRequest === 'true' ? '' : 'true';
                        const buttonType = department === 'human-resource' ?
                        {type: 'rejected', value: rejected} : {type: 'verify_resolve', value: verifyResolution}
                        if (department === 'supervisor' || department === 'help-desk') setVerifyResolve(verifyResolution)
                        if (department === 'human-resource') setRejectedRequest(rejected)
                        setSearchParams((prev) => {
                            const newParams = new URLSearchParams(prev); // Create a new instance to update
                            newParams.set(buttonType.type, buttonType.value); // Update the search field
                            return newParams; // Return the new URLSearchParams object
                        });
                        // setRefresh(true);
                        // if (value === '') setFaultsResp([]);
                        // Trigger the debounced search function with the correct search parameters
                        const updatedParams = new URLSearchParams({ ...searchParams, verify_resolve: verifyResolution, rejected: rejected });
                        console.log('updatedParams:', updatedParams.toString());
                        // searchFaults(updatedParams.toString()); // Pass the correct query string
                        // searchFaults(updatedParams); // Pass the correct query string
                        console.log('6666666666666666666666')
                    }}>
                    {/* // setVerifyResolve(verifyResolve === 'true' ? '' : 'true')}> */}
                        {department !== 'human-resource' && <span style={searchButtonStyle(verifyResolve)}>Unconfirmed: {verifyResolve === 'true' ? 'True' : 'False'}</span>}
                        {department === 'human-resource' && <span style={searchButtonStyle(rejectedRequest)}>Rejected: {rejectedRequest === 'true' ? 'True' : 'False'}</span>}
                    </button>

                    {/* FROM date field */}
                    <div>
                        <label><strong>From:</strong></label>
                        <input type="date" value={dateFrom}
                        style={{width: '72%'}}
                        max={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                            const value = e.target.value
                            setDateFrom(value)
                            // let verifyResolution = verifyResolve === 'true' ? '' : 'true';
                            // setVerifyResolve(verifyResolution)
                            setSearchParams((prev) => {
                                const newParams = new URLSearchParams(prev); // Create a new instance to update
                                newParams.set('start_date', value); // Update the search field
                                return newParams; // Return the new URLSearchParams object
                            });
                            // setRefresh(true);
                            // if (value === '') setFaultsResp([]);
                            // Trigger the debounced search function with the correct search parameters
                            const updatedParams = new URLSearchParams({ ...searchParams, start_date: value });
                            console.log('updatedParams:', updatedParams.toString());
                            // searchFaults(updatedParams.toString()); // Pass the correct query string
                            // searchFaults(updatedParams); // Pass the correct query string
                            console.log('77777777777777777777777')
                        }} />
                    </div>

                    {/* TO date field */}
                    <div>
                        <label><strong>To:</strong></label>
                        <input type="date" value={dateTo}
                        style={{width: '80%'}}
                        max={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                            const value = e.target.value
                            setDateTo(value)
                            // let verifyResolution = verifyResolve === 'true' ? '' : 'true';
                            // setVerifyResolve(verifyResolution)
                            setSearchParams((prev) => {
                                const newParams = new URLSearchParams(prev); // Create a new instance to update
                                newParams.set('end_date', value); // Update the search field
                                return newParams; // Return the new URLSearchParams object
                            });
                            // setRefresh(true);
                            // if (value === '') setFaultsResp([]);
                            // Trigger the debounced search function with the correct search parameters
                            const updatedParams = new URLSearchParams({ ...searchParams, end_date: value });
                            console.log('updatedParams:', updatedParams.toString());
                            // searchFaults(updatedParams.toString()); // Pass the correct query string
                            // searchFaults(updatedParams); // Pass the correct query string
                            console.log('888888888888888888888888888')
                        }} />
                    </div>
                </div>
                <div>
                    {faultLoading && <p style={loadingStyle}>loading ...</p>} {/* Show "loading ..." if the API request is in progress */}
                    {console.log(
                        '\nlength of faultsList:', faultsResp.length,
                        '\nfaultsList, results and length:', faultsResp?.results?.length,
                        '\n!faultsList:', !faultsResp,
                        '\nlength of requestsList:', requestsResp.length,
                        '\requestsList, results and length:', requestsResp?.results?.length,
                        '\n!requestsList:', !requestsResp,
                        '\nsearchParams.search:', searchParams.get('search'),
                    )}


                    {/* for searched fault results */}
                    {(faultsResp?.results?.length && searchParams.get('search') !== '' && !faultLoading) ? (
                        <FaultBarGen
                        allFaults={faultsResp.results}
                        page={faultPage}
                        type='faultSearch'
                        // found={`${(confirmResolve !== '' && verifyResolve !== '') ? '': faults.count} ${confirmResolve && 'Resolved' } ${(confirmResolve&&verifyResolve) && 'and' } ${verifyResolve && 'Unconfirmed' } Faults for '${searchTerm}' ${(dateFrom && !dateTo) ? ('From: '+dateFrom): (dateTo && !dateFrom) ? '': ('Between: '+dateFrom)} ${(dateTo && !dateFrom) ? ('Before '+dateTo): (dateFrom && !dateTo) ? '': ('and '+dateTo) }`}
                        found={`${(confirmResolve === '' && verifyResolve === '')||(approvedRequest === '' && rejectedRequest === '') ?
                            `${faultsResp.count || 0} Faults for '${searchTerm}'` :
                            `${confirmResolve && 'Resolved'} ${approvedRequest && 'Approved Requests for'} ${((confirmResolve && verifyResolve)||(approvedRequest && rejectedRequest)) ? 'and' : ''} ${verifyResolve && 'Unconfirmed'} ${rejectedRequest && 'Rejected Requests for'} Faults for '${searchTerm}'`
                        }
                        ${dateFrom && !dateTo ? `From: ${dateFrom}` : ''}
                        ${dateTo && !dateFrom ? `Before: ${dateTo}` : ''}
                        ${dateFrom && dateTo ? `Between: ${dateFrom} and ${dateTo}` : ''}`}
                        />
                        ) : (
                            // If no results and not loading, show "No results found"
                            !faultLoading && <p style={paddingStyle}>No results found {searchTerm && `for '${searchTerm}'`}</p>
                        )}
                        {console.log(
                            '\nfaults.count:', faultsResp?.count,
                            '\nfaults.previous:', faultsResp?.previous,
                            '\nfaults.next:', faultsResp?.next,
                            '\nfaults.results:', faultsResp?.results,
                            '\nfaultPage:', faultPage,
                            '\nrequestPage:', requestPage,
                            '\nsearchParams.search:', searchParams.get('search'),
                            '\nconfirmResolve:', confirmResolve,
                            '\nsearchParams.confirm_resolve:', searchParams.get('confirm_resolve'),
                            '\napprovedRequest:', approvedRequest,
                            '\nsearchParams.approved:', searchParams.get('approved'),
                            '\nrejectedRequest:', rejectedRequest,
                            '\nsearchParams.rejected:', searchParams.get('rejected'),
                            '\nverifyResolve:', verifyResolve,
                            '\nsearchParams.verify_resolve:', searchParams.get('verify_resolve'),
                            '\ndateFrom', dateFrom,
                            '\nsearchParams.start_date:', searchParams.get('start_date'),
                            '\ndateTo:', dateTo,
                            '\nsearchParams.end_date:', searchParams.get('end_date'),
                            '\nsearchParams.toString():', searchParams.toString(),
                            '\ndepartment:', department,
                            '\nrequests.count:', requestsResp?.count,
                            '\nrequests.previous:', requestsResp?.previous,
                            '\nrequests.next:', requestsResp?.next,
                            '\nrequests.results:', requestsResp?.results,
                        )}
                        {console.log(
                            '\ndepartment:', department,
                        )}
                        {/* {console.table(params)} */}
                        {<div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                            paddingBottom: '1.5rem',
                            fontSize: '1.1rem',
                            backgroundColor: '#E5E5E5',
                            }}>
                            {(faultsResp?.previous && searchParams.get('search') !== '' && !faultLoading) &&
                                <button
                                onClick={() => {
                                    setFaultLoading(true)
                                    setFaultPage((prev) => prev - 1)
                                    searchFaults(faultsResp.previous.split('?')[1])
                                }}
                                >
                                    Previous
                                </button>}
                            {(faultsResp?.next && searchParams.get('search') !== '' && !faultLoading) &&
                                <button
                                onClick={() => {
                                    setFaultLoading(true)
                                    setFaultPage((prev) => prev + 1)
                                    searchFaults(faultsResp.next.split('?')[1])
                                }}
                                >
                                    Next
                                </button>}
                        </div>}


                    {/* for searched request results (hr only) */}
                    {department==='human-resource' &&
                    <>
                        {(requestLoading) && <p style={loadingStyle}>loading ...</p>}
                        {(requestsResp?.results?.length && searchParams.get('search') !== '' && !requestLoading) ? (
                            <RequestBar
                            allRequests={requestsResp.results}
                            page={requestPage}
                            type='faultSearch'
                            // found={`${(confirmResolve !== '' && verifyResolve !== '') ? '': faults.count} ${confirmResolve && 'Resolved' } ${(confirmResolve&&verifyResolve) && 'and' } ${verifyResolve && 'Unconfirmed' } Faults for '${searchTerm}' ${(dateFrom && !dateTo) ? ('From: '+dateFrom): (dateTo && !dateFrom) ? '': ('Between: '+dateFrom)} ${(dateTo && !dateFrom) ? ('Before '+dateTo): (dateFrom && !dateTo) ? '': ('and '+dateTo) }`}
                            found={`${(confirmResolve === '' && verifyResolve === '')||(approvedRequest === '' && rejectedRequest === '') ?
                                `${requestsResp.count || 0} Requests for '${searchTerm}'` :
                                `${confirmResolve && 'Resolved'} ${approvedRequest && 'Approved Requests for'} ${((confirmResolve && verifyResolve)||(approvedRequest && rejectedRequest)) ? 'and' : ''} ${verifyResolve && 'Unconfirmed'} ${rejectedRequest && 'Rejected Requests for'} Faults for '${searchTerm}'`
                            }
                            ${dateFrom && !dateTo ? `From: ${dateFrom}` : ''}
                            ${dateTo && !dateFrom ? `Before: ${dateTo}` : ''}
                            ${dateFrom && dateTo ? `Between: ${dateFrom} and ${dateTo}` : ''}`}
                            />
                            ) : (
                                // If no results and not loading, show "No results found"
                                !requestLoading && <p style={paddingStyle}>No requests found {searchTerm && `for '${searchTerm}'`}</p>
                            )}
                            {<div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '1rem',
                                paddingBottom: '1.5rem',
                                fontSize: '1.1rem',
                                backgroundColor: '#E5E5E5',
                                }}>
                                {(requestsResp?.previous && searchParams.get('search') !== '' && !requestLoading) &&
                                    <button
                                    onClick={() => {
                                        setRequestLoading(true)
                                        setRequestPage((prev) => prev - 1)
                                        searchFaults(requestsResp.previous.split('?')[1])
                                    }}
                                    >
                                        Previous
                                    </button>}
                                {(requestsResp?.next && searchParams.get('search') !== '' && !requestLoading) &&
                                    <button
                                    onClick={() => {
                                        setRequestLoading(true)
                                        setRequestPage((prev) => prev + 1)
                                        searchFaults(requestsResp.next.split('?')[1])
                                    }}
                                    >
                                        Next
                                    </button>}
                            </div>}
                    </>}
                </div>
            </div>
        </>
    );
};

export default FaultSearch;