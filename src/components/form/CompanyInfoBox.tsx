import { Company } from "../../model/Company";

interface CompanyInfoBoxProps {
  company: Company;
}
const CompanyInfoBox: React.FC<CompanyInfoBoxProps> = ({ company }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">{company.name}</h2>
      <div className="text-gray-600">
        <p>
          <span className="font-semibold">CUI:</span> {company.cui}
        </p>
      </div>
    </div>
  );
};

export default CompanyInfoBox;
