import React from "react"

const Footer = () => <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h3 className="text-uppercase">MediBuddy</h3>
                <p>A Hospital Management Portal</p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-0" />
            <div className="col-md-3 mb-md-0 mb-3">
                <h5>Made with ❤️</h5>
                <h7>Team MediBuddy</h7>
            </div>      
        </div>
    </div>

    <div className="footer-copyright text-center py-3">
        <h7 className="text-uppercase">© 2022 Copyright MediBuddy</h7>
    </div>

</footer>

export default Footer;