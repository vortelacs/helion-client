import React, { useState } from "react";
import { useGeolocated } from "react-geolocated";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "react-toastify";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface SignaturePadProps {
  onSave: (url: string, coordinates: Coordinates) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const sign = React.useRef<any>(null);
  const [url, setUrl] = useState("");

  const handleClear = () => {
    if (sign.current) {
      sign.current.clear();
      setUrl("");
    }
  };
  const handleSign = () => {
    if (!isGeolocationEnabled) {
      toast("You need to enable location to be able to sign digitally");
      return;
    }

    if (!coords) {
      toast("Location data is not available. Please try again later.");
      return;
    }
    onSave(url, coords);
  };

  const handleGenerate = () => {
    if (sign.current) {
      const dataUrl = sign.current.getTrimmedCanvas().toDataURL("image/svg");
      setUrl(dataUrl);
    }
  };
  const handleEndDrawing = () => {
    handleGenerate();
  };

  return (
    <div>
      <div className="border-2 border-black">
        <SignatureCanvas
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
          ref={sign}
          onEnd={handleEndDrawing}
        />
      </div>

      <br />
      <div className="flex justify-between p-2">
        <button
          className="bg-gray-500 hover:bg-red-700 border-red-400 border-2 text-white font-bold py-2 px-4 rounded"
          onClick={handleClear}
        >
          Clear
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
          onClick={handleSign}
        >
          Sign
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
