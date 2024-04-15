import { useState } from "react";
import axios from "axios";
import SignaturePad from "../components/form/SignaturePad";

const ProcessForm = () => {
  const [signatureUrl, setSignatureUrl] = useState<string>("");

  const handleSignatureSave = (url: string) => {
    setSignatureUrl(url);
  };

  const handleSubmit = async () => {
    const process = {
      signature: signatureUrl,
    };

    try {
      const response = await axios.post("YOUR_SERVER_ENDPOINT", process);
      console.log("Process submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting process:", error);
    }
  };

  return (
    <div>
      <SignaturePad onSave={handleSignatureSave} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ProcessForm;
