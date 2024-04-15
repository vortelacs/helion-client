import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignaturePadProps {
  onSave: (url: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
  const sign = React.useRef<any>(null);
  const [url, setUrl] = useState("");

  const handleClear = () => {
    if (sign.current) {
      sign.current.clear();
      setUrl("");
    }
  };

  const handleGenerate = () => {
    if (sign.current) {
      const dataUrl = sign.current.getTrimmedCanvas().toDataURL("image/svg");
      setUrl(dataUrl);
      onSave(dataUrl);
    }
  };
  const handleEndDrawing = () => {
    handleGenerate();
  };

  return (
    <div>
      <div style={{ border: "2px solid black", width: 500, height: 200 }}>
        <SignatureCanvas
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
          ref={sign}
          onEnd={handleEndDrawing}
        />
      </div>

      <br />
      <button style={{ height: "30px", width: "60px" }} onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default SignaturePad;
