// import React from 'react';
import './service.css';
import goaLogo from '/goa_image.png';

function Service() {
    return (
        <div>
            <header className="header">
                <div >
                    <img src={goaLogo} alt="Goa Police Logo" className="logo" />
                    
                </div>
                {/* <h1 className="citizen-services">CITIZEN SERVICES</h1> */}
            </header>
            <div className="service-container">
                <div className="service-tile">
                    <img src="https://delhipolice.gov.in/assets/img/tattpar/lost-report.png" alt="Lost Report" className="service-image" />
                    <h3 className="service-name">Lost/Found Report</h3>
                </div>
                <div className="service-tile">
                    <img src="https://delhipolice.gov.in/assets/img/tattpar/missing_stolen_vehicle.png" alt="MV Theft e FIR" className="service-image" />
                    <h3 className="service-name">Theft</h3>
                </div>
                <div className="service-tile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4ysDOA5Ygt3csNuRnfB1xb_vQrUBaA9cDUQ&s" alt="Track Missing Child" className="service-image" />
                    <h3 className="service-name">Report Illegal Possessions</h3>
                </div>
                <div className="service-tile">
                    <img src="https://delhipolice.gov.in/assets/img/tattpar/tenant_registration.png" alt="Missing Person Registration" className="service-image" />
                    <h3 className="service-name">Missing Person Registration</h3>
                </div>
                <div className="service-tile">
                    <img src="https://delhipolice.gov.in/assets/img/tattpar/pcc.png" alt="Police Clearance Certificate" className="service-image" />
                    <h3 className="service-name">Police Clearance Certificate</h3>
                </div>
                <div className="service-tile">
                    <img src="https://delhipolice.gov.in/assets/img/tattpar/view_fir.png" alt="View FIR" className="service-image" />
                    <h3 className="service-name">Harassment</h3>
                </div>
                <div className="service-tile">
                    <img src="https://delhipolice.gov.in/assets/img/tattpar/View-Complaint-Status.png" alt="View Complaint Status" className="service-image" />
                    <h3 className="service-name">View Complaint Status</h3>
                </div>
                <div className="service-tile">
                    <img src="https://thumbs.dreamstime.com/b/no-smoking-sign-12697999.jpg" alt="Unidentified Dead Bodies" className="service-image" />
                    <h3 className="service-name">Public Order Crimes</h3>
                </div>
                <div className="service-tile">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6XCf2FHZLAcojCXelemtOF4DEDXwj-8TLsw&s" alt="Senior Citizens Registration" className="service-image" />
                    <h3 className="service-name">Other Crimes</h3>
                </div>
                <div className="service-tile">
                    <img src="https://delhipolice.gov.in/assets/img/tattpar/feedback.png" alt="Senior Citizens Registration" className="service-image" />
                    <h3 className="service-name">Register Feedback</h3>
                </div>
            </div>
        </div>
    );
}

export default Service;
