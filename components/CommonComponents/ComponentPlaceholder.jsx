import React from "react";
import ContentLoader from "react-content-loader";
const random = Math.random() * (1 - 0.7) + 0.7;

const ComponentPlaceholder = (props) => {
  let { type } = props;
  if (type === "hotelRoom") {
    return (
      <React.Fragment>
        <h6 className="mb-xs-16">Fetching Room Information...</h6>
        <div className={"ContentLoader " + type}>
          <ContentLoader height={160} width={500} speed={1} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
            <rect x="108.43" y="4.93" rx="4" ry="4" width="278.46" height="5.57" />
            <rect x="107.36" y="16.78" rx="3" ry="3" width="204.85" height="5.7" />
            <rect x="107.69" y="34" rx="3" ry="3" width="248.5" height="6.4" />
            <rect x="106.69" y="47" rx="3" ry="3" width="269.8" height="6.4" />
            <rect x="105.69" y="63" rx="3" ry="3" width="142.71" height="6.4" />
            <rect x="6.69" y="3.67" rx="0" ry="0" width="94.87" height="96.66" />
            <rect x="314.69" y="56.67" rx="0" ry="0" width="67" height="24" />
          </ContentLoader>
        </div>
      </React.Fragment>
    );
  } else if (type === "staticPage") {
    return (
      <React.Fragment>
        <div className={"ContentLoader mb-xs-32 " + type}>
          <ContentLoader height={160} width={400} speed={1} backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
            <rect x="0" y="13" rx="4" ry="4" width="400" height="9" />
            <rect x="0" y="29" rx="4" ry="4" width="100" height="8" />
            <rect x="0" y="50" rx="4" ry="4" width="400" height="10" />
            <rect x="0" y="65" rx="4" ry="4" width="400" height="10" />
            <rect x="0" y="79" rx="4" ry="4" width="100" height="10" />
            <rect x="0" y="99" rx="5" ry="5" width="400" height="200" />
          </ContentLoader>
        </div>
      </React.Fragment>
    );
  } else if (type === "HomePageOffer") {
    return (
      <React.Fragment>
        <div className={"ContentLoader " + type}>
          <ContentLoader height={536} width={511} speed={2} backgroundColor="#bbddff" foregroundColor="#ecebeb">
            <rect x="148" y="210" rx="0" ry="0" width="0" height="0" />
            <rect x="267" y="298" rx="0" ry="0" width="1" height="2" />
            <rect x="148" y="153" rx="0" ry="0" width="0" height="0" />
            <rect x="11" y="6" rx="0" ry="0" width="237" height="256" />
            <rect x="266" y="8" rx="0" ry="0" width="237" height="256" />
            <rect x="11" y="273" rx="0" ry="0" width="237" height="256" />
            <rect x="266" y="275" rx="0" ry="0" width="237" height="256" />
          </ContentLoader>
        </div>
      </React.Fragment>
    );
  } else if (type === "newFlight") {
    return (
      <div className={"ContentLoader " + type}
      style={{
        backgroundColor: "#ffffff",
        // height: "10vh"
      }}
      >
        <ContentLoader speed={2} width={400} height={100} viewBox="0 0 400 100" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
          <rect x="55" y="13" rx="3" ry="3" width="119" height="16" />
          <circle cx="22" cy="29" r="20" />
          <rect x="56" y="35" rx="3" ry="3" width="104" height="7" />
          <rect x="197" y="13" rx="3" ry="3" width="119" height="16" />
          <rect x="198" y="35" rx="3" ry="3" width="104" height="7" />
          <rect x="331" y="12" rx="3" ry="3" width="52" height="16" />
          <rect x="337" y="34" rx="3" ry="3" width="46" height="7" />
          <rect x="58" y="62" rx="3" ry="3" width="119" height="16" />
          <circle cx="23" cy="77" r="20" />
          <rect x="59" y="84" rx="3" ry="3" width="104" height="7" />
          <rect x="200" y="62" rx="3" ry="3" width="119" height="16" />
          <rect x="201" y="84" rx="3" ry="3" width="104" height="7" />
          <rect x="335" y="60" rx="3" ry="3" width="52" height="16" />
          <rect x="340" y="83" rx="3" ry="3" width="46" height="7" />
        </ContentLoader>
      </div>
    );
  } else {
    return (
      <div className={"ContentLoader "}>
        <ContentLoader height={160} width={397} speed={1} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
          <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" />
          <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
          <rect x="0" y="80" rx="3" ry="3" width="350" height="6.4" />
          <rect x="0" y="100" rx="3" ry="3" width="380" height="6.4" />
          <rect x="0" y="120" rx="3" ry="3" width="201" height="6.4" />
          <circle cx="30" cy="30" r="30" />
        </ContentLoader>
      </div>
    );
  }
};

export default ComponentPlaceholder;
