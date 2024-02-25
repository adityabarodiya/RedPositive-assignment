import Image from "next/image";
import MyForm from "./component/MyForm";
import DataTable from "./component/DataTable";
import HandleTable from './component/HandleTable'

export default function Home() {
  return (
    <div>
      <HandleTable></HandleTable>
    </div>
  );
}
