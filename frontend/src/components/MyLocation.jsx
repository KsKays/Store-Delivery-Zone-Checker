import { Marker, Popup } from "react-leaflet"; // ลบ Circle ออก
import L from "leaflet";
import homeIcon from "../assets/home.png"; // ตรวจสอบให้แน่ใจว่าพาธนี้ถูกต้อง

const MyLocation = ({ myLocation }) => {
  const customHomeIcon = new L.Icon({
    iconUrl: homeIcon,
    iconSize: [45, 45], // ขนาดของไอคอน
  });

  return (
    <>
      {myLocation.lat && myLocation.lng && (
        <>
          <Marker
            position={[myLocation.lat, myLocation.lng]}
            icon={customHomeIcon}
          >
            <Popup>ตำแหน่งปัจจุบันของฉัน</Popup>
          </Marker>

          {/* <Circle
            center={[myLocation.lat, myLocation.lng]}
            radius={500} // รัศมีตัวอย่างในเมตร
            pathOptions={{
              color: "#87CEEB", // สีฟ้าอ่อนสำหรับขอบ
              fillColor: "#87CEEB", // สีฟ้าอ่อนสำหรับเติม
              fillOpacity: 0.3, // สีฟ้าอ่อนโปร่งใส
            }}
          /> */}
        </>
      )}
    </>
  );
};

export default MyLocation;
