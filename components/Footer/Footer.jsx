import React, {Component} from 'react';
import Link from 'next/link';

import _manifest from "../../_manifest";

export default class index extends Component {

    render() {
        var currentYear = new Date().getFullYear();
        return (
            <footer className="site-footer">
        <div className="container">
          <div className="row menu-area">
            <div className="col-md-3 col-sm-6 col-6">
              <h5 className="fw-500">Company</h5>
              <ul>
                <li>
                  <a href={_manifest.site + "/about"} onClick={() => logEventRecord("Clickon_About_us_(Footer)")}>
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6 col-6">
              <h5 className="fw-500">Explore</h5>
              <ul>
                <li>
                  <a href={_manifest.site + "/spin.html"} onClick={() => logEventRecord("Clickon_Spin2Win(footer)")}>
                    Spin to Win
                  </a>
                </li>
                <li>
                  <a href={_manifest.site + "/leaderboard"}>Leader Board</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6 col-6">
              <h5 className="fw-500">Help</h5>
              <ul>
                <li>
                  <a href={_manifest.site + "/faq"}>FAQ</a>
                </li>
                <li>
                  <a href={`tel:${_manifest.contactNumber}`}>Support Center</a>
                </li>
                <li>
                  <a href={_manifest.site + "/payment-security"}>Payment Security</a>
                </li>
                <li>
                  <a href={_manifest.site + "/privacy"}>Privacy Policy</a>
                </li>
                <li>
                  <a href={_manifest.site + "/emifaq"}>EMI</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-6 col-6">
              <h5 className="fw-500">Terms & Condition </h5>
              <ul>
                <li>
                  <a href={_manifest.site + "/terms"} onClick={() => logEventRecord("Clickon_T&C(Footer)")}>
                    General{" "}
                  </a>
                </li>
                <li>
                  <a href={_manifest.site + "/wheel-terms-condition"}>Spin to Win </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row address-area">
            <div className="col-md-4 col-12 mb-4">
              <h5 className="fw-500">Address</h5>
              <p className="fz14" dangerouslySetInnerHTML={{ __html: _manifest.companyHeadOffceAddress }}></p>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="w-2_5 w-xs-12 mb-3">
                  <h5 className="fw-500 mb-3 text-nowrap">Accredited Member</h5>
                  <div className="image">
                    <div className="row-sm">
                      <div className="col w-xs-6 mb-3">
                        <img src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/media/assets/basis.png" alt="" />
                      </div>
                      <div className="col w-xs-6 mb-3">
                        <img src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/e-cab.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1_5 w-xs-6 mb-3">
                  <h5 className="fw-500 mb-3  text-nowrap"> Verified by</h5>
                  <div className="image">
                    <img src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/media/assets/comodoSecure.png" alt="" />
                  </div>
                </div>
                <div className="w-1_5 w-xs-6 mb-3">
                  <h5 className="fw-500 mb-3  text-nowrap">Authorised by</h5>
                  <div className="image">
                    <img src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/media/assets/iata-logo.png" alt="" />
                  </div>
                </div>
                <div className="w-1_5 w-xs-6 mb-3">
                  <h5 className="fw-500 mb-3 text-nowrap">Approved Agent</h5>
                  <div className="image">
                    <img src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/bimanbd.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row contact-area d-flex align-items-end">
            <div className="col-md-4">
              <div className="contact email">
                <a href={`mailto:${_manifest.contactEmail}`} className="d-flex align-items-center primary-color fz16">
                  <i className="mdi mdi-email mr-2"></i> {_manifest.contactEmail}
                </a>
              </div>
              <div className="contact phone mt-2">
                <a href={`tel:${_manifest.contactNumber}`} className="d-flex align-items-center primary-color fz16">
                  <i className="mdi mdi-phone mr-2"></i> {_manifest.contactNumber}
                </a>
              </div>
              <div className="social">
                <ul className="d-flex align-items-center">
                  <li>
                    <a href={_manifest.facebookPageLink} target="_blank">
                      {/* <i className="mdi mdi-facebook"></i> */}
                      <img src="/assets/images/social/fb.svg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href={_manifest.messengerLink} target="_blank">
                      {/* <i className="mdi mdi-facebook-messenger"></i> */}
                      <img src="/assets/images/social/messenger.svg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href={_manifest.twitterLink} target="_blank">
                      {/* <i className="mdi mdi-twitter"></i> */}
                      <img src="/assets/images/social/twitter.svg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href={_manifest.instagramLink} target="_blank">
                      {/* <i className="mdi mdi-instagram"></i> */}
                      <img src="/assets/images/social/instagram.svg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href={_manifest.youtubeLink} target="_blank">
                      {/* <i className="mdi mdi-youtube"></i> */}
                      <img src="/assets/images/social/youtube.svg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href={_manifest.linkedinLink} target="_blank">
                      {/* <i className="mdi mdi-linkedin"></i> */}
                      <img src="/assets/images/social/linkedin.svg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href={_manifest.pinterestLink} target="_blank">
                      {/* <i className="mdi mdi-pinterest"></i> */}
                      <img src="/assets/images/social/pinterest.svg" alt="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="payent-methods">
                <h6 className="fz14 fw-600">We Accept</h6>
                <div className="methods d-flex flex-wrap align-items-center mt-3">
                  <div className="image">
                    <img src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/amex-new.png" alt="" />
                  </div>
                  <div className="image">
                    <img src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/visa-new.png" alt="" />
                  </div>
                  <div className="image">
                    <img src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/mastercard-new.png" alt="" />
                  </div>
                  <div className="image">
                    <img src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/dbbl-new.png" alt="" />
                  </div>
                  <div className="image">
                    <img src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/bkash-new.png" alt="" />
                  </div>
                  <div className="image">
                    <img src="https://utility-assets.s3.ap-southeast-1.amazonaws.com/nogod-new.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="copyright mt-4 ">
            <p className="fz14">
              Copyright @ { currentYear }. {_manifest.companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
        )
    }
}
